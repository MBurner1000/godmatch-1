import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const userId = req.headers['user_id'];

            // Check if user_id is provided
            if (!userId || Array.isArray(userId)) {
                return res.status(400).json({ error: 'Invalid user_id' });
            }

            // Query to get other_user_ids from the angels table
            const query = `
                SELECT other_user_id
                FROM angels
                WHERE user_id = $1;
            `;

            const result = await pool.query(query, [userId]);
            const otherUserIds = result.rows.map((row: any) => row.other_user_id);

            // Query to get user information of angels from the users table
            const getUsersQuery = `
                SELECT user_id, firstname, lastname
                FROM users
                WHERE user_id = ANY($1);
            `;

            const usersResult = await pool.query(getUsersQuery, [otherUserIds]);

            res.status(200).json(usersResult.rows);
        } catch (error) {
            console.error('Error retrieving angels information:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
