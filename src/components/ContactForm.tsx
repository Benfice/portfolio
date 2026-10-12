"use client";

import { useEffect, useState, type FormEvent } from "react";

export type ContactFormProps = {
  labels: {
    name: string;
    email: string;
    subject: string;
    message: string;
    honeypot: string;
    submit: string;
    loading: string;
    success: string;
    error: string;
  };
  emailFallback: string;
};

export function ContactForm({ labels, emailFallback }: ContactFormProps) {
  const [honeypot, setHoneypot] = useState("");
  const [submittedAt, setSubmittedAt] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSubmittedAt(Date.now());
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (honeypot) {
      setStatus("error");
      setErrorMessage(labels.error);
      return;
    }

    const now = Date.now();
    if (submittedAt && now - submittedAt < 2000) {
      setStatus("error");
      setErrorMessage(labels.error);
      return;
    }

    setSubmittedAt(now);
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          honeypot,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data?.error ?? labels.error);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(labels.error);
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <p className="font-medium">{labels.success}</p>
        <p className="mt-3 text-sm text-muted">
          <a
            href={`mailto:${emailFallback}`}
            className="text-accent hover:opacity-80"
          >
            {emailFallback}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border border-border bg-surface p-6"
      noValidate
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-honeypot">{labels.honeypot}</label>
        <input
          id="contact-honeypot"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-name" className="text-sm text-muted">
          {labels.name}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-email" className="text-sm text-muted">
          {labels.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-subject" className="text-sm text-muted">
          {labels.subject}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm text-muted">
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </div>

      {status === "error" && errorMessage ? (
        <p role="alert" aria-live="polite" className="text-sm text-accent">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {status === "loading" ? labels.loading : labels.submit}
        </button>
        <a
          href={`mailto:${emailFallback}`}
          className="text-sm text-accent hover:opacity-80"
        >
          {emailFallback}
        </a>
      </div>
    </form>
  );
}
