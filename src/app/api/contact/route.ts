import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/schemas';
import { ContactEmail } from '@/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, phone, message } = result.data;

  const { error } = await resend.emails.send({
    from: 'Amana Construction <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL ?? 'info@amanaconstruction.com',
    replyTo: email,
    subject: `New Quote Request from ${name}`,
    react: ContactEmail({ name, email, phone, message }),
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
