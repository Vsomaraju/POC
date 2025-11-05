# 🚀 Getting Started - FHIR POC

Welcome! This guide will help you get the FHIR POC application up and running in minutes.

## ✅ Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js 18 or higher (`node --version`)
- ✅ npm (`npm --version`)
- ✅ (Optional) Docker Desktop (for Docker setup)

## 🎯 Quick Start (3 Steps)

### Step 1: Install Dependencies

Open your terminal in the `CODE` directory and run:

```bash
# Install all dependencies (root, server, and Nx apps)
npm install

# Install server dependencies
cd server
npm install
cd ..
```

This might take 2-3 minutes. ☕

### Step 2: Start the Application

From the root `CODE` directory:

```bash
npm run dev
```

This will start the backend server and both micro frontends (host and patient-portal) simultaneously!

You should see:
```
[server] 🚀 Server is running on http://localhost:3001
[host] ➜  Local:   http://localhost:4200/
[patient-portal] ➜  Local:   http://localhost:4201/
```

### Step 3: Open and Test

1. **Open your browser** → http://localhost:4200 (Host app with micro frontends)

2. **Register a new account**:
   - Click "Register here"
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `test123` (minimum 6 characters)

3. **Explore the app**:
   - You'll be logged in automatically
   - Click "Patients" to see FHIR data
   - Search for patients by name
   - Click on a patient to see details and observations

## 🎉 That's it! You're running!

The app is now connected to a public FHIR server (HAPI FHIR) and fetching real healthcare data.

---

## 🔍 What Just Happened?

### Backend (Port 3001)
- ✅ NestJS server started
- ✅ JWT authentication ready
- ✅ Connected to FHIR server
- ✅ API endpoints active

### Frontend (Micro Frontends)
- ✅ Host app running on port 4200
- ✅ Patient Portal micro frontend on port 4201
- ✅ Module Federation enabled
- ✅ Vite dev server with hot reload
- ✅ Modern UI ready

---

## 📱 Using the Application

### 1. Authentication
- **Register**: Create a new account (stored in memory during development)
- **Login**: Use your credentials
- **Logout**: Click logout button in navbar

### 2. Dashboard
- View FHIR server information
- Quick access to patients
- Server connection status

### 3. Patients
- **View All**: See list of patients from FHIR server
- **Search**: Type a name and click search (try "Smith", "John", etc.)
- **Details**: Click any patient card to view full details
- **Observations**: See medical observations for each patient

---

## 🛠️ Alternative: Docker Setup

If you prefer using Docker:

```bash
# From the CODE directory
docker-compose up --build
```

Then open http://localhost:4200

Stop with:
```bash
docker-compose down
```

---

## ⚡ Quick Commands Reference

### Development
```bash
# Start both (from root)
npm run dev

# Start server only
cd server && npm run start:dev

# Start host app only
npm run dev:host

# Start patient-portal only
npm run dev:patient-portal
```

### Testing Backend
```bash
# Health check
curl http://localhost:3001/health

# Get server info
curl http://localhost:3001
```

### Stop Servers
- Press `Ctrl + C` in the terminal
- Or close the terminal window

---

## 🐛 Common Issues & Fixes

### Issue: "Port already in use"

**Solution**:
```bash
# Kill port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill port 4200 (host app)
lsof -ti:4200 | xargs kill -9

# Kill port 4201 (patient-portal)
lsof -ti:4201 | xargs kill -9
```

### Issue: "Module not found" errors

**Solution**:
```bash
# Reinstall dependencies
cd server
rm -rf node_modules
npm install

# Reinstall root dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Can't see patients data

**Checklist**:
1. ✅ Backend server running? (check terminal)
2. ✅ Logged in? (register/login first)
3. ✅ Internet connection? (FHIR server is online)
4. ✅ Check browser console for errors (F12)

### Issue: "Failed to fetch" errors

**Solution**:
- Make sure both servers are running
- Check if http://localhost:3001/health returns OK
- Verify token is set (check localStorage in browser DevTools)

---

## 📚 Learn More

- **Full Documentation**: See [README.md](./README.md)
- **Project Structure**: See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- **Micro Frontend Guide**: See [MICRO_FRONTEND_GUIDE.md](./MICRO_FRONTEND_GUIDE.md)

---

## 🎓 What to Explore Next

### For Frontend Developers:
1. Check `apps/patient-portal/src/pages/` - Add new pages
2. Look at `apps/patient-portal/src/components/` - Create new components
3. Explore `apps/patient-portal/src/contexts/AuthContext.tsx` - State management
4. Check `apps/host/` - Host application for micro frontends
5. See `MICRO_FRONTEND_GUIDE.md` - Learn about micro frontend architecture

### For Backend Developers:
1. Check `server/src/fhir/` - Add new FHIR resources
2. Look at `server/src/auth/` - Enhance authentication
3. Explore `server/src/app.module.ts` - Add new modules

### Try These:
- [ ] Add a new FHIR resource type (e.g., Conditions, Medications)
- [ ] Create a profile page for users
- [ ] Add data visualization (charts)
- [ ] Implement data caching
- [ ] Add more search filters

---

## 🤝 Need Help?

1. **Check the documentation files** in this directory
2. **Look at the code comments** - well documented
3. **Check the browser console** for errors (F12)
4. **Check the server logs** in your terminal

---

## ✨ Pro Tips

1. **Keep both terminals open** to see logs from both services
2. **Use browser DevTools** (F12) to debug frontend
3. **The app auto-reloads** when you edit code (hot reload)
4. **Data is stored in memory** - restarting server clears users
5. **FHIR data is from public test server** - it's real but test data

---

## 🎯 Success Checklist

- [x] ✅ Dependencies installed
- [x] ✅ Servers running
- [x] ✅ Registered an account
- [x] ✅ Can see patients list
- [x] ✅ Can view patient details
- [x] ✅ Can search patients

**You're all set! Happy coding! 🚀**

---

*Last updated: November 2024 - Migrated to Micro Frontend Architecture*

