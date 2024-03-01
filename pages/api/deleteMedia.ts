import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            const { user_id, media_id } = req.headers;

            const values = [media_id, user_id];

            console.log('Received form data:', values);

            const query = `DELETE FROM media WHERE media_id = $1 AND user_id = $2`;
            
            await pool.query(query, values);

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error Deleting media:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
