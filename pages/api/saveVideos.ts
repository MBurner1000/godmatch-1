import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { videoUrls, videoTypes, userId } = req.body;
      // Validate the input parameters (user_id, videoUrls, videoTypes)
      if (!userId || !videoUrls || !videoTypes) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      // Assuming videoUrls and videoTypes are arrays of strings
      // Insert data into the media table for each video
      for (let i = 0; i < videoUrls.length; i++) {
        const result = await pool.query(
          'INSERT INTO media (user_id, media_type, media_url) VALUES ($1, $2, $3) RETURNING *',
          [userId, videoTypes[i], videoUrls[i]]
        );
        // Optionally, handle the result if needed
        console.log('Video saved:', result.rows[0]);
      }

      // Respond with success
      res.status(200).json({ success: true, message: 'Videos saved successfully' });
    } catch (error) {
      console.error('Error saving videos:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
