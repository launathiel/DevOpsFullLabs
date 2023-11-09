package main

import (
	"context"
	"os"
	"os/signal"
	"querier/apis"
	"querier/middlewares"
	"syscall"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"google.golang.org/grpc/credentials"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"

	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
)

var (
    serviceName  = os.Getenv("SERVICE_NAME")
    collectorURL = os.Getenv("OTEL_EXPORTER_OTLP_ENDPOINT")
    insecure     = os.Getenv("INSECURE_MODE")
)

func initTracer() func(context.Context) error{
	secureOption := otlptracegrpc.WithTLSCredentials(credentials.NewClientTLSFromCert(nil, ""))
	if len(insecure) > 0 {
		secureOption = otlptracegrpc.WithInsecure()
	}

	exporter, err := otlptrace.New(
		context.Background(),
		otlptracegrpc.NewClient(
			secureOption,
			otlptracegrpc.WithEndpoint(collectorURL),
		),
	)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to create trace exporter")
	}
	resources, err := resource.New(
		context.Background(),
		resource.WithAttributes(
			attribute.String("service.name", serviceName),
			attribute.String("gin.version", gin.Version),
			attribute.String("library.language", "go"),
		),
	)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to create resource")
	}
	otel.SetTracerProvider(
		sdktrace.NewTracerProvider(
			sdktrace.WithSampler(sdktrace.AlwaysSample()),
			sdktrace.WithBatcher(exporter),
			sdktrace.WithResource(resources),
		),
	)
	return exporter.Shutdown
}

func main() {
	var errChan = make(chan error, 1)

	cleanup := initTracer()
	defer cleanup(context.Background())

	go func() {
		log.Info().Msg("querier service is running on port " + os.Getenv("PORT"))
		errChan <- server()
	}()

	var signalChan = make(chan os.Signal, 1)
	signal.Notify(signalChan, os.Interrupt, syscall.SIGTERM)
	select {
		case <-signalChan:
			log.Info().Msg("shutting down querier service")
			os.Exit(0)
		case err := <-errChan:
			if err != nil {
				log.Error().Str("error", err.Error()).Msg("error when running querier service")
				os.Exit(1)
			}
	}
}

func server() error {
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	// middlewares
	r.Use(otelgin.Middleware(serviceName))
	r.Use(gin.Recovery())
	r.Use(middlewares.CORSMiddleware())
	// router
	r.GET("/health", apis.HealthCheck)
	r.GET("/", apis.GetQuerier )
	r.GET("/inventory", middlewares.TokenAuthMiddleware(), apis.GetInventory )
	r.GET("/member", middlewares.TokenAuthMiddleware(), apis.GetMember )

	return r.Run(":" + os.Getenv("PORT"))
}