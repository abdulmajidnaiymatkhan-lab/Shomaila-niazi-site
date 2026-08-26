import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactEmail } from "@/lib/social-links";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Email sending isn't configured yet." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json({ error: "All three fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email doesn't look valid." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "shomailaniazi.com <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `Message from ${name} via shomailaniazi.com`,
      text: `${message}\n\n— ${name} (${email})`,
      html: `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p><p>&mdash; ${escapeHtml(
        name
      )} (${escapeHtml(email)})</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Couldn't send the message." }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend send failed:", err);
    return NextResponse.json({ error: "Couldn't send the message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
