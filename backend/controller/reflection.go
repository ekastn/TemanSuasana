package controller

import (
    "context"
    "time"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"

    "Backend/config"   // ganti ke teman_suasana_backend/…  kalau modulmu bernama lain
    "Backend/model"
)

func reflColl() *mongo.Collection {
    return config.DB.Collection("reflections")
}

func CreateReflection(r *model.Reflection) error {
    r.Date = time.Now()                     // <‑‑ server yang set timestamp
    _, err := reflColl().InsertOne(context.TODO(), r)
    return err
}

func ListReflections() ([]model.Reflection, error) {
    cur, err := reflColl().Find(context.TODO(), bson.D{})
    if err != nil {
        return nil, err
    }
    var res []model.Reflection
    if err := cur.All(context.TODO(), &res); err != nil {
        return nil, err
    }
    return res, nil
}
