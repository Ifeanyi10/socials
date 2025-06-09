# Social Media API

This is a full-featured backend REST API built with Node.js, TypeScript, Docker, and PostgreSQL. It supports:
- User accounts
- Creating and commenting on posts
- File uploads and validation (PDF, JPG, PNG)
- Nested comment replies
- Hashtags

---

## 🚀 Features

- **TypeORM** for interacting with PostgreSQL
- **Multer** for handling file uploads
- **Express** for routing
- **Docker** for containerized deployment

---

## 📦 Technologies

- Node.js
- TypeScript
- PostgreSQL
- Express
- TypeORM
- Docker / Docker Compose

---

## 🛠️ Setup Instructions

### 1. 🍴 Fork and Clone

- git clone https://github.com/Ifeanyi10/socials.git
- cd socials


### 2. Create a .env file
PORT=3000
DB_HOST=<database_host>
DB_PORT=5432
DB_USER=<user_name>
DB_PASSWORD=<password>
DB_NAME=<<database_name>>
NODE_ENV=development

---

### 3. Make sure docker is installed and running
- docker-compose up --build

---

### 4. Open your Postgres database and populate sample data
- sample data can be found in <root_dir>/db/schema-data.sql

---

### 5. In Postman, test endpoints

GET / => { "message": "Server is running." }

POST /api/posts
Content-Type: multipart/form-data

Fields:
- title: string (required)
- body: string (optional)
- hashtags: comma-separated string (optional)
- file: PDF, JPG, or PNG (optional)


POST /api/comments
Body (JSON):
{
  "postId": 1,
  "userId": 2,
  "comment": "Nice post!"
}


POST /api/comments/reply
Body (JSON):
{
  "postId": 1,
  "userId": 2,
  "comment": "I agree!",
  "parentCommentId": 5
}