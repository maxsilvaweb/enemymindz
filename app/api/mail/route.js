import { NextResponse } from 'next/server';
const postmark = require('postmark');

// Send mail using postMark API
// POST /api/mail
export async function POST(req) {
  let body = await req.json();
  const { email, subject, text_body, html_body } = body;
  const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

  const sendMail = await client.sendEmail({
    From: process.env.POSTMARK_EMAIL,
    To: email ? email : process.env.POSTMARK_EMAIL,
    Subject: `enemymindz.co.uk - ${subject}`,
    TextBody: text_body,
    HtmlBody: html_body,
  });

  if (!sendMail) {
    return NextResponse.json({
      status: 500,
      message: 'error',
    });
  } else {
    return NextResponse.json(sendMail);
  }
}
