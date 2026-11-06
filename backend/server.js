const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db'); 
const app = express();

//Middleware
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// TestRoutes
app.get('/', (req, res) => {
    res.send('mern crud app backend is running');
});

// Student Routes
app.use('/api/students', require('./routes/studentRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});