# Inkspire Backend

Inkspire is a full-featured blogging platform where authenticated users can:

- Create, read, update, and delete blogs
- Like and unlike posts
- Comment on blogs
- Delete their own comments

Built using Node.js, Express, MongoDB, and TypeScript.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- TypeScript
- JWT Authentication
- bcrypt for password hashing

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/inkspire-backend.git
cd inkspire-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

In the root directory, add the following:

```env
PORT=5000
DATABASE_URL=mongodb+srv://<your-mongodb-url>
JWT_SECRET=your-secret-key
```

### 4. Build and start the server

```bash
npm run build    # Compile TypeScript
npm run dev      # Run server in development mode with ts-node
```

---

## Available Scripts

| Script          | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start server with ts-node        |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start`     | Start server from compiled JS    |

---

## API Endpoints

### Auth Routes:

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive JWT token

### Blog Routes (All Protected):

- `POST /api/blogs` – Create a blog post
- `GET /api/blogs` – Retrieve all blog posts
- `GET /api/blogs/:id` – Retrieve a single blog post
- `PUT /api/blogs/:id` – Update a blog post
- `DELETE /api/blogs/:id` – Delete a blog post
- `PATCH /api/blogs/:id/likes` – Like or unlike a blog post

### Comment Routes:

- `POST /api/blogs/:id/comments` – Add a comment to a blog
- `DELETE /api/blogs/:id/comments/:commentId` – Delete your own comment

---

## Coming Soon

- Swagger/OpenAPI documentation
- Unit and integration tests (Jest + Supertest)
- Rate limiting, caching, and optimization

---

## Next Steps

- [ ] Add Dockerfile
- [ ] Add docker-compose.yml
- [ ] Add production deployment configurations

---

## Author

Made by [Ashish Kunthe](https://github.com/ashishkunthe)
