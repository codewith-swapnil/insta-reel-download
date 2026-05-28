"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Send, Mail, MessageSquare, CheckCircle2 } from "lucide-react";

// Note: metadata export won't work in "use client" files.
// For production, split into a server layout + client form component.

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production: send to a form service (e.g. Formspree, EmailJS)
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#f72585] uppercase tracking-widest mb-3">Contact</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">Get in Touch</h1>
          <p className="text-[#9090a8] text-lg">
            Have a question, found a bug, or want to share feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Contact options */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-[#111118] border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f72585]/10 flex items-center justify-center text-[#f72585]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Email</p>
              <p className="text-[#55555f] text-xs">hello@InstaSaverHub.pro</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-[#111118] border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#9b5de5]/10 flex items-center justify-center text-[#9b5de5]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Response Time</p>
              <p className="text-[#55555f] text-xs">Within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="p-10 rounded-2xl bg-[#111118] border border-emerald-500/20 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="font-display font-semibold text-white text-xl mb-2">Message Sent!</h2>
            <p className="text-[#9090a8] text-sm">
              Thanks for reaching out. We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-[#111118] border border-white/5 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-[#9090a8] mb-2">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#18181f] border border-white/5 text-white text-sm placeholder:text-[#55555f] focus:border-[#f72585]/40 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#9090a8] mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#18181f] border border-white/5 text-white text-sm placeholder:text-[#55555f] focus:border-[#f72585]/40 focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#9090a8] mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#18181f] border border-white/5 text-white text-sm placeholder:text-[#55555f] focus:border-[#f72585]/40 focus:outline-none transition-colors resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#f72585] to-[#9b5de5] text-white font-semibold text-sm hover:opacity-90 hover:scale-[1.02] transition-all"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
