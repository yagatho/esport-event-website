const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {registerTeam} = require('./teamService');
const {saveContactForm} = require('./contactService');

// Port setting: Hosting || default local
const port = process.env.PORT || 5000;

// Middleware for JSON parsing
app.use(express.json());

// Setting CORS: for development only
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// logging middleware
app.use((req, res, next) => {
    console.log('Żądanie:', req.method, req.url);
    next();
});

// SPA routing
app.get('/*splat', (_req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Endpoint to register a team
app.post('/api/register', async (req, res) => {
    try {
        const teamId = await registerTeam(req.body);
        res.status(201).json({message: 'Drużyna zarejestrowana', teamId});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Endpoint to handle contact form submissions
app.post('/api/contact', async (req, res) => {
    try {
        const contactId = await saveContactForm(req.body);
        res.status(200).json({message: 'Formularz kontaktowy został wysłany', contactId});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})