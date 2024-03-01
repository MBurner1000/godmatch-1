import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { event_id } = req.body;

            const values = [event_id];

            const query = `DELETE FROM events WHERE event_id = $1`;
            
            await pool.query(query, values);

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error Deleting event information:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
