import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {

            // Query to get user information based on user_id
            const query = `
            SELECT * FROM events
            `;

            console.log('SQL Query:', query);

            const result = await pool.query(query);

            console.log('Query Result:', result.rows);

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
