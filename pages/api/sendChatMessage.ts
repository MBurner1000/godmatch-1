import { NextApiRequest, NextApiResponse } from 'next';
import pool  from '../../src/app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { recipient_id, sender_id, message_content } = req.body;

  //get current time and format
  const sent_at = new Date();

  try {
    // Insert user data into the users table
    const result = await pool.query(
      'INSERT INTO messages (message, sent_at, user_id, recipient_id) VALUES ($1, $2, $3, $4) RETURNING user_id',
      [message_content, sent_at, sender_id, recipient_id]
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
