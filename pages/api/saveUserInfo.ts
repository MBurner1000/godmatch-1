import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { formData, userId } = req.body;

            // Example: Update or insert user information into the database
            const query = `
                INSERT INTO user_info (user_id, birthday, gender, location, age, bio)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (user_id)
                DO UPDATE SET
                birthday = $2,
                gender = $3,
                location = $4,
                age = $5,
                bio = $6;
            `;
            
            const values = [userId, formData.birthday, formData.gender, formData.location, formData.age, formData.bio];
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
