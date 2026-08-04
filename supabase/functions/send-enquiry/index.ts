declare const Deno;

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(async (req) => {
  // ✅ CORS preflight
  if (req?.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  try {
    const { name, email, phone, company, project } = await req?.json();

    const RESEND_API_KEY = Deno?.env?.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #1a1a1a; margin-bottom: 24px;">New Enquiry Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555; width: 160px;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${name || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${email || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555;">WhatsApp / Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${phone || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #555;">Company</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a;">${company || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #555; vertical-align: top;">Project Description</td>
            <td style="padding: 10px 0; color: #1a1a1a; white-space: pre-wrap;">${project || "—"}</td>
          </tr>
        </table>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: ["luke@vellasocial.com"],
        subject: `New Enquiry from ${name || "a visitor"}`,
        html: htmlBody,
      }),
    });

    if (!res?.ok) {
      const errorData = await res?.json();
      throw new Error(errorData.message || "Failed to send email");
    }

    const data = await res?.json();

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});

export {};
