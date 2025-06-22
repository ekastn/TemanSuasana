package model

import "time"

type Reflection struct {
    ID        string    `json:"id" bson:"_id,omitempty"`
    Date      time.Time `json:"date" bson:"date"`
    Best      string    `json:"best" bson:"best"`
    Challenge string    `json:"challenge" bson:"challenge"`
    Lesson    string    `json:"lesson" bson:"lesson"`
    Hope      string    `json:"hope" bson:"hope"`
}