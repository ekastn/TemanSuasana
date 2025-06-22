package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func Connect(uri string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	c, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("Mongo connect error: ", err)
	}
	if err = c.Ping(ctx, nil); err != nil {
		log.Fatal("Mongo ping error: ", err)
	}
	Client = c
	log.Println("Mongo connected")
}

func MoodColl() *mongo.Collection {
	return Client.Database("teman_suasana").Collection("moods")
}
