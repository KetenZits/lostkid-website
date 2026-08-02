"use client";

import { useState } from "react";
import { Send, Check, AlertCircle, Mail, Clock, RotateCcw, MapPin } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

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

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
};

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
    <label htmlFor={id} className="block text-xs font-semibold tracking-wide text-brand-brown-light mb-1.5">
      {label}
    </label>
    {textarea ? (
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-3 text-sm bg-brand-cream-dark/20 outline-none resize-none transition-all duration-200 focus-visible:bg-brand-cream focus-visible:ring-2 focus-visible:ring-brand-brown/15 ${error ? "border-red-400" : "border-brand-sand focus-visible:border-brand-brown"
          }`}
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-3 text-sm bg-brand-cream-dark/20 outline-none transition-all duration-200 focus-visible:bg-brand-cream focus-visible:ring-2 focus-visible:ring-brand-brown/15 ${error ? "border-red-400" : "border-brand-sand focus-visible:border-brand-brown"
          }`}
      />
    )}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-1 text-xs text-red-500 mt-1.5 overflow-hidden"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const CONTACT_DETAILS = [
  { label: "Email", value: "hello@lostkid.co", icon: Mail },
  { label: "Response Time", value: "1–2 business days", icon: Clock },
  { label: "Returns", value: "30-day return policy", icon: RotateCcw },
  { label: "Based In", value: "Thailand, Bangkok", icon: MapPin },
];

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

  const resetForm = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero, with a little postmark stamp echoing the "send us mail" idea */}
      <div className="relative mb-10">
        <motion.div
          initial={{ opacity: 0, rotate: -18, scale: 0.6 }}
          animate={{ opacity: 1, rotate: -8, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.15 }}
          className="hidden sm:flex absolute -top-2 right-0 w-20 h-20 rounded-full border-2 border-dashed border-brand-brown-light/50 items-center justify-center text-center"
        >
          <span className="text-[9px] font-semibold tracking-widest uppercase text-brand-brown-light leading-tight">
            Reply<br />Guaranteed
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light mb-2"
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="font-display text-5xl font-bold text-brand-brown mb-3 max-w-md"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-brand-brown-light max-w-sm"
        >
          Questions about an order? Want to collaborate? Just say hi — we reply
          to every message within 1–2 business days.
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center py-16 rounded-2xl border border-dashed border-brand-sand bg-brand-cream-dark/10"
          >
            {/* Success state stamped with the brand's own patch — submitting
                a message becomes a little "sealed and sent" moment instead
                of a generic green checkmark unrelated to the brand. */}
            <motion.div
              initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: -6, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
              className="circular-patch w-20 h-20 mb-6"
            >
              <Check className="w-8 h-8" strokeWidth={2.5} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display text-3xl font-bold text-brand-brown mb-2"
            >
              Message sent!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="text-brand-brown-light max-w-xs"
            >
              Thanks for reaching out. We&apos;ll be back in touch within 1–2
              business days.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetForm}
              className="mt-6 text-xs font-semibold tracking-wide uppercase text-brand-brown-light hover:text-brand-brown underline underline-offset-4 transition-colors"
            >
              Send another message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5 p-6 sm:p-7 rounded-2xl border border-brand-sand bg-brand-cream/40"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
                <Field
                  label="Your Name"
                  id="name"
                  value={form.name}
                  onChange={(val) => setForm((p) => ({ ...p, name: val }))}
                  error={errors.name}
                  placeholder="Jane Doe"
                />
              </motion.div>
              <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
                <Field
                  label="Email Address"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(val) => setForm((p) => ({ ...p, email: val }))}
                  error={errors.email}
                  placeholder="jane@email.com"
                />
              </motion.div>
            </div>
            <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
              <Field
                label="Subject"
                id="subject"
                value={form.subject}
                onChange={(val) => setForm((p) => ({ ...p, subject: val }))}
                error={errors.subject}
                placeholder="Order question, collab inquiry, etc."
              />
            </motion.div>
            <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
              <Field
                label="Message"
                id="message"
                textarea
                value={form.message}
                onChange={(val) => setForm((p) => ({ ...p, message: val }))}
                error={errors.message}
                placeholder="Tell us what's on your mind..."
              />
            </motion.div>

            <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full bg-brand-brown text-brand-cream rounded-full py-3.5 font-semibold text-sm shadow-sm hover:bg-brand-brown-dark hover:shadow-md transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Sending...
                  </motion.span>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Stitched seam instead of a plain border-t, matching the rest of the site */}
      <div className="stitch-divider text-brand-sand mt-14 mb-10" />

      {/* Contact Details, styled as small patch-like tags */}
      <div className="grid sm:grid-cols-2 gap-4">
        {CONTACT_DETAILS.map(({ label, value, icon: Icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            whileHover={{ y: -2 }}
            className="flex items-start gap-3 p-3.5 rounded-xl border border-transparent hover:border-brand-sand hover:bg-brand-cream-dark/10 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-brand-cream-dark/60 flex items-center justify-center shrink-0">
              <Icon className="w-3.5 h-3.5 text-brand-brown-light" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light mb-1">
                {label}
              </p>
              <p className="text-sm font-medium text-brand-brown">{value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}