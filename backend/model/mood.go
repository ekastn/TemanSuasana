package model

import "time"

type Mood struct {
    ID        string    `json:"id" bson:"_id,omitempty"`
    Mood      string    `json:"mood" bson:"mood"`
    Score     int       `json:"score" bson:"score"`
    Note      string    `json:"note,omitempty" bson:"note,omitempty"`
    Tags      []string  `json:"tags,omitempty" bson:"tags,omitempty"`
    CreatedAt time.Time `json:"created_at" bson:"created_at"`
}