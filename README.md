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

# React Task

Create a React app from scratch that will fetch data from [pokeapi](https://pokeapi.co/).

React app setup is left to the developer to choose.

The `eslint-config-airbnb` rules should be used, along with their react rules.

## Main Functionality

1. **User login**

   Users should be able to login with predetermined/hardcoded credentials. If the user enters incorrect information, they should be notified.

2. **User logout**

   Users should be able to logout, and be redirected to the login page.

3. **Pokemon list page**

   After logging in, users should be able to see a list of pokemon. The list should be paginated, and the user should be able to navigate between pages.

   Show a pokemon sprite image for each list item.

4. **Pokemon search**

   There should be a search bar that will filter the pokemon list by name. The search and pagination should be persisted in the url.

5. **Pokemon details**

   When clicking on a pokemon, the user should be presented with a modal that shows the pokemon's details (including an illustration that can be found in the sprite property).

   The modal should be closed by clicking outside of it.

6. **Pokemon Extended details page**

   There should be a button in the Pokemon details modal that will show extended details about the pokemon. The extended details should be fetched from the API, and be displayed in a separate page.

7. **Page for listing locations**

   Add a page for displaying a table of locations, basic only, no functionality.

## Additional

The following are not required.
Having them is a plus, but you will be questioned about them regardless.

1. **Responsive design**

   The app should be responsive, and work on mobile devices.

2. **Caching**

   Entities fetched from the API should be cached in the browser, so that they don't have to be fetched again. Bonus points for persisting the cache between sessions.

   Preferably, the caching should be done without using a library.

3. **Token expiration**

   Handle both auth and refresh token expiration (if backend isn't implemented add buttons for simulating these events).

4. **Form validation**

   Add validation to the login form.

5. **Hovering over pokemon**

   When hovering over a pokemon's image, on the list page, the pokemon's back sprite should be showed, if it exists.

   There should be no "downtime" in loading the back sprite.

6. **Keyboard navigation**

   The should be able to navigate the application without using a mouse.

7. **Localization**

   The app should be available in multiple languages.

8. **Theming**

   The app should support dark and light themes.

9. **Backend API**

   Create a backend API that will handle the authentication, and fetching of the pokemon data.
