"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FieldProps {
  label: string;
  id: string;
  error?: string;
  textarea?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const Field = ({
  label,
  id,
  error,
  textarea = false,
  value,
  onChange,
  placeholder,
  type = "text",
}: FieldProps) => (
  <div>
    <label htmlFor={id} className="block text-xs font-semibold text-brand-brown-light mb-1.5">
      {label}
    </label>
    {textarea ? (
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-3 text-sm bg-transparent outline-none resize-none transition-colors ${
          error ? "border-red-400" : "border-brand-sand focus-visible:border-brand-brown"
        }`}
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-3 text-sm bg-transparent outline-none transition-colors ${
          error ? "border-red-400" : "border-brand-sand focus-visible:border-brand-brown"
        }`}
      />
    )}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.includes("@")) e.email = "Please enter a valid email";
    if (!form.subject.trim()) e.subject = "Please enter a subject";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light mb-2">
          Get in Touch
        </p>
        <h1 className="font-display text-5xl font-bold text-brand-brown mb-3">
          Contact Us
        </h1>
        <p className="text-brand-brown-light">
          Questions about an order? Want to collaborate? Just say hi — we reply
          to every message within 1–2 business days.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-accent-sage/20 flex items-center justify-center mb-5">
              <Check className="w-8 h-8 text-accent-sage" strokeWidth={2} />
            </div>
            <h2 className="font-display text-3xl font-bold text-brand-brown mb-2">
              Message sent!
            </h2>
            <p className="text-brand-brown-light">
              Thanks for reaching out. We&apos;ll be back in touch within 1–2
              business days.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Your Name"
                id="name"
                value={form.name}
                onChange={(val) => setForm((p) => ({ ...p, name: val }))}
                error={errors.name}
                placeholder="Jane Doe"
              />
              <Field
                label="Email Address"
                id="email"
                type="email"
                value={form.email}
                onChange={(val) => setForm((p) => ({ ...p, email: val }))}
                error={errors.email}
                placeholder="jane@email.com"
              />
            </div>
            <Field
              label="Subject"
              id="subject"
              value={form.subject}
              onChange={(val) => setForm((p) => ({ ...p, subject: val }))}
              error={errors.subject}
              placeholder="Order question, collab inquiry, etc."
            />
            <Field
              label="Message"
              id="message"
              textarea
              value={form.message}
              onChange={(val) => setForm((p) => ({ ...p, message: val }))}
              error={errors.message}
              placeholder="Tell us what's on your mind..."
            />

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-brand-brown text-brand-cream rounded-full py-3.5 font-semibold text-sm hover:bg-brand-brown-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : <>Send Message <Send className="w-4 h-4" /></>}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Contact Details */}
      <div className="mt-14 pt-10 border-t border-brand-sand">
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { label: "Email", value: "hello@lostkid.co" },
            { label: "Response Time", value: "1–2 business days" },
            { label: "Returns", value: "30-day return policy" },
            { label: "Based In", value: "Los Angeles, CA" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light mb-1">
                {label}
              </p>
              <p className="text-sm font-medium text-brand-brown">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
