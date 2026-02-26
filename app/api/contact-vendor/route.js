import nodemailer from "nodemailer";

/** Escape for use inside HTML to avoid breaking the email and prevent injection */
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
    const { vendorEmail, name, email, message, dealerName } = body || {};

    if (!vendorEmail || typeof vendorEmail !== "string" || !vendorEmail.trim()) {
      return new Response(
        JSON.stringify({ error: "Vendor email is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!name || typeof name !== "string" || !name.trim()) {
      return new Response(
        JSON.stringify({ error: "Your name is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      return new Response(
        JSON.stringify({ error: "Your email is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

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

    const subject = dealerName
      ? `Message from dealer page: ${String(dealerName).trim()}`
      : "Message from dealer page";

    const mailOptions = {
      from: '"Dealer Contact Form" <info@bestcarrentaldubai.ae>',
      to: vendorEmail.trim(),
      replyTo: email.trim(),
      cc: "bilal.cressoft@gmail.com",
      subject,
      html: `
        <h2>New message from dealer contact form</h2>
        <p><strong>From:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message || "(No message)")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Message sent successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Dealer contact email failed:", error);
    const message = error?.message || "Failed to send message.";
    return new Response(
      JSON.stringify({ error: "Failed to send message.", details: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

