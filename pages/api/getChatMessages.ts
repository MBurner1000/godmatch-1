import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Assuming you have a database connection pool

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { other_user_id, recipient_id } = req.headers;

            // Validate other_user_id and recipient_id
            if (!other_user_id || !recipient_id) {
                return res.status(400).json({ error: 'Invalid request' });
            }

            // Query to fetch chat messages between two users
            const query = `
            SELECT 
            m.message, 
            m.sent_at, 
            u.firstname, 
            u.lastname, 
            md.media_url
        FROM 
            messages m
        INNER JOIN 
            users u ON m.user_id = u.user_id
        LEFT JOIN 
            (
                SELECT 
                    user_id, 
                    MIN(media_url) AS media_url
                FROM 
                    media
                WHERE 
                    user_id = $1  -- Filter media_url for the specific user_id
                GROUP BY 
                    user_id
            ) md ON (md.user_id = m.user_id OR md.user_id = m.recipient_id)
        WHERE 
            (m.user_id = $1 AND m.recipient_id = $2) OR (m.user_id = $2 AND m.recipient_id = $1)
        ORDER BY 
            m.sent_at ASC;
        
            `;
            const result = await pool.query(query, [other_user_id, recipient_id]);

            // Respond with the retrieved data
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching chat messages:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
