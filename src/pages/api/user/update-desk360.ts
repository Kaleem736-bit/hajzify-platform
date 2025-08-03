import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { encrypt } from '@/lib/encryption';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'الطريقة غير مسموحة' });
  }

  try {
    const { userId, accountId, apiKey, phone } = req.body;

    if (!userId || !accountId || !apiKey || !phone) {
      return res.status(400).json({ error: 'بيانات ناقصة' });
    }

    // تشفير API Key قبل الحفظ
    const encryptedApiKey = encrypt(apiKey);

    await db.user.update({
      where: { id: userId },
      data: {
        desk360AccountId: accountId,
        desk360ApiKey: encryptedApiKey,
        desk360Phone: phone
      }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating Desk360 settings:', error);
    res.status(500).json({ error: 'خطأ في الخادم الداخلي' });
  }
}
