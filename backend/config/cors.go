package config

import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
)

// Cors returns a Fiber handler with sensible defaults that
// allow requests from localhost front‑end during development.
func Cors() fiber.Handler {
    return cors.New(cors.Config{
        AllowOrigins: "*", // set to specific domain on prod
        AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
        AllowHeaders: "Origin, Content-Type, Accept",
    })
}