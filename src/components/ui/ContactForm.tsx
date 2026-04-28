'use client';

import { useState } from 'react';
import type { ContactFormData } from '@/lib/schemas';
import { Paperclip, X } from 'lucide-react';

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
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<FormState>({ status: 'idle', message: '' });
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear validation error when user types
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => ({ ...prev, [e.target.name]: [] }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Prevent accumulating too many files or very large files if you want
      const validFiles = newFiles.filter((file) => file.size <= 10 * 1024 * 1024); // 10MB limit per file
      if (validFiles.length < newFiles.length) {
        alert('Some files were ignored because they exceed the 10MB size limit.');
      }
      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ status: 'loading', message: '' });
    setValidationErrors({});

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      if (form.phone) formData.append('phone', form.phone);
      formData.append('message', form.message);

      files.forEach((file) => {
        formData.append('files', file);
      });

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422 && data.details) {
          setValidationErrors(data.details);
          throw new Error('Please fix the errors in the form.');
        }
        throw new Error(data.error ?? 'Something went wrong');
      }

      setState({
        status: 'success',
        message: "Thank you! We'll be in touch within 1 business day.",
      });
      setForm({ name: '', email: '', phone: '', message: '' });
      setFiles([]);
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
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          required
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />
        {validationErrors.name && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.name[0]}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Your Email *"
          required
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
        {validationErrors.email && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.email[0]}</p>
        )}
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={form.phone ?? ''}
          onChange={handleChange}
          className={inputClass}
        />
        {validationErrors.phone && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.phone[0]}</p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Tell us about your project *"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={inputClass}
        />
        {validationErrors.message && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.message[0]}</p>
        )}
      </div>

      <div>
        <label className="text-charcoal hover:text-gold flex w-fit cursor-pointer items-center gap-2 text-sm font-medium transition-colors">
          <Paperclip size={16} />
          <span>Attach photos or files (optional)</span>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
        </label>

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="bg-charcoal/5 text-charcoal flex items-center justify-between rounded px-3 py-2 text-xs"
              >
                <span className="truncate pr-2">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-charcoal/50 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

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
