import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { userId } = req.body;

            const values = [userId];

            const query = `DELETE FROM angels WHERE user_id = $1`;
            
            await pool.query(query, values);

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error Deleting user information:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
