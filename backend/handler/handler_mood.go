package handler

import (
    "github.com/gofiber/fiber/v2"

    "Backend/controller"
    "Backend/model"
)

func CreateMood(c *fiber.Ctx) error {
    var m model.Mood
    if err := c.BodyParser(&m); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }
    if err := controller.CreateMood(&m); err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }
    return c.Status(fiber.StatusCreated).JSON(m)
}

func GetMoods(c *fiber.Ctx) error {
    list, err := controller.ListMoods()
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }
    if list == nil { // <‑‑ tambahkan
        list = []model.Mood{}   // kirim array kosong, bukan null
    }
    return c.JSON(list)
}
