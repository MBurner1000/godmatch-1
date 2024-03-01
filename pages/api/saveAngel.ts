import { NextApiRequest, NextApiResponse } from 'next';
import pool  from '../../src/app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId, user_id } = req.body;

  try {
    // Insert user data into the users table
    const result = await pool.query(
      'INSERT INTO angels (user_id, other_user_id) VALUES ($1, $2)',
      [userId, user_id]
    );

    console.log("Angel saved:", result.rows[0]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving Angel:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
