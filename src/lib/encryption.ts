// src/lib/encryption.ts
import * as CryptoJS from 'crypto-js'; // تغيير طريقة الاستيراد

const SECRET_KEY = process.env.ENCRYPTION_KEY || 'default-secret-key'; // إضافة قيمة افتراضية

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
