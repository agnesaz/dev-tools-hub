# Developer Tools Hub 🛠️

A simple, modern landing page for managing developer tools and SaaS links. Admins can add, edit, and delete links with a beautiful dashboard.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Docker & Docker Compose (optional)
- MongoDB (if running locally)

### Installation

```bash
# Clone and install
git clone <repository-url>
cd dev-tools-hub
npm install

# Setup environment
cp .env.example .env

# Create admin user
npm run seed
```

### Run Locally

```bash
npm run dev       # Development mode with hot-reload
npm run build     # Build TypeScript
npm start         # Production mode
```

Visit:
- **Landing Page:** http://localhost:3001
- **Admin Panel:** http://localhost:3001/admin.html

## 🐳 Docker Deployment

```bash
# Start with Docker Compose
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f app
```

## 📋 Default Credentials

After running `npm run seed`:
- **Username:** admin
- **Password:** secret123


## ⚙️ Environment Variables

Create a `.env` file:

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://mongo:27017/dev-tools-hub
JWT_SECRET=your-super-secret-key-here
```

## 📡 API Documentation

### Base URL
```
http://localhost:3001/
```

### Authentication
All admin endpoints require a JWT token in the header:
```
Authorization: Bearer <your-token>
```

### Endpoints

#### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": { "id": "...", "username": "admin" }
  }
}
```

#### Get All Links (Public)
```bash
GET /links
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "GitHub",
      "url": "https://github.com",
      "icon": "🐙",
      "description": "Version control platform",
      "category": "Development",
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ]
}
```

#### Create Link (Admin Only)
```bash
POST /links
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "GitHub",
  "url": "https://github.com",
  "icon": "🐙",
  "description": "Version control platform",
  "category": "Development"
}
```

#### Update Link (Admin Only)
```bash
PUT /links/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "GitHub Updated",
  "description": "New description"
}
```

#### Delete Link (Admin Only)
```bash
DELETE /links/:id
Authorization: Bearer <token>
```

## 🧪 Test the API

### Using cURL

```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  | jq -r '.data.token')

# Get all links
curl http://localhost:3001/api/links

# Create link
curl -X POST http://localhost:3001/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "GitHub",
    "url": "https://github.com",
    "icon": "🐙",
    "category": "Development"
  }'

# Update link
curl -X PUT http://localhost:3001/api/links/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title": "GitHub Updated"}'

# Delete link
curl -X DELETE http://localhost:3001/api/links/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer $TOKEN"
```

### Using Postman

1. Create a new collection
2. Add the endpoints above
3. In the "Auth" tab, set type to "Bearer Token"
4. Paste your JWT token from login response
5. Test each endpoint

## 📁 Project Structure

```
dev-tools-hub/
├── src/
│   ├── config/db.ts              # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.ts    # Login
│   │   └── link.controller.ts    # CRUD for links
│   ├── middleware/auth.middleware.ts  # JWT verification
│   ├── models/
│   │   ├── admin.model.ts        # Admin schema
│   │   └── link.model.ts         # Link schema
│   ├── routes/
│   │   ├── auth.routes.ts        # /auth endpoints
│   │   └── link.routes.ts        # /links endpoints
│   ├── scripts/createAdmin.ts    # Create admin user
│   ├── utils/
│   │   ├── logger.ts             # Logging
│   │   └── validation.ts         # Input validation
│   ├── app.ts                    # Express app
│   └── server.ts                 # Server startup
├── public/
│   ├── index.html                # Landing page
│   └── admin.html                # Admin dashboard
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

## 🔒 Security

- ✅ Passwords hashed with bcryptjs
- ✅ JWT authentication for admin endpoints
- ✅ URL and input validation
- ✅ Error handling without exposing sensitive data
- ✅ MongoDB injection prevention

**Production Checklist:**
- [ ] Change `JWT_SECRET` to a random 32+ character string
- [ ] Use strong admin password
- [ ] Enable HTTPS/TLS
- [ ] Set `NODE_ENV=production`
- [ ] Use environment-specific `.env` files
- [ ] Enable MongoDB authentication

## ❓ Troubleshooting

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Start MongoDB: `brew services start mongodb-community`
- Or use Docker: `docker-compose up -d`

**Port Already in Use**
```
Error: listen EADDRINUSE :::3001
```
- Change `PORT` in `.env`
- Or kill process: `lsof -ti:3001 | xargs kill -9`

**Invalid Token Error**
- Make sure to include `Authorization: Bearer <token>` header
- Token might be expired (24 hours)
- Re-login to get a new token

## 📝 npm Commands

```bash
npm run dev       # Start dev server (hot-reload)
npm run build     # Build TypeScript to JavaScript
npm start         # Start production server
npm run seed      # Create admin user
```

## 📚 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Docker** - Containerization

## 📄 Data Models

**Link:**
```typescript
{
  title: string,           // Required
  url: string,             // Required, valid URL
  icon: string,            // Optional, emoji or URL
  description: string,     // Optional
  category: string,        // Optional
  createdAt: Date,
  updatedAt: Date
}
```

**Admin:**
```typescript
{
  username: string,        // Required, unique
  password: string,        // Required, bcrypt hashed
  createdAt: Date,
  updatedAt: Date
}
```

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/my-feature`
5. Open Pull Request

## 📄 License

MIT License
---

**Version:** 1.0.0  
**Last Updated:** March 2026