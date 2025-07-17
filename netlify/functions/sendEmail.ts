// netlify/functions/sendEmail.ts
import { Handler } from '@netlify/functions'
import nodemailer from 'nodemailer'

const headers = {
  'Access-Control-Allow-Origin': '*', // Or specify your domain instead of '*'
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}



const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: 'OK',
    }
  }

  try {
    const { to, subject, text, html } = JSON.parse(event.body || '{}')

    if (!to || !subject || (!text && !html)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing fields' }),
      }
    }

    const transporter = nodemailer.createTransport({
      host: 'mail.earthlinkgroup.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: "support@earthlinkgroup.com",
        pass: "39pJJ5L7K3k2zX8",
      },
    })

    await transporter.sendMail({
      from: 'Earthlink Contact Form <support@earthlinkgroup.com>',
      to,
      subject,
      text,
      html,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    }
  } catch (error) {
    console.error('Email error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' }),
    }
  }
}

export { handler }