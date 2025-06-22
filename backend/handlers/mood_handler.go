package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"Backend/db"
	"Backend/models"

	"github.com/go-chi/chi/v5"
)

func RegisterMoodRoutes(r chi.Router) {
	r.Get("/", getAllMoods)
	r.Post("/", createMood)
}

// GET /api/moods
func getAllMoods(w http.ResponseWriter, r *http.Request) {
	cur, err := db.MoodColl().Find(r.Context(), map[string]any{})
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer cur.Close(r.Context())

	var moods []models.Mood
	if err := cur.All(r.Context(), &moods); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.NewEncoder(w).Encode(moods)
}

// POST /api/moods
func createMood(w http.ResponseWriter, r *http.Request) {
	var m models.Mood
	if err := json.NewDecoder(r.Body).Decode(&m); err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	m.CreatedAt = time.Now()
	if m.UserName == "" {
		m.UserName = "Anon" // tanpa auth
	}
	_, err := db.MoodColl().InsertOne(context.Background(), m)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(m)
}
