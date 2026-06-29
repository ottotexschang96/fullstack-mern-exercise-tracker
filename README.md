# MERN Exercise Tracker

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application that allows users to create, view, update, and delete exercise records. The application uses a RESTful API for communication between the React frontend and the Express backend, with MongoDB providing persistent data storage.

## Features

- View all exercise records
- Create a new exercise
- Edit an existing exercise
- Delete an exercise
- RESTful API with full CRUD operations
- MongoDB database integration
- Single Page Application (SPA) built with React
- React Router navigation
- Responsive and clean user interface

## Tech Stack

### Frontend
- React
- React Router DOM
- Fetch API
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```
mern-exercise-tracker/
│
├── backend/
│   ├── exercises_controller.mjs
│   ├── exercises_model.mjs
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
└── README.md
```

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/exercises` | Retrieve all exercises |
| GET | `/exercises/:id` | Retrieve a specific exercise |
| POST | `/exercises` | Create a new exercise |
| PUT | `/exercises/:id` | Update an exercise |
| DELETE | `/exercises/:id` | Delete an exercise |

## Data Model

Each exercise contains the following fields:

| Field | Type |
|------|------|
| name | String |
| reps | Number |
| weight | Number |
| unit | String (`kgs` or `lbs`) |
| date | String (`MM-DD-YY`) |

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mern-exercise-tracker.git
cd mern-exercise-tracker
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```text
PORT=3000
MONGODB_CONNECT_STRING=your_mongodb_connection_string
```

### 4. Start Backend

```bash
npm start
```

Backend runs on:

```
http://localhost:3000
```

### 5. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 6. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

## Application Workflow

```
Browser
      │
      ▼
React Frontend
      │
      ▼
Fetch API
      │
      ▼
Express REST API
      │
      ▼
MongoDB (Mongoose)
      │
      ▼
JSON Response
      │
      ▼
React UI Update
```

## Learning Objectives

This project demonstrates:

- Full-stack MERN development
- REST API design
- CRUD operations
- React state management
- React Router navigation
- Express middleware
- MongoDB integration with Mongoose
- Asynchronous programming using async/await
- Client-server architecture

## Future Improvements

- User authentication
- Search and filtering
- Pagination
- Form validation
- Exercise categories
- Data visualization
- Deployment on Render or Railway

## Author

**Otto Chang**
