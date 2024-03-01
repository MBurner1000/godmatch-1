import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../src/app/db'; // Update the path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const { imageUrls, imageTypes, userId } = req.body;
        // Validate the input parameters (user_id, imageUrls, imageTypes)
        if (!userId || !imageUrls || !imageTypes) {
          return res.status(400).json({ error: 'Missing required parameters' });
        }
  
        // Assuming imageUrls and imageTypes are arrays of strings
        // Insert data into the media table for each image
        for (let i = 0; i < imageUrls.length; i++) {
          const result = await pool.query(
            'INSERT INTO media (user_id, media_type, media_url) VALUES ($1, $2, $3) RETURNING *',
            [userId, imageTypes[i], imageUrls[i]]
          );
          // Optionally, handle the result if needed
          console.log('Image saved:', result.rows[0]);
        }
  
        // Respond with success
        res.status(200).json({ success: true, message: 'Images saved successfully' });
      } catch (error) {
        console.error('Error saving images:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  