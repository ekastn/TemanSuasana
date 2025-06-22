package router

import (
	"Backend/handler"

    "github.com/gofiber/fiber/v2"

    


)

func SetupRoutes(app *fiber.App) {
    api := app.Group("/api")

    // mood endpoints
    api.Get("/moods", handler.GetMoods)
    api.Post("/moods", handler.CreateMood)

    // reflection endpoints
    api.Get("/reflections", handler.GetReflections)
    api.Post("/reflections", handler.CreateReflection)
}
