import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .refine((val) => {
      const words = val.trim().split(/\s+/);
      return words.length >= 2 && words.every((word) => word.length >= 2);
    }, 'Name must be at least two words with a minimum of 2 characters each'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{3} \d{3}-\d{4}$/.test(val),
      'Phone must be a US number in the format xxx xxx-xxxx',
    ),
  zip: z.string().regex(/^\d{5}$/, 'Zip code must be exactly 5 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
