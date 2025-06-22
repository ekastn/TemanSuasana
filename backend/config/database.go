package config

import (
    "context"
    "fmt"
    "os"
    "time"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/mongo/readpref"
)

var (
    DB         *mongo.Database
    dbName     = "Teman_Suasana"
    mongoURI   = os.Getenv("MONGOSTRING")
)

func ConnectDB() *mongo.Database {
    if mongoURI == "" {
        mongoURI = "mongodb://localhost:27017"
    }
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
    if err != nil {
        panic(err)
    }
    if err := client.Ping(ctx, readpref.Primary()); err != nil {
        panic(err)
    }
    fmt.Println("✅  Mongo connected")
    DB = client.Database(dbName)
    return DB
}