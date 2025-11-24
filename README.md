## Clone the repository

```bash
git clone <repo-url>
cd pokemon-app
```

### Frontend

```bash
cd poke-app-frontend
npm install
```

### Backend

```bash
cd poke-app-backend
npm install
```

## .env Configuration

#### Backend (poke-app-backend/.env):

```bash
ACCESS_TOKEN_SECRET=access-secret-demo
REFRESH_TOKEN_SECRET=refresh-secret-demo
PORT=4000
FRONTEND_URL=http://localhost:5173
POKE_API_BASE=https://pokeapi.co/api/v2
```

#### Frontend (poke-app-frontend/.env):

```bash
VITE_API_BASE_URL=http://localhost:4000/api
```

## Running locally

#### Backend

```bash
cd poke-app-backend
npm run dev
```

The server will be available at: ` http://localhost:4000`

#### Frontend

```bash
cd poke-app-frontend
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## Registration and login (demo user is pre-defined):

```bash
Email: test@gmail.com
Password: test9876
```
