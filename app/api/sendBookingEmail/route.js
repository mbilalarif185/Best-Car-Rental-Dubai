import nodemailer from "nodemailer";

function escapeHtml(text) {
  if (text == null) return "";
  const s = String(text);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      contact,
      pickupDate,
      dropoffDate,
      pickupLocation,
      dropoffLocation,
      vendorEmail,
      carTitle,
    } = body || {};

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

    const toAddress =
      vendorEmail && typeof vendorEmail === "string" && vendorEmail.trim()
        ? vendorEmail.trim()
        : "lcruae6@gmail.com";

    const subject = carTitle
      ? `Booking Request from ${String(carTitle).trim()} Page`
      : "New Booking Received";

    const mailOptions = {
      from: '"Booking Request" <info@bestcarrentaldubai.ae>',
      to: toAddress,
      cc: "bilal.cressoft@gmail.com",
      replyTo: email && typeof email === "string" ? email.trim() : undefined,
      subject,
      html: `
        <h2>Booking Information</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
        <p><strong>Pick-Up Date:</strong> ${escapeHtml(pickupDate)}</p>
        <p><strong>Drop-Off Date:</strong> ${escapeHtml(dropoffDate)}</p>
        <p><strong>Pick-Up Location:</strong> ${escapeHtml(pickupLocation)}</p>
        <p><strong>Drop-Off Location:</strong> ${escapeHtml(dropoffLocation)}</p>
        ${carTitle ? `<p><strong>Car:</strong> ${escapeHtml(carTitle)}</p>` : ""}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
