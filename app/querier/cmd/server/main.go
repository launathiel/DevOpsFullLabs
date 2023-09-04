package main

import (
	"querier/middlewares"
	"querier/apis"
	"os"
	"os/signal"
	"syscall"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)


func main() {
	var errChan = make(chan error, 1)

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
	r.Use(gin.Recovery())
	r.Use(middlewares.CORSMiddleware())
	// router
	r.GET("/health", apis.HealthCheck)
	r.GET("/", middlewares.TokenAuthMiddleware(), apis.GetQuerier )
	r.GET("/inventory", middlewares.TokenAuthMiddleware(), apis.GetInventory )
	r.GET("/member", middlewares.TokenAuthMiddleware(), apis.GetMember )

	return r.Run(":" + os.Getenv("PORT"))
}