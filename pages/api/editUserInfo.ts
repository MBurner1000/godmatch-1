import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { formData, userId } = req.body;

            console.log('Received form data:', formData);

            // Example: Update or insert user information into the database
            const query = `
            UPDATE users SET firstname = $2, lastname = $3, email = $4 WHERE user_id = $1
            `;
            
            const values = [userId, formData.firstname, formData.lastname, formData.email];
            await pool.query(query, values);

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error saving user information:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
