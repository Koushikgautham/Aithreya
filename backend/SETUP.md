# Āithreya Backend - Quick Setup Guide

## Prerequisites Check

Before you begin, make sure you have:

- [ ] Node.js (v18+) installed
- [ ] MongoDB (v6+) installed and running
- [ ] npm or yarn package manager
- [ ] A code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages including Express, MongoDB, JWT, and security middleware.

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Minimum required configuration
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aithreya
JWT_SECRET=change_this_to_a_long_random_string_min_32_chars
JWT_REFRESH_SECRET=change_this_to_another_long_random_string
```

**Important**: Replace the JWT secrets with long random strings. You can generate them using:

```bash
# On Windows (PowerShell)
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# On macOS/Linux
openssl rand -base64 32
```

### 3. Start MongoDB

**Windows:**
```bash
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Using Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Seed Sample Data (Optional)

To populate the database with sample constitutional content:

```bash
node src/utils/seeder.js
```

This will insert:
- Preamble
- Sample Fundamental Rights (Articles 14, 19)
- Sample Fundamental Duties

### 5. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🕉️  Āithreya API Server Running                        ║
║                                                           ║
║   Environment: development                                ║
║   Port: 5000                                              ║
║   API Version: v1                                         ║
║                                                           ║
║   Health Check: http://localhost:5000/health             ║
║   API Endpoint: http://localhost:5000/api/v1             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### 6. Test the API

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Register a User:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test1234"
  }'
```

**Get Preamble:**
```bash
curl http://localhost:5000/api/v1/content/preamble
```

## Troubleshooting

### MongoDB Connection Failed

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**
1. Make sure MongoDB is running: `mongod --version`
2. Check the connection string in `.env`
3. Try connecting manually: `mongosh` (or `mongo` for older versions)

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
1. Change the `PORT` in `.env` to a different number (e.g., 5001)
2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F

   # macOS/Linux
   lsof -ti:5000 | xargs kill -9
   ```

### JWT Secret Missing

**Error:** Token generation fails

**Solution:**
Make sure `JWT_SECRET` is set in your `.env` file with at least 32 characters.

### Validation Errors on Registration

**Error:** "Password must contain at least one uppercase letter..."

**Solution:**
Passwords must:
- Be at least 6 characters long
- Contain at least one uppercase letter
- Contain at least one lowercase letter
- Contain at least one number

Example valid password: `MyPass123`

## Next Steps

### 1. Test All Endpoints

Use a REST client like:
- Postman (recommended)
- Insomnia
- Thunder Client (VS Code extension)

Import the API documentation from [backend/README.md](./README.md).

### 2. Add More Content

Use the seeder as a template to add more constitutional articles, rights, and duties.

### 3. Configure Additional Services

For production deployment, configure:
- ElasticSearch (for case law search)
- Redis (for caching)
- OpenAI API (for AI assistant)
- AWS S3 or Firebase Storage (for media files)

### 4. Set Up Frontend

Once the backend is running, proceed to set up the Flutter mobile application.

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Run database seeder
node src/utils/seeder.js

# Check for security vulnerabilities
npm audit

# Update dependencies
npm update
```

## Project URLs

- API Base: `http://localhost:5000/api/v1`
- Health Check: `http://localhost:5000/health`
- MongoDB: `mongodb://localhost:27017/aithreya`

## Getting Help

If you encounter issues:
1. Check the [README.md](./README.md) for API documentation
2. Review error logs in the console
3. Ensure all environment variables are set correctly
4. Verify MongoDB is running and accessible

---

Happy coding! 🚀
