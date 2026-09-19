import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
export default function ContactForm({ terminal = false }) {
  const [prepared, setPrepared] = useState(false);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Let's connect — ${data.get("name")}`);
    const body = encodeURIComponent(
      `${data.get("message")}\n\nFrom: ${data.get("name")}\nReply to: ${data.get("email")}`,
    );
    window.location.href = `mailto:arm393@cornell.edu?subject=${subject}&body=${body}`;
    setPrepared(true);
  }
  return (
    <form
      className={`contact-form ${terminal ? "terminal-form" : ""}`}
      onSubmit={submit}
    >
      {terminal && (
        <div className="terminal-heading">
          <span className="status-dot" /> connection.open / adam_moffat
        </div>
      )}
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@company.com"
            required
            maxLength={200}
          />
        </label>
      </div>
      <label>
        What are you working on?
        <textarea
          name="message"
          rows={3}
          placeholder="A role, a challenge, or an idea. I’m listening."
          required
          maxLength={3000}
        />
      </label>
      <button className="primary-button" type="submit">
        Prepare email <ArrowUpRight size={17} />
      </button>
      <p className="form-note" role="status">
        {prepared
          ? "Your email draft is ready in your email app. Review it and press send there."
          : "Opens your email app with a draft. Or email arm393@cornell.edu directly."}
      </p>
    </form>
  );
}
