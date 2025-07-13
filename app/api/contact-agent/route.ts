import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!); // Usa la variable de entorno
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'contacto@inmoplus.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      agentEmail,
      clientName,
      clientEmail,
      clientPhone,
      message,
      propertyTitle,
    } = body;

    // Construir el contenido del email
    const html = `
      <h2>Nuevo mensaje de contacto para la propiedad: <strong>${propertyTitle}</strong></h2>
      <p><strong>Nombre:</strong> ${clientName}</p>
      <p><strong>Email:</strong> ${clientEmail}</p>
      <p><strong>Teléfono:</strong> ${clientPhone}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `;

    // Enviar el email al agente
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: agentEmail,
      subject: `Nuevo mensaje de contacto para tu propiedad: ${propertyTitle}`,
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error enviando email:', error);
    return NextResponse.json({ success: false, error: 'Error enviando email al agente.' }, { status: 500 });
  }
} 