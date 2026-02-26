import styles from "./FAQSection.module.css";

const faqsLeft = [
  "How do I make a reservation on your website?",
  "What documents do I need for my trip, and how do I obtain them?",
  "Can I modify or cancel my reservation?",
  "Do you offer discounts for group bookings?",
];

const faqsRight = [
  "How do I search for cars on your website?",
  "Are there any additional fees I should know about?",
  "Is roadside assistance included with my booking?",
  "How do I contact customer support if I have a question or issue?",
];

export default function FAQSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <h2>Frequently asked questions</h2>
          <p>Any questions? We would be happy to help you.</p>
        </header>

        <div className={styles.grid}>
          <div>
            {faqsLeft.map((question) => (
              <details key={question} className={styles.item}>
                <summary>{question}</summary>
                <p>
                  Browse cars, select your dates and pickup location, choose
                  your preferred vehicle, and complete the secure checkout. Your
                  confirmation is sent instantly by email.
                </p>
              </details>
            ))}
          </div>
          <div>
            {faqsRight.map((question) => (
              <details key={question} className={styles.item}>
                <summary>{question}</summary>
                <p>
                  Check your booking details for specific terms. Our support
                  team is available if you need tailored assistance for your
                  trip.
                </p>
              </details>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.secondaryButton}>
            Contact us
          </button>
          <button type="button" className={styles.primaryButton}>
            Submit a ticket
          </button>
        </div>
      </div>
    </section>
  );
}
