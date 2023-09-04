FROM golang:1.19.4-alpine

WORKDIR /app

COPY . .

RUN go mod download

RUN go build -o querier ./cmd/server

EXPOSE 3000

CMD [ "/app/querier" ]