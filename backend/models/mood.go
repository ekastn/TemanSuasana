package models

import "time"

type Mood struct {
	ID        string    `bson:"_id,omitempty" json:"id"`
	UserName  string    `bson:"user_name,omitempty" json:"userName"` // hard‑code sementara
	Score     int       `bson:"score" json:"score"`                  // 1‑10
	Emoji     string    `bson:"emoji" json:"emoji"`
	Note      string    `bson:"note,omitempty" json:"note"`
	CreatedAt time.Time `bson:"created_at" json:"createdAt"`
}
