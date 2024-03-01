import { NextApiRequest, NextApiResponse } from 'next';
import pool  from '../../src/app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    // Insert user data into the users table
    const result = await pool.query(
      'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id',
      [firstName, lastName, email, password]
    );

    const userId = result.rows[0].user_id;

    return res.status(200).json({ success: true, userId });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
