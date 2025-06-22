package main

import (
    "log"
    "os"

    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/logger"

    "Backend/config"
    "Backend/router"
)

func main() {
    // Connect to MongoDB
    config.ConnectDB()

    // Create Fiber app
    app := fiber.New()

    // Middleware
    app.Use(logger.New())      // Request logger
    app.Use(config.Cors())     // CORS (allow frontend requests)

    // Routes
    router.SetupRoutes(app)

    // Optional: Root path just to avoid 404 when visiting directly
    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Teman Suasana Backend is running!")
    })

    // Start server
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    log.Printf("🚀  Server running on http://localhost:%s", port)
    log.Fatal(app.Listen(":" + port))
}
