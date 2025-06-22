package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"Backend/db"

	"github.com/go-chi/chi/v5"
	"go.mongodb.org/mongo-driver/bson"
)

type DashboardStats struct {
	AverageToday float64 `json:"averageToday"`
	Streak       int     `json:"streak"`
	CountMonth   int     `json:"countMonth"`
}

func RegisterStatsRoutes(r chi.Router) {
	r.Get("/", getStats)
}

// GET /api/stats
func getStats(w http.ResponseWriter, r *http.Request) {
	coll := db.MoodColl()
	now := time.Now()
	startToday := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location())

	matchToday := bson.M{"created_at": bson.M{"$gte": startToday}}
	group := bson.M{"_id": nil, "avg": bson.M{"$avg": "$score"}}
	cur, _ := coll.Aggregate(context.Background(), []bson.M{{"$match": matchToday}, {"$group": group}})
	var res []bson.M
	cur.All(context.Background(), &res)

	avg := 0.0
	if len(res) > 0 {
		avg = res[0]["avg"].(float64)
	}

	// naive streak & count‑month, silakan refine
	stats := DashboardStats{
		AverageToday: avg,
		Streak:       12,
		CountMonth:   18,
	}
	json.NewEncoder(w).Encode(stats)
}
