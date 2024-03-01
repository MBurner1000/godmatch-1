import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const userId = req.headers['user_id'];

            console.log('Backend User Id', userId);

            // Check if user_id is provided
            if (!userId || Array.isArray(userId)) {
                return res.status(400).json({ error: 'Invalid user_id' });
            }

            // Query to get user information based on user_id
            const query = `
                SELECT u.firstname, u.lastname, u.email, u.password, ui.location, ui.gender, ui.birthday, ui.age, ui.bio
                FROM users u
                LEFT JOIN user_info ui ON u.user_id = ui.user_id
                WHERE u.user_id = $1;
            `;

            console.log('SQL Query:', query);

            const result = await pool.query(query, [userId]);

            console.log('Query Result:', result.rows);

            // Check if user exists
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Respond with the retrieved data
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error retrieving profile information:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
