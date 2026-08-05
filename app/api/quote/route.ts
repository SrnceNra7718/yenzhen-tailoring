import { createServerClient } from '@/app/supabase/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerEmail,
      customerPhone,
      productType,
      quantity,
      fabricOptions,
      printingType,
      estimatedPrice,
      message,
    } = body

    // Validate required fields
    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Save to database
    const { data: quoteData, error: dbError } = await supabase
      .from('quote_requests')
      .insert({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone || null,
        product_type: productType || null,
        quantity: quantity || null,
        fabric_options: fabricOptions || null,
        printing_type: printingType || null,
        estimated_price: estimatedPrice || null,
        message: message || null,
        status: 'pending',
      })
      .select()
      .single()

    if (dbError) throw dbError

    // Build email content
    const emailBody = `
New Quote Request Received
==========================

Quote ID: ${quoteData.id}
Date: ${new Date().toLocaleString()}

Customer Information:
  Name: ${customerName}
  Email: ${customerEmail}
  Phone: ${customerPhone || 'N/A'}

Order Details:
  Product: ${productType || 'Not specified'}
  Quantity: ${quantity || 'Not specified'}
  Fabric: ${fabricOptions || 'Not specified'}
  Printing Method: ${printingType || 'Not specified'}
  Estimated Price: ${estimatedPrice || 'Not calculated'}

Message:
${message || 'No additional message.'}

---
YenZhen Tailoring System
    `.trim()

    // Send email notification via Resend (if configured)
    const resendApiKey = process.env.EMAIL_SERVICE_API_KEY
    if (resendApiKey) {
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'YenZhen Tailoring <noreply@yenzhen.com>',
            to: process.env.ADMIN_EMAIL || 'admin@example.com',
            subject: `New Quote Request #${quoteData.id}`,
            text: emailBody,
          }),
        })

        if (!emailRes.ok) {
          console.warn('Failed to send email notification')
        }
      } catch (emailError) {
        console.warn('Email notification error:', emailError)
      }
    }

    return NextResponse.json(
      { success: true, quoteId: quoteData.id },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Quote API error:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}