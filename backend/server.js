const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

// Port setting: Hosting || default local
const port = process.env.PORT || 5000;

// Middleware for JSON parsing
app.use(express.json());

// Setting CORS: for development only
app.use(cors({
    origin: 'http://localhost:5173', // Only Vite dev server
    methods: ['GET', 'POST']
}));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routers import:TODO

// Serve frontend (Single Page Application)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/index.html'));
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})