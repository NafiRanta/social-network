FROM golang:1.19-alpine
RUN apk get update && apk add gcc g++ && apk --update-cache add sqlite && rm -rf /var/cache/apk/*
WORKDIR /app
COPY . .
RUN go build .
EXPOSE 8080
CMD ["./socialnetwork"]