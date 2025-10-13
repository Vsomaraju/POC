# FHIR POC Project Structure

## Complete File Tree

```
CODE/
├── README.md                          # Main documentation
├── SETUP.md                           # Quick setup guide
├── PROJECT_STRUCTURE.md               # This file
├── package.json                       # Root package.json (monorepo config)
├── .gitignore                         # Git ignore patterns
├── .prettierrc                        # Prettier configuration
├── docker-compose.yml                 # Docker orchestration
│
├── server/                            # NestJS Backend
│   ├── .env                          # Environment variables (created)
│   ├── .env.example                  # Environment template
│   ├── .dockerignore                 # Docker ignore patterns
│   ├── Dockerfile                    # Server Docker configuration
│   ├── nest-cli.json                 # NestJS CLI configuration
│   ├── package.json                  # Server dependencies
│   ├── tsconfig.json                 # TypeScript configuration
│   └── src/
│       ├── main.ts                   # Application entry point
│       ├── app.module.ts             # Root module
│       ├── app.controller.ts         # Root controller
│       ├── app.service.ts            # Root service
│       │
│       ├── auth/                     # Authentication Module
│       │   ├── auth.module.ts
│       │   ├── auth.service.ts       # JWT & login/register logic
│       │   ├── auth.controller.ts    # Auth endpoints
│       │   ├── dto/
│       │   │   ├── login.dto.ts
│       │   │   └── register.dto.ts
│       │   ├── guards/
│       │   │   └── jwt-auth.guard.ts
│       │   └── strategies/
│       │       ├── jwt.strategy.ts
│       │       └── local.strategy.ts
│       │
│       ├── users/                    # Users Module
│       │   ├── users.module.ts
│       │   └── users.service.ts      # In-memory user storage
│       │
│       └── fhir/                     # FHIR Integration Module
│           ├── fhir.module.ts
│           ├── fhir.service.ts       # FHIR API client
│           └── fhir.controller.ts    # FHIR endpoints
│
└── client/                           # React Frontend
    ├── .env                         # Environment variables (created)
    ├── .env.example                 # Environment template
    ├── .dockerignore                # Docker ignore patterns
    ├── .eslintrc.cjs                # ESLint configuration
    ├── Dockerfile                   # Client Docker configuration
    ├── index.html                   # HTML entry point
    ├── package.json                 # Client dependencies
    ├── tsconfig.json                # TypeScript configuration
    ├── tsconfig.node.json           # TypeScript config for Vite
    ├── vite.config.ts               # Vite configuration
    ├── public/
    │   └── vite.svg                 # Favicon
    └── src/
        ├── main.tsx                 # React entry point
        ├── App.tsx                  # Main app component
        ├── App.css                  # App styles
        ├── index.css                # Global styles
        │
        ├── components/              # Reusable Components
        │   ├── Navbar.tsx           # Navigation bar
        │   └── PrivateRoute.tsx     # Protected route wrapper
        │
        ├── contexts/                # React Contexts
        │   └── AuthContext.tsx      # Authentication state
        │
        ├── pages/                   # Page Components
        │   ├── Login.tsx            # Login page
        │   ├── Register.tsx         # Registration page
        │   ├── Dashboard.tsx        # Dashboard page
        │   ├── Patients.tsx         # Patients list page
        │   └── PatientDetail.tsx    # Patient detail page
        │
        └── services/                # API Services
            └── api.ts               # Axios client & API methods
```

## Key Features by Module

### Backend (NestJS)

#### Authentication (`server/src/auth/`)
- JWT-based authentication
- Password hashing with bcrypt
- Login and register endpoints
- Protected route guards
- Token validation

#### Users (`server/src/users/`)
- In-memory user storage (POC only)
- User CRUD operations
- Find by email/ID methods

#### FHIR Integration (`server/src/fhir/`)
- Connection to HAPI FHIR server
- Patient resource queries
- Observation queries
- Practitioner queries
- Search functionality
- Metadata/capabilities endpoint

### Frontend (React)

#### Authentication Flow
- Login form with validation
- Registration form with password confirmation
- JWT token storage in localStorage
- Automatic token injection in API calls
- Protected routes with redirect

#### FHIR UI
- Dashboard with server info
- Patient list with pagination
- Patient search by name
- Patient detail view
- Observation display
- Responsive design

## API Endpoints

### Auth Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user (protected)

### FHIR Endpoints (All Protected)
- `GET /fhir/metadata` - FHIR server metadata
- `GET /fhir/patients` - List patients
- `GET /fhir/patients/search` - Search patients
- `GET /fhir/patients/:id` - Get patient details
- `GET /fhir/patients/:id/observations` - Get patient observations
- `GET /fhir/practitioners` - List practitioners

## Technology Stack

### Backend
- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Authentication**: Passport.js + JWT
- **HTTP Client**: Axios
- **Validation**: class-validator

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Routing**: React Router 6
- **HTTP Client**: Axios
- **State Management**: React Context

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Development**: Hot reload for both services

## Environment Variables

### Server (.env)
```
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d
FHIR_BASE_URL=https://hapi.fhir.org/baseR4
CORS_ORIGIN=http://localhost:5173
```

### Client (.env)
```
VITE_API_URL=/api
```

## npm Scripts

### Root (Monorepo)
- `npm run dev` - Start both client and server concurrently
- `npm run dev:server` - Start server only
- `npm run dev:client` - Start client only
- `npm run build` - Build both projects
- `npm run build:server` - Build server only
- `npm run build:client` - Build client only

### Server
- `npm run start:dev` - Start in development mode
- `npm run start:prod` - Start in production mode
- `npm run build` - Build TypeScript
- `npm run lint` - Run ESLint

### Client
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Docker Commands

```bash
# Build and start
docker-compose up --build

# Start (if already built)
docker-compose up

# Stop
docker-compose down

# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

## Security Considerations

### Current (POC)
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS configuration
- ✅ Input validation
- ⚠️ In-memory storage (not persistent)
- ⚠️ Simple JWT secret

### Production Ready
- 🔲 Database integration (PostgreSQL/MongoDB)
- 🔲 Strong JWT secret (use secrets manager)
- 🔲 Rate limiting
- 🔲 HTTPS/SSL
- 🔲 Refresh token mechanism
- 🔲 Password complexity requirements
- 🔲 Account lockout after failed attempts
- 🔲 FHIR server authentication (if private)
- 🔲 Audit logging
- 🔲 Input sanitization

## Next Steps for Production

1. **Database Integration**
   - Add TypeORM or Prisma
   - Create user table
   - Add migrations

2. **Enhanced Security**
   - Implement refresh tokens
   - Add rate limiting (express-rate-limit)
   - Use helmet.js for security headers
   - Add CSRF protection

3. **FHIR Features**
   - Add more resource types (Condition, Medication, etc.)
   - Implement FHIR write operations
   - Add FHIR validation
   - Cache FHIR responses

4. **UI Enhancements**
   - Add loading skeletons
   - Implement error boundaries
   - Add data visualization (charts)
   - Improve mobile responsiveness
   - Add unit tests

5. **DevOps**
   - Add CI/CD pipeline
   - Implement logging (Winston)
   - Add monitoring (Prometheus/Grafana)
   - Set up staging environment
   - Add E2E tests

## License

POC/Educational Project

