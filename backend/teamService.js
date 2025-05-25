const pool = require('./db');

async function registerTeam({teamName, gameId, leaderName, leaderEmail, leaderPhone, members}) {
    const client = await pool.connect();

    try {
        // Check if the game exists and get the required number of players
        const gameResult = await client.query('SELECT players_per_team FROM games WHERE id = $1', [gameId]);
        if (gameResult.rows.length === 0) {
            throw new Error('Nieznana gra');
        }

        const requiredPlayers = gameResult.rows[0].players_per_team;

        if (!Array.isArray(members) || members.length !== requiredPlayers) {
            throw new Error(`Niepoprawna liczba członków drużyny. W tej grze wymagana jest liczba ${requiredPlayers}.`);
        }

        await client.query('BEGIN');

        // Check team name uniqueness
        const existingTeam = await client.query(
            'SELECT id FROM teams WHERE name = $1',
            [teamName]
        );

        if (existingTeam.rows.length > 0) {
            throw new Error('Drużyna o takiej nazwie już istnieje');
        }

        // Add leader
        const leaderResult = await client.query(
            `INSERT INTO leaders (name, email, phone)
             VALUES ($1, $2, $3) RETURNING id`,
            [leaderName, leaderEmail, leaderPhone]
        );
        const leaderId = leaderResult.rows[0].id;

        // Add team
        const teamResult = await client.query(
            `INSERT INTO teams (name, game_id, leader_id)
             VALUES ($1, $2, $3) RETURNING id`,
            [teamName, gameId, leaderId]
        );
        const teamId = teamResult.rows[0].id;

        // Add team members
        for (const memberName of members) {
            await client.query(
                `INSERT INTO team_members (team_id, member_name)
                 VALUES ($1, $2)`,
                [teamId, memberName]
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