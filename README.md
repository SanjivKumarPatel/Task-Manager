# Task Manager Project

This is a full-stack Task Manager application with a Node.js/Express backend and a React (Vite) frontend.

## Project Structure

- **backend/**: Node.js/Express server for API endpoints and business logic.
- **frontend/**: React app built with Vite for the user interface.
- **profile/**: (Reserved for future use or user profiles.)

## Setup Instructions

### 1. Install Dependencies

Open two terminals:

- **Backend**
  ```sh
  cd backend
  npm install
  ```
- **Frontend**
  ```sh
  cd frontend
  npm install
  ```

### 2. Run Development Servers

- **Backend**
  ```sh
  npm start
  ```
- **Frontend**
  ```sh
  npm run dev
  ```

### 3. Development Workflow

- Implement backend API endpoints in `backend/index.js` (CRUD for tasks).
- Build React components in `frontend/src/` to interact with the backend.
- Connect frontend to backend using fetch/axios for API calls.
- Ensure CORS is configured in the backend for local development.

### 4. Optional Enhancements

- Add a database (e.g., MongoDB, SQLite) for persistent storage.
- Implement authentication and user management.
- Improve error handling and validation.

## Notes

- If you close and reopen this project, refer to this README for setup and usage.
- For any changes or troubleshooting, you can ask GitHub Copilot for help.

---

**Author:** GitHub Copilot
**Model:** GPT-4.1
