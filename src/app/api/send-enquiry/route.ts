import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, project } = await req.json();

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #1a1a1a; margin-bottom: 24px;">New Enquiry Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555; width: 160px;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${name || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${email || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555;">WhatsApp / Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${phone || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555;">Company</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${company || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #555; vertical-align: top;">Project Description</td>
            <td style="padding: 10px 0; color: #1a1a1a; white-space: pre-wrap;">${project || '—'}</td>
          </tr>
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
        subject: `New Enquiry from ${name || 'a visitor'}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || 'Failed to send email' },
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
