import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

const ensureUploadDirExists = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

export const config = {
  api: {
    bodyParser: false, // Disable automatic parsing of request body
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      ensureUploadDirExists();

      // Extract file extension from content type
      const contentType = req.headers['content-type'] || '';
      const extension = contentType.split('/')[1];
      if (!extension) {
        throw new Error('Invalid content type');
      }

      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
      const filePath = path.join(uploadDir, fileName);

      const fileStream = fs.createWriteStream(filePath);

      // Write the binary data directly from the request body to the file
      req.pipe(fileStream);

      fileStream.on('error', (err) => {
        console.error('Error writing file:', err);
        res.status(500).end();
      });

      fileStream.on('finish', () => {
        res.status(200).json({ path: `/uploads/${fileName}` });
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
}
