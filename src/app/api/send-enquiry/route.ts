import { NextRequest, NextResponse } from 'next/server';

const escapeHtml = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sanitizeHeader = (value: unknown): string =>
  String(value ?? '').replace(/[\r\n]+/g, ' ').trim();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = sanitizeHeader(body?.name);
    const email = sanitizeHeader(body?.email);
    const phone = escapeHtml(body?.phone);
    const company = escapeHtml(body?.company);
    const serviceRaw = sanitizeHeader(body?.service);
    const project = escapeHtml(body?.project);

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Name and a valid email are required.' }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const row = (label: string, value: string, last = false) => `
          <tr>
            <td style="padding: 10px 0; ${last ? '' : 'border-bottom: 1px solid #e0e0e0;'} font-weight: bold; color: #555; width: 160px; vertical-align: top;">${label}</td>
            <td style="padding: 10px 0; ${last ? '' : 'border-bottom: 1px solid #e0e0e0;'} color: #1a1a1a; white-space: pre-wrap;">${value || '—'}</td>
          </tr>`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #1a1a1a; margin-bottom: 24px;">New Enquiry Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${row('Name', escapeHtml(name))}
          ${row('Email', escapeHtml(email))}
          ${row('WhatsApp / Phone', phone)}
          ${row('Company', company)}
          ${row('Service', escapeHtml(serviceRaw))}
          ${row('Project details', project, true)}
        </table>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['luke@vellasocial.com'],
        reply_to: email,
        subject: `New enquiry: ${serviceRaw || 'General'} from ${name}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData?.message || 'Failed to send email' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, id: data.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
