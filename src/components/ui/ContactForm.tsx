'use client';

import { useState } from 'react';
import type { ContactFormData } from '@/lib/schemas';

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [state, setState] = useState<FormState>({ status: 'idle', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ status: 'loading', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong');
      }

      setState({
        status: 'success',
        message: "Thank you! We'll be in touch within 1 business day.",
      });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Failed to send. Please call us directly.',
      });
    }
  };

  const inputClass =
    'w-full rounded border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name *"
        required
        value={form.name}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email *"
        required
        value={form.email}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Your Phone"
        value={form.phone ?? ''}
        onChange={handleChange}
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="Tell us about your project *"
        required
        rows={5}
        value={form.message}
        onChange={handleChange}
        className={inputClass}
      />

      {state.status === 'success' && (
        <p className="rounded bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {state.message}
        </p>
      )}
      {state.status === 'error' && (
        <p className="rounded bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={state.status === 'loading'}
        className="bg-gold text-charcoal w-full rounded py-3 font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {state.status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
