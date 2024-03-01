import { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '../../src/app/ui/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const formData = req.body;


    console.log('Received form data:', formData);

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'godmatch100@gmail.com',
      subject: 'New Contact Form Message',
      html: `<p>This is an Email to GodMatch from Contact Form. the name of the person is: ${formData.name} and the email is ${formData.email}. The message is: (${formData.message})</p>`
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
