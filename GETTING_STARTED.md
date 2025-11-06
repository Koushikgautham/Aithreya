# 🚀 Getting Started with Āithreya

Welcome to Āithreya - your intelligent civic education platform for the Indian Constitution!

## ✅ What's Already Built

The **backend API** is fully functional with:

- ✅ User authentication & authorization (JWT)
- ✅ Constitutional content management (multilingual)
- ✅ Progress tracking & gamification
- ✅ Search & filtering
- ✅ Bookmarking & notes
- ✅ Quiz system with XP/leveling
- ✅ Security middleware (rate limiting, validation)
- ✅ Comprehensive API documentation

## 📋 Quick Start Guide

### Step 1: Install Prerequisites

You need:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download here](https://www.mongodb.com/try/download/community)

Verify installation:
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
mongod --version  # Should show v6.x.x or higher
```

### Step 2: Set Up Backend

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file** with your settings (use Notepad or any editor):
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/aithreya
   JWT_SECRET=your_super_secret_key_min_32_characters_long
   ```

5. **Start MongoDB:**

   **Windows:**
   ```bash
   net start MongoDB
   ```

   **Mac/Linux:**
   ```bash
   brew services start mongodb-community  # Mac
   sudo systemctl start mongod            # Linux
   ```

6. **Seed sample data:**
   ```bash
   node src/utils/seeder.js
   ```

7. **Start the server:**
   ```bash
   npm run dev
   ```

You should see:
```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🕉️  Āithreya API Server Running                        ║
║                                                           ║
║   Environment: development                                ║
║   Port: 5000                                              ║
║   ...                                                     ║
╚═══════════════════════════════════════════════════════════╝
```

### Step 3: Test the API

**Option A: Using Browser**

Open: `http://localhost:5000/health`

You should see:
```json
{
  "success": true,
  "message": "Aithreya API is running"
}
```

**Option B: Using Postman** (Recommended)

1. Download [Postman](https://www.postman.com/downloads/)
2. Import the collection: `backend/postman_collection.json`
3. Try the "Register User" request
4. Try the "Login" request
5. Copy the token from login response
6. Set the `token` variable in Postman
7. Try other authenticated requests

**Option C: Using cURL**

```bash
# Test health check
curl http://localhost:5000/health

# Register a user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"Test1234\"}"

# Get preamble
curl http://localhost:5000/api/v1/content/preamble
```

## 📚 Project Structure

```
Aithreya/
├── backend/                          ✅ COMPLETE
│   ├── src/
│   │   ├── config/                   # Configuration files
│   │   │   ├── index.js              # Environment variables
│   │   │   └── database.js           # MongoDB connection
│   │   ├── controllers/              # Business logic
│   │   │   ├── authController.js     # Auth operations
│   │   │   ├── contentController.js  # Content operations
│   │   │   └── progressController.js # Progress operations
│   │   ├── middleware/               # Express middleware
│   │   │   ├── auth.js               # JWT authentication
│   │   │   ├── errorHandler.js       # Error handling
│   │   │   ├── security.js           # Security features
│   │   │   └── validation.js         # Input validation
│   │   ├── models/                   # Database schemas
│   │   │   ├── User.js               # User model
│   │   │   ├── Content.js            # Content model
│   │   │   ├── CaseStudy.js          # Case study model
│   │   │   ├── Progress.js           # Progress model
│   │   │   └── index.js              # Model exports
│   │   ├── routes/                   # API routes
│   │   │   ├── authRoutes.js         # /api/v1/auth
│   │   │   ├── contentRoutes.js      # /api/v1/content
│   │   │   └── progressRoutes.js     # /api/v1/progress
│   │   ├── utils/                    # Utilities
│   │   │   └── seeder.js             # Database seeder
│   │   ├── app.js                    # Express app setup
│   │   └── server.js                 # Server entry point
│   ├── .env.example                  # Environment template
│   ├── .gitignore                    # Git ignore rules
│   ├── package.json                  # Dependencies
│   ├── README.md                     # API documentation
│   ├── SETUP.md                      # Detailed setup guide
│   └── postman_collection.json       # API testing collection
│
├── PROJECT_OVERVIEW.md               # High-level overview
└── GETTING_STARTED.md                # This file
```

## 🔑 Key API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user (requires auth)

### Content
- `GET /api/v1/content/preamble` - Get preamble
- `GET /api/v1/content/fundamental-rights` - List all rights
- `GET /api/v1/content/article/:number` - Get specific article
- `GET /api/v1/content/search?q=equality` - Search content

### Progress (requires authentication)
- `GET /api/v1/progress/overview` - Get learning stats
- `POST /api/v1/progress/:contentId/start` - Start learning
- `POST /api/v1/progress/:contentId/complete` - Mark complete
- `POST /api/v1/progress/:contentId/bookmark` - Toggle bookmark

See [backend/README.md](backend/README.md) for complete API documentation.

## 🎯 Sample Workflow

Here's a typical user flow:

1. **Register**: Create a new account
2. **Login**: Get JWT token
3. **Browse Content**: View preamble, rights, duties
4. **Track Progress**: Mark articles as started/completed
5. **Take Quiz**: Test understanding, earn XP
6. **Level Up**: Gain levels and badges
7. **Bookmark**: Save important articles

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) | Complete project overview, architecture, features |
| [backend/README.md](backend/README.md) | API documentation with all endpoints |
| [backend/SETUP.md](backend/SETUP.md) | Detailed setup instructions |
| [GETTING_STARTED.md](GETTING_STARTED.md) | This quick start guide |

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server (auto-restart)
npm run dev

# Start production server
npm start

# Seed database with sample data
node src/utils/seeder.js

# Check for security issues
npm audit
```

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error**: `MongoNetworkError: connect ECONNREFUSED`

**Fix**:
1. Make sure MongoDB is running
2. Check connection string in `.env`
3. Try: `mongosh` (or `mongo`) to test connection

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Fix**:
- Change `PORT=5001` in `.env`
- Or kill the process using port 5000

### Token Invalid/Expired

**Fix**: Login again to get a new token

### Validation Errors

Passwords must:
- Be at least 6 characters
- Have 1 uppercase letter
- Have 1 lowercase letter
- Have 1 number

Example: `MyPass123`

## 📞 Getting Help

If you run into issues:

1. Check [backend/SETUP.md](backend/SETUP.md) for detailed setup
2. Review error messages in console
3. Verify environment variables in `.env`
4. Make sure MongoDB is running

## ✨ What's Next?

Now that the backend is running, the next phase is:

1. **Flutter Mobile App**
   - Initialize Flutter project
   - Build authentication screens
   - Connect to backend API
   - Implement content browsing
   - Add offline support

2. **AI Integration**
   - OpenAI API for questions
   - Smart recommendations
   - Conversational assistant

3. **Advanced Features**
   - ElasticSearch for case law
   - Push notifications
   - Text-to-speech
   - Analytics dashboard

## 🎓 Learning Resources

- **MongoDB**: https://learn.mongodb.com/
- **Express.js**: https://expressjs.com/
- **Flutter**: https://flutter.dev/docs
- **JWT**: https://jwt.io/introduction

## 🤝 Contributing

Interested in contributing? Great! Areas where you can help:

- Adding more constitutional content
- Translations to Indian languages
- Case law data
- UI/UX improvements
- Documentation
- Testing

## 📄 License

MIT License - See LICENSE file

---

**Current Status**: ✅ Backend Complete | 📱 Frontend Next

**Ready to build?** Start exploring the API with Postman!

Built with ❤️ for civic education in India
