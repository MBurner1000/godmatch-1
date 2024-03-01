import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Query to get the first image for each user along with their first and last name
            const query = `
                SELECT m.user_id, m.media_type, m.media_url, u.firstname, u.lastname
                FROM media m
                INNER JOIN (
                    SELECT user_id, MIN(media_id) AS first_media_id
                    FROM media
                    GROUP BY user_id
                ) AS sub
                ON m.user_id = sub.user_id AND m.media_id = sub.first_media_id
                INNER JOIN users u ON m.user_id = u.user_id;
            `;
            const result = await pool.query(query);

            // Respond with the retrieved data
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error retrieving first user images:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}