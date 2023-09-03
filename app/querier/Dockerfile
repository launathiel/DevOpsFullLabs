FROM golang:1.19.4-alpine

WORKDIR /app

COPY . .

RUN go mod download

RUN go build -o analytics ./cmd/server

EXPOSE 3004

CMD [ "/app/analytics" ]