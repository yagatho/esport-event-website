const pool = require("../db");

async function getAllTeams() {
    const client = await pool.connect();

    try {
        const result = await client.query('SELECT * FROM teams');
        return result.rows;
    } catch (error) {
        throw new Error('Nie udało się pobrać drużyn');
    } finally {
        client.release();
    }
}

module.exports = { getAllTeams };