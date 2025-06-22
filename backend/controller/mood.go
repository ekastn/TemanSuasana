package controller

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"

	"Backend/config"
	"Backend/model"
)

var moodColl = config.ConnectDB().Collection("moods")


func CreateMood(m *model.Mood) error {
    m.CreatedAt = time.Now()
    _, err := moodColl.InsertOne(context.TODO(), m)
    return err
}

func ListMoods() ([]model.Mood, error) {
    cur, err := moodColl.Find(context.TODO(), bson.D{})
    if err != nil {
        return nil, err
    }
    var res []model.Mood
    if err := cur.All(context.TODO(), &res); err != nil {
        return nil, err
    }
    return res, nil
}