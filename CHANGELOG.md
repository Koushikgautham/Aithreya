# Changelog

All notable changes to the Āithreya project will be documented in this file.

## [0.1.0] - 2025-11-06 - Backend Foundation Complete

### 🎉 Initial Release - Backend API

This is the first release of Āithreya, focusing on a complete, production-ready backend API.

### ✨ Features Added

#### Authentication System
- User registration with comprehensive validation
- Secure login with JWT tokens
- Password hashing using bcrypt (10 rounds)
- Token refresh mechanism
- Profile management (update preferences, language, settings)
- Password change functionality
- Role-based authorization (user, educator, admin)
- Firebase UID integration support

#### User Management
- User profiles with personal information
- Gamification system:
  - Experience points (XP)
  - Leveling system (100 XP per level)
  - Badges and achievements
  - Daily learning streaks
- Preference settings:
  - Preferred language (11 Indian languages)
  - Dark mode toggle
  - Notification settings
  - Education level
  - Interest areas

#### Content Management
- Multilingual constitutional content (English + 10 Indian languages)
- Content types supported:
  - Preamble
  - Fundamental Rights
  - Directive Principles of State Policy
  - Fundamental Duties
  - Constitutional Articles
  - Amendments
  - Schedules
- Content features:
  - Article numbering
  - Difficulty levels (beginner, intermediate, advanced)
  - Estimated read time
  - Key points extraction
  - Keywords for search
  - Part and chapter organization
  - Related content linking
  - Related case studies linking
- Full-text search functionality
- Advanced filtering (type, difficulty, part, language)
- View count tracking
- Like system

#### Progress Tracking
- Individual content progress tracking
- Status tracking (not-started, in-progress, completed)
- Completion percentage monitoring
- Time spent tracking (in seconds)
- Last accessed timestamp
- View count per content
- Overall progress statistics:
  - Total content accessed
  - Completed content count
  - In-progress content count
  - Bookmarked content count
  - Total time spent
  - Average quiz scores

#### Bookmarking & Notes
- Bookmark/unbookmark content
- Personal notes on content (max 1000 characters)
- Text highlights with color coding
- Position tracking for highlights
- Timestamped notes and highlights

#### Quiz System
- Multiple quiz attempts per content
- Score tracking (0-100%)
- Question statistics (total, correct answers)
- Time taken for quizzes
- Best score tracking
- Auto-completion on 80%+ score
- XP rewards based on score
- Level-up notifications

#### Case Studies
- Landmark Supreme Court judgments
- Case details:
  - Case name and citation
  - Court and year
  - Judges panel
  - Case facts and issues
  - Judgment summary
  - Constitutional significance
- Multilingual summaries
- Related article linking
- Category classification (landmark, important, reference)
- External source links
- PDF support

#### Search & Discovery
- MongoDB full-text search
- Keyword-based search
- Multi-field search (title, content, explanation)
- Search result ranking by relevance
- Filter by content type
- Filter by difficulty level
- Language-specific search
- Article number lookup

### 🔒 Security Features

#### Authentication & Authorization
- JWT-based stateless authentication
- Separate access and refresh tokens
- Token expiration (7 days default)
- Refresh token (30 days default)
- Role-based access control
- Optional authentication middleware

#### Input Validation
- Comprehensive request validation using express-validator
- Email format validation
- Password strength requirements:
  - Minimum 6 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
- Phone number validation (10 digits)
- Language code validation
- Content type validation
- Score range validation (0-100)

#### Security Middleware
- Helmet.js for security headers
- CORS protection with configurable origins
- Rate limiting:
  - General API: 100 requests per 15 minutes
  - Authentication routes: 5 attempts per 15 minutes
- NoSQL injection prevention
- Input sanitization (removes $ and . from keys)
- XSS protection

#### Error Handling
- Centralized error handling
- Custom ApiError class
- Mongoose error handling:
  - CastError (invalid ObjectId)
  - ValidationError
  - Duplicate key errors
- JWT error handling
- Environment-specific stack traces
- Consistent error response format

### 📊 Database Models

#### User Schema
- Personal information (name, email, phone, avatar)
- Authentication (hashed password, Firebase UID)
- Preferences (language, theme, notifications)
- Learning profile (education level, interests)
- Gamification (XP, level, badges, streaks)
- Account status (verified, active, role)
- Security fields (password reset, email verification)
- Timestamps (created, updated, last login)

#### Content Schema
- Identification (contentId, type, article number)
- Multilingual content and explanations (11 languages)
- Organization (part, chapter)
- Metadata (difficulty, read time, keywords)
- Relationships (related articles, cases)
- Media (audio, video, images)
- Status and analytics
- Text search indexing

#### Progress Schema
- User and content references
- Status and completion tracking
- Time tracking
- Bookmark functionality
- Quiz attempts with detailed stats
- Notes with timestamps
- Highlights with positions
- Rating and feedback

#### CaseStudy Schema
- Case identification (ID, name, citation)
- Court and year
- Judges information
- Multilingual case details
- Related constitutional articles
- External links (source URL, PDF)
- Categorization
- View tracking

### 🛠️ Infrastructure

#### Project Structure
- Organized folder structure:
  - `/src/config` - Configuration management
  - `/src/controllers` - Business logic
  - `/src/middleware` - Express middleware
  - `/src/models` - Database schemas
  - `/src/routes` - API routing
  - `/src/utils` - Utilities and helpers
- Environment-based configuration
- Database connection management
- Graceful shutdown handling

#### API Design
- RESTful API architecture
- API versioning (`/api/v1`)
- Consistent response format
- Pagination support
- Query parameter filtering
- Sorting capabilities
- Health check endpoint

#### Development Tools
- Nodemon for auto-restart
- Morgan for HTTP logging
- Compression middleware
- Environment variable management
- Database seeder with sample data

### 📚 Documentation

#### API Documentation
- Comprehensive README with all endpoints
- Request/response examples
- Query parameter documentation
- Authentication flow documentation
- Error code reference

#### Setup Documentation
- Detailed setup guide (SETUP.md)
- Quick start guide (GETTING_STARTED.md)
- Project overview (PROJECT_OVERVIEW.md)
- Troubleshooting section
- Common commands reference

#### Testing Tools
- Postman collection with all endpoints
- Environment variables setup
- Sample requests for all endpoints
- Authentication examples

### 📦 Sample Data

Included database seeder with:
- Preamble (English + Hindi)
- Article 14 (Equality before law)
- Article 19 (Freedom of speech and expression)
- Fundamental Duty 51A(a) (Respect Constitution)

### 🎯 API Endpoints Summary

**Total Endpoints**: 29

**Authentication (7 endpoints)**
- POST /auth/register
- POST /auth/login
- GET /auth/me
- PUT /auth/profile
- PUT /auth/change-password
- POST /auth/refresh-token
- POST /auth/logout

**Content (11 endpoints)**
- GET /content
- GET /content/:id
- GET /content/article/:articleNumber
- GET /content/fundamental-rights
- GET /content/directive-principles
- GET /content/fundamental-duties
- GET /content/preamble
- GET /content/search
- POST /content (admin)
- PUT /content/:id (admin)
- DELETE /content/:id (admin)

**Progress (10 endpoints)**
- GET /progress/overview
- GET /progress
- GET /progress/content/:contentId
- POST /progress/:contentId
- POST /progress/:contentId/start
- POST /progress/:contentId/complete
- POST /progress/:contentId/bookmark
- POST /progress/:contentId/quiz
- POST /progress/:contentId/notes
- GET /progress/bookmarks

**Utility (1 endpoint)**
- GET /health

### 🔧 Technical Specifications

- **Node.js**: v18.x or higher
- **Express**: v4.18.x
- **MongoDB**: v6.x or higher
- **Mongoose**: v8.x
- **JWT**: v9.x
- **Bcrypt**: v2.4.x

### 📦 Dependencies

**Production Dependencies (16)**
- express, mongoose, dotenv
- bcryptjs, jsonwebtoken
- cors, helmet, express-rate-limit
- express-validator, morgan, compression
- axios, langchain, openai
- @elastic/elasticsearch, redis

**Development Dependencies (4)**
- nodemon, jest, supertest, @types/jest

### 🚀 Performance Features

- MongoDB indexing on frequently queried fields
- Compound indexes for user+content queries
- Text search indexes for full-text search
- Response compression
- Efficient pagination
- Connection pooling
- Graceful error handling

### 🌐 Internationalization

Supported Languages (11):
- English (en)
- Hindi (hi)
- Tamil (ta)
- Telugu (te)
- Kannada (kn)
- Malayalam (ml)
- Marathi (mr)
- Gujarati (gu)
- Bengali (bn)
- Punjabi (pa)
- Odia (or)

### ✅ Code Quality

- Consistent error handling
- Input validation on all endpoints
- Security best practices
- Clean code organization
- Inline documentation
- Environment-based configuration
- Graceful degradation

---

## [Unreleased] - Future Plans

### 📱 Mobile Application (Phase 2)
- Flutter mobile app
- Offline-first architecture
- Local data synchronization
- Push notifications
- Text-to-speech

### 🤖 AI Integration (Phase 3)
- OpenAI GPT integration
- Conversational AI assistant
- Natural language queries
- Smart recommendations
- Embedding-based search

### 🔍 Advanced Features (Phase 4)
- ElasticSearch integration
- Advanced case law search
- Learning path algorithms
- Social features
- Analytics dashboard

### 🎨 Polish & Launch (Phase 5)
- Accessibility features
- Performance optimization
- Load testing
- App store submission
- Marketing materials

---

**Version History**
- [0.1.0] - 2025-11-06 - Initial backend release

**Next Version**: [0.2.0] - Flutter app foundation (planned)
