package database

import (
	"database/sql"
	"log"
	"math/rand"
	u "socialnetwork/utils"
	"strconv"

	_ "github.com/mattn/go-sqlite3"
	migrate "github.com/rubenv/sql-migrate"
)

func GetDB() *sql.DB {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		log.Fatal(err)
	}
	migrations := &migrate.FileMigrationSource{
		Dir: "database/migrations",
	}
	n, err := migrate.Exec(db, "sqlite3", migrations, migrate.Up)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Applied %d migrations!\n", n)
	db.SetMaxOpenConns(1)

	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM Users").Scan(&count)
	u.CheckErr(err)

	if count == 0 {
		// If the Users table is empty, add dummy data
		err = addDummyUserData(db)
		u.CheckErr(err)
	}

	return db
}

// addDummyUserData
func addDummyUserData(db *sql.DB) error {
	dummyUsers := []struct {
		FirstName string
		LastName  string
		UserName  string
		Email     string
		Password  string
		Dob       string
		Gender    string
		NickName  string
		Avatar    string
		About     string
	}{
		{
			FirstName: "Admin",
			LastName:  "Admin",
			UserName:  "",
			Email:     "admin@example.com",
			Password:  "Admin1234!",
			Dob:       "1990-01-01",
			Gender:    "Male",
			NickName:  "AA",
			// Avatar:    "https://example.com/avatar/johndoe.png",
			About: "Hello, I'm Admin!",
		},
		{
			FirstName: "Nafisah",
			LastName:  "Rantasalmi",
			UserName:  "",
			Email:     "nafisah.rantasalmi@gmail.com",
			Password:  "Nafi1234!",
			Dob:       "1985-05-15",
			Gender:    "Female",
			NickName:  "NR",
			// Avatar:    "https://example.com/avatar/janesmith.png",
			About: "Hi there, I'm Nafisah!",
		},
		{
			FirstName: "Jacob",
			LastName:  "Pesämaa",
			UserName:  "",
			Email:     "jacob.pesamaa@gmail.com",
			Password:  "Jacob1234!",
			Dob:       "1988-09-30",
			Gender:    "Male",
			NickName:  "JP",
			// Avatar:    "https://example.com/avatar/bobjohnson.png",
			About: "Nice to meet you, I'm Jacob!",
		},
		{
			FirstName: "Gin",
			LastName:  "B",
			UserName:  "",
			Email:     "gin.thy@gmail.com",
			Password:  "Gin1234!",
			Dob:       "1999-04-30",
			Gender:    "female",
			NickName:  "GB",
			// Avatar:    "https://example.com/avatar/gin.png",
			About: "Nice to meet you, I'm Gin!",
		},
		{
			FirstName: "Ashley",
			LastName:  "Hgwtra",
			UserName:  "",
			Email:     "ashley.h@gmail.com",
			Password:  "Ashley1234!",
			Dob:       "1998-08-10",
			Gender:    "female",
			NickName:  "AH",
			// Avatar:    "https://example.com/avatar/gin.png",
			About: "Nice to meet you, I'm Ashley!",
		},
		{
			FirstName: "Anton",
			LastName:  "Wiklund",
			UserName:  "",
			Email:     "anton.wiklund@gmail.com",
			Password:  "Anton1234!",
			Dob:       "1998-08-10",
			Gender:    "Male",
			NickName:  "AW",
			// Avatar:    "https://example.com/avatar/gin.png",
			About: "Nice to meet you, I'm Anton!",
		},
	}

	for _, user := range dummyUsers {
		randomNumber := rand.Intn(100)
		user.UserName = user.FirstName + `-` + user.LastName + `-` + strconv.Itoa(randomNumber)
		err := AddUser(db, user.FirstName, user.LastName, user.UserName, user.Email, user.Password, user.Dob, user.Gender, user.NickName, user.Avatar, user.About)
		if err != nil {
			return err
		}
	}

	return nil
}
