import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { sendWhatsApp } from '@/lib/desk360';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'الطريقة غير مسموحة' });
  }

  try {
    const { userId, date } = req.body;

    // إنشاء الموعد
    const appointment = await db.appointment.create({
      data: {
        userId: parseInt(userId),
        date: new Date(date)
      },
      include: {
        user: true
      }
    });

    // إرسال إشعار واتساب إذا كانت بيانات Desk360 متوفرة
    if (appointment.user.desk360AccountId && appointment.user.desk360ApiKey) {
      await sendWhatsApp(
        {
          desk360ApiKey: appointment.user.desk360ApiKey,
          desk360AccountId: appointment.user.desk360AccountId
        },
        {
          to: appointment.user.desk360Phone || appointment.user.phone,
          template: 'appointment_confirmation',
          language: { code: 'ar' },
          components: [{
            type: 'body',
            parameters: [
              { type: 'text', text: appointment.user.name },
              { type: 'text', text: new Date(date).toLocaleString('ar-SA') }
            ]
          }]
        }
      );
    }

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'خطأ في الخادم الداخلي' });
  }
}
