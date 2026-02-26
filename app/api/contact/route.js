import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      agree
    } = body;

    if (!agree) {
      return new Response(JSON.stringify({ error: 'You must agree to the terms.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Configure SMTP transporter (use .env on VPS)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "bestcarrentaldubai.ae",
      port: parseInt(process.env.SMTP_PORT || "465", 10),
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER || "info@bestcarrentaldubai.ae",
        pass: process.env.SMTP_PASS || "",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Compose email
    const mailOptions = {
      from: '"Contact Form" <info@bestcarrentaldubai.ae>',
      to: 'lcruae6@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Agreed to Terms:</strong> ${agree ? 'Yes' : 'No'}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Contact email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Email sending failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to send contact email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
