# House Hunt


- **MongoDB** – NoSQL database
- **Express.js** – Web framework for Node.js
- **React.js** – Frontend UI library
- **Node.js** – Backend runtime

---

## 📁 Project Structure

```
househunt/
│
├── backend/       # Express server
│   ├── Controllers/
│   ├── Routes/
│   ├── Schemas/
│   ├── index.js
│   ├── .env
│   └── package.json
│
├── frontend/      # React app (created using Create React App)
│   ├── src/
│   ├── public/
│   └── package.json
│
└── .gitignore     # Ignoring node_modules, .env, etc.
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/househunt.git
cd househunt
```

### 2. Setup the Backend
```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`  
The backend (API) runs on `http://localhost:5000`

---

##  What Each Folder Does

- **Controllers/** – Contains logic for route functions
- **Routes/** – Contains route definitions for the API
- **Schemas/** – MongoDB models using Mongoose
- **frontend/src/** – React components, pages, and styling

