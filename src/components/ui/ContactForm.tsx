'use client';

import { useState, useEffect } from 'react';
import { contactSchema } from '@/lib/schemas';
import { Paperclip, X } from 'lucide-react';
import { z } from 'zod';

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    zip: '',
    message: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [state, setState] = useState<FormState>({ status: 'idle', message: '' });
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (fileError) {
      const timer = setTimeout(() => setFileError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [fileError]);

  const validateField = (name: string, value: string) => {
    try {
      const fieldSchema = (contactSchema.shape as any)[name];
      if (fieldSchema) {
        fieldSchema.parse(value);
      }
      setValidationErrors((prev) => ({ ...prev, [name]: [] }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors((prev) => ({
          ...prev,
          [name]: error.flatten().formErrors,
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === 'phone') {
      newValue = formatPhoneNumber(value);
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));

    if (touched[name]) {
      validateField(name, newValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles: File[] = [];
      let hasError = false;

      newFiles.forEach((file) => {
        if (file.size > 10 * 1024 * 1024) {
          // 10MB
          hasError = true;
        } else {
          validFiles.push(file);
        }
      });

      if (hasError) {
        setFileError('One or more files exceed the 10MB size limit.');
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

    const result = contactSchema.safeParse(form);

    if (!result.success) {
      setValidationErrors(result.error.flatten().fieldErrors);
      // Mark all fields as touched to show errors
      const allTouched = Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      setTouched(allTouched);
      setState({ status: 'error', message: 'Please fix the errors in the form.' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      if (form.phone) formData.append('phone', form.phone);
      formData.append('zip', form.zip);
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
      setForm({ name: '', email: '', phone: '', zip: '', message: '' });
      setTouched({});
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

  const errorClass =
    'w-full rounded border border-red-500 bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal/40 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="e.g. John Doe *"
          required
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.name && validationErrors.name?.length ? errorClass : inputClass}
        />
        {touched.name && validationErrors.name && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.name[0]}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="e.g. email@example.com *"
          required
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.email && validationErrors.email?.length ? errorClass : inputClass}
        />
        {touched.email && validationErrors.email && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.email[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="e.g. 555 555-5555"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.phone && validationErrors.phone?.length ? errorClass : inputClass}
          />
          {touched.phone && validationErrors.phone && (
            <p className="mt-1 text-xs text-red-500">{validationErrors.phone[0]}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="zip"
            placeholder="Zip Code *"
            required
            maxLength={5}
            value={form.zip}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              handleChange({ ...e, target: { ...e.target, name: 'zip', value: val } });
            }}
            onBlur={handleBlur}
            className={touched.zip && validationErrors.zip?.length ? errorClass : inputClass}
          />
          {touched.zip && validationErrors.zip && (
            <p className="mt-1 text-xs text-red-500">{validationErrors.zip[0]}</p>
          )}
        </div>
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Tell us about your project... *"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.message && validationErrors.message?.length ? errorClass : inputClass}
        />
        {touched.message && validationErrors.message && (
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

        {fileError && (
          <div className="mt-2 text-xs font-medium text-red-500 transition-opacity">
            {fileError}
          </div>
        )}

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="bg-charcoal/5 text-charcoal flex items-center justify-between rounded px-3 py-2 text-xs"
              >
                <div className="flex flex-col overflow-hidden pr-2">
                  <span className="truncate font-medium">{file.name}</span>
                  <span className="text-charcoal/60 text-[10px]">{formatBytes(file.size)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-charcoal/50 p-1 hover:text-red-500"
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
      {state.status === 'error' && !validationErrors && (
        <p className="rounded bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={state.status === 'loading'}
        className="bg-gold text-charcoal w-full cursor-pointer rounded py-3 font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state.status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
