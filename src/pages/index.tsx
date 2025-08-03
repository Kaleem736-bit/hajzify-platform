import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold mb-6">مرحبًا بكم في منصة Hajzify</h1>
      <p className="text-lg mb-8">
        منصة متكاملة لإدارة الحجوزات والمواعيد مع دعم متكامل لواتساب
      </p>
      <div className="space-x-4">
        <Link href="/dashboard" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
          الانتقال إلى لوحة التحكم
        </Link>
        <Link href="/settings" className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700">
          الإعدادات
        </Link>
      </div>
    </div>
  );
}
