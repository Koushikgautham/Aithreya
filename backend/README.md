# Āithreya Backend API

Backend REST API for Āithreya - An intelligent civic education platform for learning about the Indian Constitution.

## Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aithreya
JWT_SECRET=your_super_secret_jwt_key
```

5. Start MongoDB (if running locally):
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

6. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── index.js      # Environment config
│   │   └── database.js   # MongoDB connection
│   ├── controllers/      # Route controllers
│   │   ├── authController.js
│   │   ├── contentController.js
│   │   └── progressController.js
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js       # JWT authentication
│   │   ├── errorHandler.js
│   │   ├── security.js   # Security middleware
│   │   └── validation.js # Input validation
│   ├── models/          # Mongoose models
│   │   ├── User.js
│   │   ├── Content.js
│   │   ├── CaseStudy.js
│   │   ├── Progress.js
│   │   └── index.js
│   ├── routes/          # API routes
│   │   ├── authRoutes.js
│   │   ├── contentRoutes.js
│   │   └── progressRoutes.js
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "phoneNumber": "9876543210",
  "preferredLanguage": "en",
  "educationLevel": "undergraduate"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/v1/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Updated",
  "preferredLanguage": "hi",
  "darkMode": true
}
```

#### Change Password
```http
PUT /api/v1/auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "Password123",
  "newPassword": "NewPassword456"
}
```

#### Refresh Token
```http
POST /api/v1/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

### Content Endpoints

#### Get All Content
```http
GET /api/v1/content?contentType=fundamental-right&difficulty=beginner&language=en&page=1&limit=20
```

**Query Parameters:**
- `contentType`: article, fundamental-right, directive-principle, fundamental-duty, preamble
- `difficulty`: beginner, intermediate, advanced
- `language`: en, hi, ta, te, kn, ml, mr, gu, bn, pa, or
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search query
- `sortBy`: Field to sort by (default: createdAt)
- `sortOrder`: asc or desc (default: desc)

#### Get Content by ID
```http
GET /api/v1/content/:id?language=en
```

#### Get Content by Article Number
```http
GET /api/v1/content/article/14?language=en
```

#### Get Fundamental Rights
```http
GET /api/v1/content/fundamental-rights?language=en
```

#### Get Directive Principles
```http
GET /api/v1/content/directive-principles?language=en
```

#### Get Fundamental Duties
```http
GET /api/v1/content/fundamental-duties?language=en
```

#### Get Preamble
```http
GET /api/v1/content/preamble?language=en
```

#### Search Content
```http
GET /api/v1/content/search?q=equality&contentType=fundamental-right&limit=10
```

### Progress Endpoints

All progress endpoints require authentication.

#### Get Overall Progress
```http
GET /api/v1/progress/overview
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalContent": 50,
      "completedContent": 20,
      "inProgressContent": 10,
      "bookmarkedContent": 15,
      "totalTimeSpent": 7200,
      "averageScore": 85
    }
  }
}
```

#### Get All User Progress
```http
GET /api/v1/progress?status=completed&page=1&limit=20
Authorization: Bearer {token}
```

#### Get Progress for Specific Content
```http
GET /api/v1/progress/content/:contentId
Authorization: Bearer {token}
```

#### Update Progress
```http
POST /api/v1/progress/:contentId
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "in-progress",
  "completionPercentage": 50,
  "timeSpent": 300
}
```

#### Mark Content as Started
```http
POST /api/v1/progress/:contentId/start
Authorization: Bearer {token}
```

#### Mark Content as Completed
```http
POST /api/v1/progress/:contentId/complete
Authorization: Bearer {token}
```

#### Toggle Bookmark
```http
POST /api/v1/progress/:contentId/bookmark
Authorization: Bearer {token}
```

#### Add Quiz Attempt
```http
POST /api/v1/progress/:contentId/quiz
Authorization: Bearer {token}
Content-Type: application/json

{
  "score": 80,
  "totalQuestions": 10,
  "correctAnswers": 8,
  "timeTaken": 300
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quiz attempt recorded",
  "data": {
    "progress": { ... },
    "xpEarned": 8,
    "levelUp": true,
    "newLevel": 5
  }
}
```

#### Add Note
```http
POST /api/v1/progress/:contentId/notes
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Important point about Article 14"
}
```

#### Get Bookmarked Content
```http
GET /api/v1/progress/bookmarks?page=1&limit=20
Authorization: Bearer {token}
```

## Data Models

### User Schema

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phoneNumber: String,
  avatar: String,
  preferredLanguage: String,
  educationLevel: String,
  interests: [String],
  experiencePoints: Number,
  level: Number,
  badges: [Badge],
  streak: { current, longest, lastActiveDate },
  isEmailVerified: Boolean,
  role: String (user/educator/admin)
}
```

### Content Schema

```javascript
{
  contentId: String (unique),
  contentType: String,
  title: String,
  articleNumber: String,
  content: { en, hi, ta, te, ... },
  explanation: { en, hi, ta, te, ... },
  keyPoints: [String],
  keywords: [String],
  part: { number, title },
  difficulty: String,
  relatedArticles: [ObjectId],
  relatedCases: [ObjectId],
  isActive: Boolean
}
```

### Progress Schema

```javascript
{
  userId: ObjectId,
  contentId: ObjectId,
  status: String,
  completionPercentage: Number,
  timeSpent: Number,
  isBookmarked: Boolean,
  quizAttempts: [QuizAttempt],
  notes: [Note],
  highlights: [Highlight]
}
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Protection against brute-force attacks
- **Input Validation**: Express-validator for all inputs
- **Input Sanitization**: Protection against NoSQL injection
- **Helmet**: Security headers
- **CORS**: Configured for specific origins

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [ ... ] // Optional validation errors
}
```

HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Scripts

```bash
# Start production server
npm start

# Start development server with nodemon
npm run dev

# Run tests
npm test

# Run tests in CI mode
npm run test:ci
```

## Environment Variables

See [.env.example](.env.example) for all available environment variables.

Required variables:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `PORT`: Server port (default: 5000)

## Future Enhancements

- [ ] ElasticSearch integration for advanced case law search
- [ ] OpenAI + LangChain for AI Assistant
- [ ] Redis caching for improved performance
- [ ] Firebase Admin SDK integration
- [ ] AWS S3 for file storage
- [ ] Automated tests (unit, integration, E2E)
- [ ] API documentation with Swagger/OpenAPI
- [ ] WebSocket support for real-time features

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - See LICENSE file for details

---

Built with ❤️ for civic education in India
