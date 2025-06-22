package handler

import (
    "github.com/gofiber/fiber/v2"

    "Backend/controller"
    "Backend/model"
)

func CreateReflection(c *fiber.Ctx) error {
    var r model.Reflection
    if err := c.BodyParser(&r); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }
    if err := controller.CreateReflection(&r); err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }
    return c.Status(fiber.StatusCreated).JSON(r)
}

func GetReflections(c *fiber.Ctx) error {
    list, err := controller.ListReflections()
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    if list == nil {                 // ⬅️ guard baru
        list = []model.Reflection{}  // kirim [] alih‑alih null
    }

    return c.JSON(list)
}
