# Developer Tools Hub 🛠️

A lightweight backend service for centralizing your team's developer tools and links in one place, enabling secure resource management through an admin dashboard. The implementation focuses on backend architecture, API design, security, database structure, and a ready Docker setup. The client side is intentionally minimal and AI-assisted, serving only to demonstrate API interactions.

## 🚀 Quick Start

## Features

- 🔐 JWT Authentication (admin login)
- 📝 Create, read, update, delete links
- 🎨 Beautiful landing page showing all links
- 🛡️ Secure admin panel
- 🐳 Docker & Kubernetes ready
- 📦 MongoDB database

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 
- Docker

### Installation

```bash
git clone <repo-url>
cd dev-tools-hub
npm install
```

### Setup Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/dev-tools-hub
JWT_SECRET=my-secret-key-12345678901234567890
```

### Run Locally

```bash
# Development (with hot reload)
npm run dev

# Production
npm run build
npm start
```

## Run seed
```bash
# Create admin user
npm run seed:admin
#Create links
npm run seed:links
```

Visit: http://localhost:3001

## Using Docker

```bash
# Start with Docker Compose
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f app
```

## API Endpoints

### Base URL
```
http://localhost:3001/api
```

### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "admin": { "id": "...", "username": "admin" }
  }
}
```

### Get All Links (Public)
```bash
GET /links

Response:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "GitHub",
      "url": "https://github.com",
      "icon": "🐙",
      "description": "Version control",
      "category": "Development",
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ]
}
```

### Create Link (Admin Only)
```bash
POST /links
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "GitHub",
  "url": "https://github.com",
  "icon": "🐙",
  "description": "Version control",
  "category": "Development"
}
```

### Update Link (Admin Only)
```bash
PUT /links/:id
Authorization: Bearer <token>

{
  "title": "GitHub Updated"
}
```

### Delete Link (Admin Only)
```bash
DELETE /links/:id
Authorization: Bearer <token>
```

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm test:watch

# Coverage
npm test:coverage
```

## Project Structure

```
src/
├── config/db.ts              # Database connection
├── controllers/
│   ├── auth.controller.ts    # Login logic
│   └── link.controller.ts    # CRUD operations
├── middleware/
│   └── auth.middleware.ts    # JWT verification
├── models/
│   ├── admin.model.ts        # Admin schema
│   └── link.model.ts         # Link schema
├── routes/
│   ├── auth.routes.ts
│   └── link.routes.ts
├── app.ts                    # Express setup
└── server.ts                 # Server startup

public/
├── index.html               # Landing page
└── admin.html              # Admin dashboard
```

## Default Credentials

After `npm run seed`:
- **Username:** admin
- **Password:** admin123

⚠️ Change immediately after first login!

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | development | App environment |
| PORT | 3001 | Server port |
| MONGODB_URI | mongodb://localhost:27017/dev-tools-hub | Database URL |
| JWT_SECRET | secret-key | JWT signing key |

## npm Scripts

```bash
npm run dev          # Start dev server (hot reload)
npm run build        # Build TypeScript
npm start            # Start production server
npm run seed         # Create admin user
npm test             # Run tests
npm test:watch       # Watch mode
npm test:coverage    # Coverage report
```

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - Database ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Docker** - Containerization

## Security

- ✅ Passwords hashed with bcryptjs
- ✅ JWT token authentication
- ✅ Input validation
- ✅ Error handling
- ✅ MongoDB injection prevention

**Production Tips:**
- Change JWT_SECRET to random 32+ chars
- Use strong admin password
- Enable HTTPS
- Update dependencies regularly

## Troubleshooting

### Port already in use
```bash
# Change in .env
PORT=3002
```

### MongoDB connection error
```bash
# Start MongoDB
brew services start mongodb-community

# Or use Docker
docker-compose up -d
```

### Tests failing
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm test
```

## Deployment

### Docker
```bash
docker build -t dev-tools-hub:1.0.0 .
docker run -p 3001:3001 dev-tools-hub:1.0.0
```

### Kubernetes
```bash
kubectl apply -f k8s/
```

See `DEPLOYMENT.md` for detailed guide.

## Testing API with cURL

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get links
curl http://localhost:3001/api/links

# Create link
curl -X POST http://localhost:3001/api/links \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"GitHub",
    "url":"https://github.com",
    "icon":"🐙"
  }'
```

## File Structure

```
dev-tools-hub/
├── src/                    # Source code
├── public/                 # Frontend files
├── k8s/                    # Kubernetes manifests
├── .github/workflows/      # CI/CD pipelines
├── Dockerfile              # Container image
├── docker-compose.yml      # Local setup
├── package.json
├── tsconfig.json
├── jest.config.js
├── .gitignore
├── .env.example
└── README.md
```

## Useful Links

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT Guide](https://jwt.io/)
- [Docker Docs](https://docs.docker.com/)
- [Kubernetes Docs](https://kubernetes.io/docs/)

## Support

- 📧 Email: agnesazeqiri404@gmail.com
- 🐛 Issues: Open a GitHub issue

## License

MIT

---

**Version:** 1.0.0  
**Last Updated:** March 2026
