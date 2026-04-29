import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/schemas';
import { ContactEmail } from '@/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    zip: formData.get('zip'),
    message: formData.get('message'),
  };

  const result = contactSchema.safeParse(rawData);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, phone, zip, message } = result.data;

  // Process files
  const files = formData.getAll('files') as File[];
  const attachments = [];

  for (const file of files) {
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }
  }

  const { error } = await resend.emails.send({
    from: 'Amana Construction <noreply@amanaconstruction.us>',
    to: process.env.CONTACT_EMAIL ?? 'support@amanaconstruction.us',
    replyTo: email,
    subject: `New Quote Request from ${name}`,
    react: ContactEmail({ name, email, phone, zip, message }),
    attachments: attachments.length > 0 ? attachments : undefined,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
