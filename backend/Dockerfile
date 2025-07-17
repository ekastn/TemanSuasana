# Stage 1: Build the Go binary
FROM golang:1.23-alpine AS builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files to download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go application into a static binary
RUN CGO_ENABLED=0 GOOS=linux go build -o /main .

# Stage 2: Create the final, minimal image
FROM gcr.io/distroless/static-debian12

# Copy the built binary from the builder stage
COPY --from=builder /main /main

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["/main"]
