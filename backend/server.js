const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {registerTeam} = require('./services/teamService');
const {uploadTeamPhoto} = require('./upload');
const {saveContactForm} = require('./services/contactService');
const {getAllTeams} = require('./services/getAllTeams');

// Port setting: Hosting || default local
const port = process.env.PORT || 5000;

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

// Endpoint to register a team
app.post('/api/register', uploadTeamPhoto, async (req, res) => {
    // if (req.file) {
    //     console.log('Plik zapisany lokalnie pod ścieżką:', req.file.path); // pełna ścieżka do pliku
    //     console.log('Nazwa pliku:', req.file.filename); // tylko nazwa pliku
    // } else {
    //     console.log('Brak pliku do zapisu.');
    // }

    try {
        const result = await registerTeam(req.body, req.file);
        res.status(201).json(result);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: error.message
        });
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

// Endpoint to get all teams
app.get('/api/teams', async (req, res) => {
    try {
        const teams = await getAllTeams();
        return res.status(200).json(teams);
    } catch (error) {
        // console.error('Błąd podczas pobierania drużyn:', error);
        return res.status(500).json({error: 'Nie udało się pobrać drużyn'});
    }
});

// SPA routing
app.get('/*splat', (_req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})