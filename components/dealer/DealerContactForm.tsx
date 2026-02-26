"use client";

import { useState } from "react";

type Props = {
  vendorEmail: string | null;
  vendorName?: string;
};

export default function DealerContactForm({ vendorEmail, vendorName }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorEmail?.trim()) {
      setStatus("error");
      setErrorMessage("This dealer has no contact email.");
      return;
    }
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact-vendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendorEmail: vendorEmail.trim(),
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          dealerName: vendorName?.trim() || undefined,
        }),
      });
      let data: { message?: string; error?: string; details?: string } = {};
      try {
        data = await res.json();
      } catch {
        setStatus("error");
        setErrorMessage("Invalid response from server. Please try again.");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        const msg = data.error || "Failed to send message.";
        const details = data.details ? ` (${data.details})` : "";
        setErrorMessage(msg + details);
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  if (!vendorEmail?.trim()) {
    return (
      <p className="text-md-medium neutral-500">This dealer has not set a contact email. You can reach them via the phone or WhatsApp listed below.</p>
    );
  }

  return (
    <form className="form-contact" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <input
              className="form-control username"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <input
              className="form-control email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <textarea
              className="form-control message"
              rows={6}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-12">
          {status === "success" && (
            <p className="text-md-medium text-success mb-2">Message sent. The dealer will get back to you soon.</p>
          )}
          {status === "error" && errorMessage && (
            <p className="text-md-medium text-danger mb-2">{errorMessage}</p>
          )}
          <button
            className="btn btn-book"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send message"}
            <svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
