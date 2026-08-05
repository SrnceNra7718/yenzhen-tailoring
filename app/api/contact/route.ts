import { createServerClient } from '@/app/supabase/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Save to database
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        phone: phone || null,
        message,
      })

    if (dbError) throw dbError

    // Build email content
    const emailBody = `
New Contact Message Received
============================

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}

Message:
${message}

---
YenZhen Tailoring System
    `.trim()

    // Send email notification via Resend (if configured)
    const resendApiKey = process.env.EMAIL_SERVICE_API_KEY
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'YenZhen Tailoring <noreply@yenzhen.com>',
            to: process.env.ADMIN_EMAIL || 'admin@example.com',
            subject: `New Contact Message from ${name}`,
            text: emailBody,
          }),
        })
      } catch (emailError) {
        console.warn('Email notification error:', emailError)
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}