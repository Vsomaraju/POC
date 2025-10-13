# Quick Setup Guide

## Installation Steps

### 1. Install Dependencies

```bash
# From the root directory (CODE/)

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Go back to root
cd ..
```

### 2. Environment Setup

The `.env` files are already created with default values. You can modify them if needed:

- `server/.env` - Backend configuration
- `client/.env` - Frontend configuration

### 3. Start Development Servers

**Option A: Start both servers together (Recommended)**
```bash
# From root directory
npm install  # Install concurrently
npm run dev
```

**Option B: Start separately in different terminals**

Terminal 1 - Backend:
```bash
cd server
npm run start:dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## First Time Usage

1. **Register an Account**
   - Go to http://localhost:5173
   - Click "Register here"
   - Create an account with:
     - Name: Your name
     - Email: any email (e.g., test@example.com)
     - Password: minimum 6 characters

2. **Login**
   - Use your credentials to login
   - You'll be redirected to the dashboard

3. **Explore FHIR Data**
   - Click "Patients" to see patient records from the FHIR server
   - Search for specific patients
   - Click on any patient to view details and observations

## Troubleshooting

### "Port already in use" error

**For port 3001 (Backend):**
```bash
lsof -ti:3001 | xargs kill -9
```

**For port 5173 (Frontend):**
```bash
lsof -ti:5173 | xargs kill -9
```

### Module not found errors
```bash
# Reinstall dependencies
cd server
rm -rf node_modules package-lock.json
npm install

cd ../client
rm -rf node_modules package-lock.json
npm install
```

### CORS errors
Make sure both servers are running and the proxy is configured correctly in `client/vite.config.ts`.

## Docker Alternative

If you prefer using Docker:

```bash
# From root directory
docker-compose up --build
```

This will start both frontend and backend in containers.

## Need Help?

Check the main [README.md](./README.md) for detailed documentation.

