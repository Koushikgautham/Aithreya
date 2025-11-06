# Āithreya - Project Overview

## 🕉️ Vision

Āithreya is an intelligent civic education platform designed to make the Indian Constitution accessible, understandable, and engaging for every citizen. Through simplified explanations, multilingual support, and AI-powered assistance, we aim to bridge the gap between complex legal text and everyday understanding.

## 📱 What We're Building

A comprehensive mobile application (Flutter) with a robust backend API (Node.js) that offers:

- **Structured Learning Modules**: Preamble, Fundamental Rights, Directive Principles, Fundamental Duties
- **AI-Powered Assistant**: Natural language queries about constitutional topics
- **Case Law Explorer**: Search and learn from landmark Supreme Court judgments
- **Personalized Learning Paths**: Tailored recommendations based on user progress
- **Multi-Language Support**: All 11 major Indian languages
- **Gamification**: XP, levels, badges, and learning streaks
- **Offline Access**: Learn anytime, anywhere

## 🏗️ Architecture

### Backend (Currently Built)
- **Framework**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based secure authentication
- **Security**: Helmet, CORS, rate limiting, input validation
- **API Design**: RESTful API with versioning

### Frontend (To Be Built)
- **Framework**: Flutter (Dart)
- **State Management**: Provider/Riverpod/Bloc
- **Local Storage**: Hive/SQLite for offline access
- **UI/UX**: Material Design with Indian aesthetic elements

### Future Integrations
- **AI**: OpenAI GPT + LangChain for conversational assistant
- **Search**: ElasticSearch for advanced case law search
- **Caching**: Redis for performance optimization
- **Storage**: AWS S3 or Firebase Storage for media
- **Analytics**: User engagement and learning analytics

## 📊 Current Progress

### ✅ Completed (Phase 1: Backend Foundation)

1. **Project Structure**
   - Organized folder structure
   - Configuration management
   - Environment setup

2. **Database Models**
   - User model with authentication, gamification
   - Content model (multilingual constitutional content)
   - Progress tracking model
   - Case study model

3. **Authentication System**
   - User registration with validation
   - Secure login with password hashing
   - JWT token generation and verification
   - Profile management
   - Password change functionality
   - Token refresh mechanism

4. **Content Management**
   - CRUD operations for constitutional content
   - Multilingual support (11 Indian languages)
   - Search functionality
   - Filtering by type, difficulty, part
   - Related content linking

5. **Progress Tracking**
   - User progress monitoring
   - Bookmark system
   - Quiz attempts and scoring
   - Time tracking
   - Notes and highlights
   - XP and leveling system

6. **Security & Validation**
   - JWT authentication middleware
   - Role-based authorization
   - Input validation and sanitization
   - Rate limiting (general + auth-specific)
   - Security headers with Helmet
   - CORS configuration

7. **Documentation**
   - Comprehensive API documentation
   - Setup guide
   - Postman collection for testing
   - Code comments and inline docs

### 📋 Next Steps (Phase 2: Flutter App)

1. **Flutter Project Setup**
   - Initialize Flutter project
   - Configure dependencies
   - Set up folder structure
   - Configure Firebase

2. **Core UI Components**
   - Authentication screens (login, register)
   - Home dashboard
   - Content viewing screens
   - Profile management

3. **API Integration**
   - HTTP client setup (Dio)
   - API service layer
   - State management implementation
   - Error handling

4. **Core Features**
   - Browse constitutional content
   - Search and filters
   - Bookmarking
   - Progress tracking
   - User profile

5. **Offline Support**
   - Local database setup
   - Content caching
   - Sync mechanism

### 🚀 Future Phases

**Phase 3: AI Integration**
- OpenAI integration for conversational queries
- Smart recommendations
- Question answering system

**Phase 4: Advanced Features**
- ElasticSearch for case law
- Quiz generation
- Learning path algorithms
- Social features (share progress)

**Phase 5: Polish & Launch**
- Text-to-speech
- Accessibility features
- Performance optimization
- App store submission

## 🗂️ Project Structure

```
Aithreya/
├── backend/                 # Node.js API (✅ COMPLETE)
│   ├── src/
│   │   ├── config/         # Environment & DB config
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, validation, security
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── utils/          # Utilities & seeder
│   │   ├── app.js          # Express app
│   │   └── server.js       # Server entry point
│   ├── .env.example
│   ├── package.json
│   ├── README.md
│   ├── SETUP.md
│   └── postman_collection.json
│
├── mobile/                  # Flutter app (⏳ TO DO)
│   └── (To be created)
│
└── PROJECT_OVERVIEW.md      # This file
```

## 🔑 Key Features Breakdown

### 1. User Management
- **Registration**: Email-based with password strength validation
- **Authentication**: Secure JWT tokens with refresh mechanism
- **Profile**: Customizable preferences (language, education level)
- **Gamification**: XP points, levels, badges, daily streaks

### 2. Content System
- **Types**: Articles, Fundamental Rights, Directive Principles, Duties, Preamble
- **Multilingual**: English + 10 Indian languages
- **Organization**: By Parts, Chapters, Article numbers
- **Metadata**: Difficulty levels, estimated read time, keywords
- **Rich Content**: Text, explanations, key points, related links

### 3. Learning & Progress
- **Tracking**: View count, time spent, completion percentage
- **Bookmarks**: Save important articles for later
- **Notes**: Personal annotations on content
- **Quizzes**: Test understanding with scoring
- **Progress Overview**: Dashboard with statistics

### 4. Search & Discovery
- **Full-Text Search**: MongoDB text search
- **Filters**: By type, difficulty, part, language
- **Related Content**: Smart linking between articles
- **Case Studies**: Landmark judgments linked to articles

## 🛠️ Technology Stack

### Backend
| Component | Technology | Purpose |
|-----------|-----------|---------|
| Runtime | Node.js v18+ | Server-side JavaScript |
| Framework | Express.js | Web framework |
| Database | MongoDB | NoSQL database |
| ODM | Mongoose | Object modeling |
| Auth | JWT | Stateless authentication |
| Validation | express-validator | Input validation |
| Security | Helmet, CORS | Security headers |
| Logging | Morgan | HTTP logging |
| Hashing | bcrypt | Password encryption |

### Frontend (Planned)
| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Flutter | Cross-platform mobile |
| Language | Dart | Programming language |
| State | Provider/Riverpod | State management |
| HTTP | Dio | API client |
| Storage | Hive/SQLite | Local persistence |
| Auth | firebase_auth | Authentication |

### Future Integrations
| Service | Purpose |
|---------|---------|
| OpenAI API | AI conversational assistant |
| LangChain | AI orchestration |
| ElasticSearch | Advanced search |
| Redis | Caching layer |
| AWS S3 | Media storage |
| Firebase | Push notifications |

## 📈 API Endpoints Summary

### Authentication (`/api/v1/auth`)
- `POST /register` - Create new user
- `POST /login` - User login
- `GET /me` - Get current user
- `PUT /profile` - Update profile
- `PUT /change-password` - Change password
- `POST /refresh-token` - Refresh access token

### Content (`/api/v1/content`)
- `GET /` - List all content with filters
- `GET /:id` - Get specific content
- `GET /article/:number` - Get by article number
- `GET /fundamental-rights` - List all rights
- `GET /directive-principles` - List all DPSPs
- `GET /fundamental-duties` - List all duties
- `GET /preamble` - Get preamble
- `GET /search` - Search content

### Progress (`/api/v1/progress`)
- `GET /overview` - Overall progress stats
- `GET /` - All user progress
- `GET /content/:id` - Progress for content
- `POST /:id` - Update progress
- `POST /:id/start` - Mark as started
- `POST /:id/complete` - Mark as completed
- `POST /:id/bookmark` - Toggle bookmark
- `POST /:id/quiz` - Submit quiz attempt
- `POST /:id/notes` - Add note
- `GET /bookmarks` - Get bookmarked content

## 🎯 Target Users

1. **Students** (Classes 8-12, College)
   - Learn constitutional concepts for exams
   - Simplified explanations
   - Quiz and assessment features

2. **Educators**
   - Teaching resource
   - Case study references
   - Structured curriculum

3. **General Citizens**
   - Understand their rights and duties
   - Civic awareness
   - Real-world applications

4. **Law Students & Aspirants**
   - UPSC preparation
   - Judicial services prep
   - Case law research

## 🌟 Unique Selling Points

1. **Simplified Legal Language**: Complex constitutional text made simple
2. **Multilingual**: True accessibility for all Indians
3. **AI Assistant**: Ask questions naturally, get instant answers
4. **Gamified Learning**: Make constitutional education fun
5. **Offline First**: Learn without internet dependency
6. **Case Law Integration**: Real-world applications of articles
7. **Personalized**: Adapts to user's learning pace and interests

## 📝 Sample Data

The backend includes a seeder with sample data:
- Preamble (EN + HI)
- Article 14 - Equality before law
- Article 19 - Freedom of speech
- Fundamental Duty 51A(a)

Run the seeder: `node src/utils/seeder.js`

## 🔐 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT tokens with expiration
- Refresh token mechanism
- Rate limiting (100 requests/15 min general, 5 attempts/15 min auth)
- Input validation and sanitization
- NoSQL injection prevention
- Security headers via Helmet
- CORS protection

## 📱 Mobile App Features (Planned)

- Clean, intuitive Material Design UI
- Dark mode support
- Swipe gestures for navigation
- Pull-to-refresh
- Offline mode indicators
- Push notifications for daily learning reminders
- Share content feature
- Text-to-speech for accessibility
- Adjustable font sizes
- Bookmark syncing across devices

## 🚀 Getting Started

### Backend Setup (Already Complete)

1. Navigate to backend directory
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Configure MongoDB connection
5. Run seeder: `node src/utils/seeder.js`
6. Start server: `npm run dev`

See [backend/SETUP.md](backend/SETUP.md) for detailed instructions.

### Frontend Setup (Coming Next)

Will be covered in the next phase of development.

## 🤝 Contributing

This project aims to improve civic education in India. Contributions are welcome in:
- Content creation (constitutional articles, case studies)
- Translation (Indian languages)
- Code improvements
- UI/UX design
- Documentation

## 📄 License

MIT License - Built for education, by the people, for the people.

---

**Status**: Phase 1 Complete ✅ | Phase 2 In Planning 📋

**Next Milestone**: Flutter app initialization and UI development

Built with ❤️ for India
