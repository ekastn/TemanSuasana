package model

type User struct {
    ID       string `json:"id" bson:"_id,omitempty"`
    Name     string `json:"name" bson:"name"`
    Email    string `json:"email" bson:"email"`
    Password string `json:"password,omitempty" bson:"password"` // hash bcrypt
    Role     string `json:"role" bson:"role"`                   // "user" | "admin"
}
