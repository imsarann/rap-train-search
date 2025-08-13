# Train Search Application

A MERN stack web application to search trains between two stations, view schedules, and sort by price. The application calculates ticket prices based on distance (Price = Distance × Rs 1.25).


## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone Repository
```bash
git clone <repository-url>
cd train-search-application
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

Edit `.env` with your MongoDB connection string:
```env
MONGO_URI=mongodb://localhost:27017/train_search
PORT=5000
```

### 3. Seed Database
```bash
npm run seed
```

This will generate 1000 fake trains with random data and insert them into MongoDB.

### 4. Start Backend Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will be running on `http://localhost:5000`

### 5. Frontend Setup
```bash
cd ../frontend
npm install
```

### 6. Start Frontend Application
```bash
npm start
```

The frontend will be running on `http://localhost:3000`


**Happy Train Searching! 🚂✨**
