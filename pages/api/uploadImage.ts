import { put } from '@vercel/blob';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = req.url || ''; // Use an empty string if req.url is undefined
    const { searchParams } = new URL(url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return res.status(400).json({ error: 'Filename is missing in the query parameters' });
    }

    // Upload the file using Vercel Blob
    const blob = await put(filename, req.body, {
      access: 'public',
    });

    return res.status(200).json(blob);
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file' });
  }
}
