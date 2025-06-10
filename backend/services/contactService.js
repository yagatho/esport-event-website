const pool = require('../db');

// Email regex for server-side validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function saveContactForm({ name, email, subject, message}) {
    const client = await pool.connect();

    try {
        // Server-side validation
        if (!name || !name.trim()) {
            throw new Error('Imię i nazwisko jest wymagane');
        }
        if (!email || !email.trim() || !emailRegex.test(email)) {
            throw new Error('Podaj poprawny adres email');
        }
        if (!subject || !subject.trim()) {
            throw new Error('Temat jest wymagany');
        }
        if (!message || !message.trim()) {
            throw new Error('Treść wiadomości jest wymagana');
        }

        await client.query('BEGIN');

        // Insert form data into contact_submissions table
        const result = await client.query(
            `INSERT INTO contact (name, email, subject, message)
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [name.trim(), email.trim(), subject.trim(), message.trim()]
        );

        const submissionId = result.rows[0].id;

        await client.query('COMMIT');

        return submissionId;

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;

    } finally {
        client.release();
    }
}

module.exports = {saveContactForm};