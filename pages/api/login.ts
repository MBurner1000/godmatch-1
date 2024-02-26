// Import necessary modules
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../src/app/db'; // Assuming you have a database connection pool set up
import { NextApiRequest, NextApiResponse } from 'next';

// Login endpoint handler
export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET;
  console.log('Email and password', email, password);

if (!jwtSecret) {
  throw new Error('JWT secret is not defined.');
}

  try {
    // Check if the provided email exists in the database
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // If user doesn't exist, return error
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    // If passwords don't match, return error
    if (password != user.rows[0].password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If credentials are valid, generate a JWT token
    const token = jwt.sign({ email: user.rows[0].email }, jwtSecret, { expiresIn: '1h' });

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}