import { NextRequest, NextResponse } from 'next/server';
// instead of: import nodemailer from 'nodemailer'
const nodemailer = require('nodemailer');


export async function POST(request: NextRequest) {
  const formData = await request.json();

  const transporter = nodemailer.createTransport({
    ost: 'bestcarrentaldubai.ae',
  port: 465, 
  secure: true, 
  auth: {
    user: 'info@bestcarrentaldubai.ae',
    pass: 'Carrental@786',
  },
  });

  try {
    await transporter.sendMail({
      from: `"Booking Form" <info@bestcarrentaldubai.ae>`,
      to: 'your-email@domain.com',
      subject: 'New Booking Request',
      html: `
        <h3>New Booking</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Contact:</strong> ${formData.contact}</p>
        <p><strong>Pickup Date:</strong> ${formData.pickupDate}</p>
        <p><strong>Dropoff Date:</strong> ${formData.dropoffDate}</p>
        <p><strong>Pickup Location:</strong> ${formData.pickupLocation}</p>
        <p><strong>Dropoff Location:</strong> ${formData.dropoffLocation}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
