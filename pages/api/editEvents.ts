import { NextApiRequest, NextApiResponse } from 'next';
import pool  from '../../src/app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, description, location, date } = req.body;

  try {
    // Insert user data into the users table
    const result = await pool.query(
      'INSERT INTO events (name, description, date, location) VALUES ($1, $2, $3, $4)',
      [name, description, date, location]
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
