const pool = require('./db');

// Regex do walidacji
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(?:\+\d{1,3})?[- ]?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{3}$/;

async function registerTeam({teamName, gameId, leaderName, leaderEmail, leaderPhone, members}) {
    const client = await pool.connect();

    try {
        // Walidacja danych wejściowych
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

        if (!Array.isArray(members)) {
            throw new Error('Lista członków drużyny jest niepoprawna');
        }

        for (const member of members) {
            if (!member || typeof member !== 'string' || member.trim().length < 2) {
                throw new Error('Imię i nazwisko każdego członka drużyny musi mieć co najmniej 2 znaki');
            }
        }

        // Check if the game exists and get the required number of players
        const gameResult = await client.query('SELECT players_per_team FROM games WHERE id = $1', [gameId]);
        if (gameResult.rows.length === 0) {
            throw new Error('Nieznana gra');
        }

        const requiredPlayers = gameResult.rows[0].players_per_team;

        if (members.length !== requiredPlayers) {
            throw new Error(`Niepoprawna liczba członków drużyny. W tej grze wymagana jest liczba ${requiredPlayers}.`);
        }

        await client.query('BEGIN');

        // Check team name uniqueness
        const existingTeam = await client.query(
            'SELECT id FROM teams WHERE name = $1',
            [teamName.trim()]
        );

        if (existingTeam.rows.length > 0) {
            throw new Error('Drużyna o takiej nazwie już istnieje');
        }

        // Check if leader email already exists in the same game
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

        // Add leader
        const leaderResult = await client.query(
            `INSERT INTO leaders (name, email, phone)
             VALUES ($1, $2, $3) RETURNING id`,
            [leaderName.trim(), leaderEmail.trim(), leaderPhone.trim()]
        );
        const leaderId = leaderResult.rows[0].id;

        // Add team
        const teamResult = await client.query(
            `INSERT INTO teams (name, game_id, leader_id)
             VALUES ($1, $2, $3) RETURNING id`,
            [teamName.trim(), gameId, leaderId]
        );
        const teamId = teamResult.rows[0].id;

        // Add team members
        for (const memberName of members) {
            await client.query(
                `INSERT INTO team_members (team_id, member_name)
                 VALUES ($1, $2)`,
                [teamId, memberName.trim()]
            );
        }

        await client.query('COMMIT');

        return teamId;

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;

    } finally {
        client.release();
    }
}

module.exports = {registerTeam};