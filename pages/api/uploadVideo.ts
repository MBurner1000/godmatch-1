import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { IncomingMessage, ServerResponse } from 'http';

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
    cb(null, `${file.originalname}-${uniqueSuffix}`);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  if (req.method === 'POST') {
    try {
      ensureUploadDirExists();

      upload.single('video')(req as any, res as any, (err: any) => {
        if (err) {
          return res.statusCode = 400;
        }

        const fileName = (req as any).file?.filename;

        if (!fileName) {
          return res.statusCode = 400;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ path: `/uploads/${fileName}` }));
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      res.statusCode = 500;
    }
  } else {
    res.statusCode = 405;
  }
}