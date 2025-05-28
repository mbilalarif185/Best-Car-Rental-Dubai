import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
     
    const body = await req.json();
    console.log('Request body:', body); 
    const {
      name,
      email,
      contact,
      pickupDate,
      dropoffDate,
      pickupLocation,
      dropoffLocation,
    } = body;

   
        const transporter = nodemailer.createTransport({
        host: 'bestcarrentaldubai.ae',
        port: 465,
        secure: true, // true for port 465
        auth: {
            user: 'info@bestcarrentaldubai.ae',
            pass: 'legendary@786',
        },
        tls: {
            rejectUnauthorized: false, 
        },
        });

    const mailOptions = {
      from: '"Booking Request" <info@bestcarrentaldubai.ae>',
      to: 'lcruae6@gmail.com', 
      subject: 'New Booking Received',
      html: `
        <h2>Booking Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Pick-Up Date:</strong> ${pickupDate}</p>
        <p><strong>Drop-Off Date:</strong> ${dropoffDate}</p>
        <p><strong>Pick-Up Location:</strong> ${pickupLocation}</p>
        <p><strong>Drop-Off Location:</strong> ${dropoffLocation}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
       headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    });
  }
}
