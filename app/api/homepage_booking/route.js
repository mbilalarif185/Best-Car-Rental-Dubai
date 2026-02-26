import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      pickupDate,
      dropoffDate,
      pickupLocation,
      carModel
    } = body;

    // Create transporter (use .env on VPS)
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

    
    const mailOptions = {
      from: '"Homepage Booking" <info@bestcarrentaldubai.ae>',
      to: 'lcruae6@gmail.com',
      subject: 'New Car Booking Request (Homepage)',
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pickup Date:</strong> ${pickupDate}</p>
        <p><strong>Drop-off Date:</strong> ${dropoffDate}</p>
        <p><strong>Pickup Location:</strong> ${pickupLocation}</p>
        <p><strong>Car Model:</strong> ${carModel}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Booking email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Email sending failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to send booking email' }), {
      status: 500,
    });
  }
}
