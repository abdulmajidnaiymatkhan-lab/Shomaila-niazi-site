"use client";

import { useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { contactEmail } from "@/lib/social-links";

export default function ConnectForm() {
  const root = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [error, setError] = useState("");

  useGSAP(
    () => {
      gsap.from(".form-headline", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".form-headline", start: "top 82%" },
      });
      gsap.from(".form-field", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "premiumOut",
        scrollTrigger: { trigger: ".connect-form", start: "top 80%" },
      });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (status !== "sent") return;
      gsap.from(".connect-form-success", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        ease: "premiumOut",
      });
    },
    { scope: root, dependencies: [status] }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("All three fields help her actually reply.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email doesn't look quite right.");
      return;
    }
    setError("");

    const subject = encodeURIComponent(`Message from ${name} via shomailaniazi.com`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <section
      ref={root}
      className="w-full bg-cream px-6 py-28 text-ink sm:px-10 sm:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="form-headline font-serif text-4xl font-medium leading-[1.05] sm:text-5xl">
          Let&rsquo;s talk.
        </h2>
        <p className="form-headline mt-4 max-w-lg font-sans text-base leading-relaxed text-ink/65 sm:text-lg">
          Collaboration, a question, or just to say the story landed &mdash;
          this goes straight to her.
        </p>

        {status === "sent" ? (
          <div className="connect-form connect-form-success mt-12 rounded-2xl border border-sage/40 bg-sage/10 p-8">
            <p className="font-serif text-2xl text-charcoal">
              Your email client should be opening now.
            </p>
            <p className="mt-2 font-sans text-ink/65">
              If it didn&rsquo;t, write to her directly at{" "}
              <a href={`mailto:${contactEmail}`} className="underline hover:text-charcoal">
                {contactEmail}
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="connect-form mt-12 space-y-6">
            <div className="form-field">
              <label htmlFor="name" className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full border-b border-charcoal/25 bg-transparent py-3 font-sans text-lg text-ink outline-none transition-colors duration-200 placeholder:text-ink/30 focus:border-peach"
                placeholder="Your name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border-b border-charcoal/25 bg-transparent py-3 font-sans text-lg text-ink outline-none transition-colors duration-200 placeholder:text-ink/30 focus:border-peach"
                placeholder="you@example.com"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="mt-2 w-full resize-none border-b border-charcoal/25 bg-transparent py-3 font-sans text-lg text-ink outline-none transition-colors duration-200 placeholder:text-ink/30 focus:border-peach"
                placeholder="What's on your mind?"
              />
            </div>

            {error && (
              <p className="form-field font-sans text-sm text-peach">{error}</p>
            )}

            <button
              type="submit"
              className="form-field inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3 font-sans text-sm font-semibold text-cream transition-transform duration-200 ease-out active:scale-[0.97]"
            >
              Send message
              <span aria-hidden>&rarr;</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
