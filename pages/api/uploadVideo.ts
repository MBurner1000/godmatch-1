import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

const ensureUploadDirExists = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Use the original filename instead of adding a unique suffix
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB (in bytes)
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      ensureUploadDirExists();

      upload.single('video')(req as any, res as any, (err: any) => {
        if (err) {
          console.error('Error uploading video:', err);
          res.status(500).json({ error: 'Error uploading video' });
          return;
        }

        const fileName = (req as any).file?.filename;

        if (!fileName) {
          res.status(400).json({ error: 'Invalid file upload' });
          return;
        }

        res.status(200).json({ path: `/uploads/${fileName}` });
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ error: 'Error uploading video' });
    }
  } else {
    res.status(405).end();
  }
}
