# FHIR POC - Healthcare Data Platform

A full-stack monorepo application featuring React (client) and NestJS (backend) with authentication and FHIR API integration.

## 🏗️ Project Structure

```
CODE/
├── client/                 # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts (Auth)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.tsx         # Main app component
│   └── package.json
├── server/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   ├── fhir/           # FHIR integration module
│   │   └── main.ts         # App entry point
│   └── package.json
├── docker-compose.yml      # Docker orchestration
└── package.json            # Root package.json
```

## ✨ Features

- **Authentication**: JWT-based authentication with login/register
- **FHIR Integration**: Connect to FHIR servers to fetch healthcare data
- **Patient Management**: View, search, and manage patient records
- **Modern UI**: Clean and responsive React interface
- **Monorepo Setup**: Single repository for both client and server
- **Docker Support**: Easy deployment with Docker Compose

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- (Optional) Docker and Docker Compose

### Option 1: Local Development (Without Docker)

1. **Clone and navigate to the project**
   ```bash
   cd CODE
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   cd ..
   ```

3. **Set up environment variables**

   **Server** (`server/.env`):
   ```env
   PORT=3001
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=1d
   FHIR_BASE_URL=https://hapi.fhir.org/baseR4
   CORS_ORIGIN=http://localhost:5173
   ```

   **Client** (`client/.env`):
   ```env
   VITE_API_URL=/api
   ```

4. **Start the development servers**

   **Option A: Start both concurrently (from root)**
   ```bash
   npm run dev
   ```

   **Option B: Start separately**
   
   Terminal 1 (Server):
   ```bash
   cd server
   npm run start:dev
   ```

   Terminal 2 (Client):
   ```bash
   cd client
   npm run dev
   ```

5. **Access the application**
   - Client: http://localhost:5173
   - Server: http://localhost:3001

### Option 2: Docker Development

1. **Build and start containers**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Client: http://localhost:5173
   - Server: http://localhost:3001

3. **Stop containers**
   ```bash
   docker-compose down
   ```

## 📖 Usage Guide

### 1. Authentication

1. **Register a new account**
   - Navigate to http://localhost:5173/register
   - Fill in your name, email, and password (min 6 characters)
   - Click "Register"

2. **Login**
   - Navigate to http://localhost:5173/login
   - Enter your credentials
   - Click "Login"

### 2. Dashboard

After logging in, you'll see the dashboard with:
- Quick access to patient records
- FHIR server connection status
- Available resources

### 3. Patient Management

**View Patients:**
- Click "Patients" in the navigation
- Browse the list of patients from the FHIR server

**Search Patients:**
- Use the search bar to find patients by name
- Click "Search" or press Enter
- Click "Clear" to reset

**View Patient Details:**
- Click on any patient card
- View detailed information including:
  - Personal information
  - Medical observations
  - Contact details

## 🔧 API Endpoints

### Authentication

- `POST /auth/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /auth/me` - Get current user (requires JWT)

### FHIR Resources (All require JWT authentication)

- `GET /fhir/metadata` - Get FHIR server metadata
- `GET /fhir/patients?limit=10` - Get patients list
- `GET /fhir/patients/search?name=john` - Search patients by name
- `GET /fhir/patients/:id` - Get patient by ID
- `GET /fhir/patients/:id/observations?limit=10` - Get patient observations
- `GET /fhir/practitioners?limit=10` - Get practitioners list

## 🧪 Testing the Setup

### 1. Test Backend Health
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Test Registration
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### 3. Test FHIR Connection
First login and get the token, then:
```bash
curl http://localhost:3001/fhir/patients?limit=5 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🏥 FHIR Integration

This POC connects to the public HAPI FHIR Server (https://hapi.fhir.org/baseR4) by default. 

### Using a Different FHIR Server

To connect to a different FHIR server, update the `FHIR_BASE_URL` in your environment variables:

```env
FHIR_BASE_URL=https://your-fhir-server.com/fhir
```

### Supported FHIR Resources

Currently implemented:
- ✅ Patient
- ✅ Observation
- ✅ Practitioner
- ✅ Metadata/Capabilities

Easy to extend for additional resources like:
- Condition
- MedicationRequest
- Appointment
- Encounter

## 🛠️ Development

### Adding New FHIR Resources

1. **Add service method** in `server/src/fhir/fhir.service.ts`:
```typescript
async getConditions(patientId: string, limit: number = 10) {
  const url = `${this.fhirBaseUrl}/Condition?patient=${patientId}&_count=${limit}`;
  const response = await firstValueFrom(this.httpService.get(url));
  return response.data;
}
```

2. **Add controller endpoint** in `server/src/fhir/fhir.controller.ts`:
```typescript
@Get('patients/:id/conditions')
async getConditions(@Param('id') id: string, @Query('limit') limit: string) {
  const limitNum = limit ? parseInt(limit, 10) : 10;
  return this.fhirService.getConditions(id, limitNum);
}
```

3. **Add API method** in `client/src/services/api.ts`:
```typescript
getConditions: (patientId: string, limit: number = 10) =>
  api.get(`/fhir/patients/${patientId}/conditions?limit=${limit}`),
```

### Build for Production

**Server:**
```bash
cd server
npm run build
npm run start:prod
```

**Client:**
```bash
cd client
npm run build
npm run preview
```

## 📦 Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Axios

### Backend
- NestJS
- TypeScript
- Passport JWT
- Bcrypt
- Axios

### DevOps
- Docker
- Docker Compose

## 🔐 Security Notes

⚠️ **Important**: This is a POC setup. For production:

1. **Change the JWT secret** - Use a strong, random secret
2. **Use a real database** - Currently using in-memory storage
3. **Enable HTTPS** - Always use SSL/TLS in production
4. **Add rate limiting** - Protect against brute force attacks
5. **Validate all inputs** - Add comprehensive validation
6. **Secure FHIR credentials** - If using a private FHIR server
7. **Environment variables** - Never commit `.env` files

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### CORS Issues
- Ensure `CORS_ORIGIN` in server matches client URL
- Check that proxy is configured in `client/vite.config.ts`

### Docker Issues
```bash
# Clean rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### FHIR Connection Issues
- Check internet connection
- Verify FHIR_BASE_URL is correct
- Try accessing the FHIR server directly in browser

## 📝 License

This is a POC project for educational purposes.

## 👥 Contributing

This is a proof of concept. Feel free to fork and extend for your needs.

## 🙏 Acknowledgments

- HAPI FHIR for providing the public test server
- HL7 FHIR community for the FHIR standard

