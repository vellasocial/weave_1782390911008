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
    if (
      !RESEND_API_KEY ||
      RESEND_API_KEY.startsWith('your-') ||
      RESEND_API_KEY === 'your-resend-api-key-here'
    ) {
      const msg =
        'RESEND_API_KEY is missing or still a placeholder. Add your real Resend key (starts with "re_") to the RESEND_API_KEY environment variable.';
      console.error('[send-enquiry] ' + msg);
      return NextResponse.json({ error: msg, friendly: true }, { status: 500 });
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

    const VERIFIED_SENDER = 'Vella Social <enquiries@vellasocial.com>';
    const FALLBACK_SENDER = 'Vella Social <onboarding@resend.dev>';

    const sendWith = (from: string) =>
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from,
          to: ['luke@vellasocial.com'],
          reply_to: email,
          subject: `New enquiry: ${serviceRaw || 'General'} from ${name}`,
          html: htmlBody,
        }),
      });

    let usedSender = VERIFIED_SENDER;
    let res = await sendWith(VERIFIED_SENDER);

    if (!res.ok) {
      const firstError = await res.clone().json().catch(() => ({}));
      const firstMsg = String(firstError?.message || '');
      const domainProblem =
        res.status === 403 ||
        res.status === 422 ||
        /domain|verif|from/i.test(firstMsg);
      console.error(
        `[send-enquiry] Send with ${VERIFIED_SENDER} failed (${res.status}): ${firstMsg || JSON.stringify(firstError)}`
      );
      if (domainProblem) {
        usedSender = FALLBACK_SENDER;
        res = await sendWith(FALLBACK_SENDER);
      }
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const realError =
        errorData?.message || errorData?.error || `Resend responded with status ${res.status}`;
      console.error(
        `[send-enquiry] Resend error (${res.status}) using ${usedSender}: ${JSON.stringify(errorData)}`
      );
      return NextResponse.json(
        { error: realError, status: res.status, sender: usedSender },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, id: data.id, sender: usedSender });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('[send-enquiry] Unexpected error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
