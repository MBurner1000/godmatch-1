import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract user ID from request headers or query parameters
    const userId = req.headers['user_id'];
    console.log('User ID:', userId);

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Query to fetch user's media
    const query = `
      SELECT media_id, media_url, media_type, user_id
      FROM media
      WHERE user_id = $1;
    `;
    const result = await pool.query(query, [userId]);

    // Respond with the retrieved media data
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching user media:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
