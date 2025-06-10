const pool = require('../db');

// Regex do walidacji
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(?:\+\d{1,3})?[- ]?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{3}$/;

async function registerTeam(body, file) {
    const client = await pool.connect();

    try {
        const { teamName, gameId, leaderName, leaderEmail, leaderPhone, members } = body;
        const teamPhoto = file;

        const membersArray = Array.isArray(members)
            ? members
            : members.split(',').map(m => m.trim());

        // Input validation
        if (!teamName || typeof teamName !== 'string' || teamName.trim().length < 3) {
            throw new Error('Nazwa drużyny musi mieć co najmniej 3 znaki');
        }

        if (!gameId || isNaN(Number(gameId))) {
            throw new Error('Niepoprawny identyfikator gry');
        }

        if (!leaderName || typeof leaderName !== 'string' || leaderName.trim().length < 2) {
            throw new Error('Imię i nazwisko kapitana musi mieć co najmniej 2 znaki');
        }

        if (!leaderEmail || !emailRegex.test(leaderEmail)) {
            throw new Error('Podaj poprawny adres email kapitana');
        }

        if (!leaderPhone || !phoneRegex.test(leaderPhone)) {
            throw new Error('Podaj poprawny numer telefonu kapitana (format: XXX XXX XXX)');
        }

        if (!membersArray || membersArray.length === 0) {
            throw new Error('Lista członków drużyny jest niepoprawna');
        }

        // Check game and required players
        const gameResult = await client.query('SELECT players_per_team FROM games WHERE id = $1', [gameId]);
        if (gameResult.rows.length === 0) {
            throw new Error('Nieznana gra');
        }

        const requiredPlayers = gameResult.rows[0].players_per_team;

        if (membersArray.length !== requiredPlayers) {
            throw new Error(`Niepoprawna liczba członków drużyny. W tej grze wymagana jest liczba ${requiredPlayers}.`);
        }

        await client.query('BEGIN');

        // Check uniqueness of team name
        const existingTeam = await client.query(
            'SELECT id FROM teams WHERE name = $1',
            [teamName.trim()]
        );

        if (existingTeam.rows.length > 0) {
            throw new Error('Drużyna o takiej nazwie już istnieje');
        }

        // Check if leader already exist in specific game
        const existingLeaderInGame = await client.query(
            `SELECT l.id
             FROM leaders l
                      JOIN teams t ON l.id = t.leader_id
             WHERE l.email = $1
               AND t.game_id = $2`,
            [leaderEmail.trim(), gameId]
        );

        if (existingLeaderInGame.rows.length > 0) {
            throw new Error('Kapitan o podanym adresie email jest już zarejestrowany w tym turnieju');
        }

        // Dodanie kapitana
        const leaderResult = await client.query(
            `INSERT INTO leaders (name, email, phone)
             VALUES ($1, $2, $3) RETURNING id`,
            [leaderName.trim(), leaderEmail.trim(), leaderPhone.trim()]
        );
        const leaderId = leaderResult.rows[0].id;

        // Add team
        const teamResult = await client.query(
            `INSERT INTO teams (name, game_id, leader_id, photo_path)
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [
                teamName.trim(),
                gameId,
                leaderId,
                teamPhoto ? `/uploads/teams/${teamPhoto.filename}` : `/uploads/teams/default.png`
            ]
        );
        const teamId = teamResult.rows[0].id;

        // Adding team members
        for (const memberName of membersArray) {
            await client.query(
                `INSERT INTO team_members (team_id, member_name)
                 VALUES ($1, $2)`,
                [teamId, memberName.trim()]
            );
        }

        await client.query('COMMIT');

        return {
            success: true,
            message: 'Drużyna została zarejestrowana pomyślnie',
            teamId: teamId,
            photoPath: teamPhoto ? `/uploads/teams/${teamPhoto.filename}` : null
        };

    } catch (error) {
        await client.query('ROLLBACK');

        // Delete file if needed
        if (file) {
            const fs = require('fs');
            const filePath = file.path;
            fs.unlink(filePath, (err) => {
                if (err) console.error('Błąd podczas usuwania pliku:', err);
            });
        }

        throw new Error(error.message); // throw so caller can handle it
    } finally {
        client.release();
    }
}

module.exports = {
    registerTeam
};