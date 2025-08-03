import { useState } from 'react';
import { sendWhatsApp } from '../lib/desk360';

export default function AppointmentForm({ user }: { user: any }) {
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // إنشاء الموعد
      const response = await fetch('/api/appointments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          date
        })
      });

      if (!response.ok) {
        throw new Error('فشل في إنشاء الموعد');
      }

      // إرسال إشعار واتساب
      if (user.desk360AccountId && user.desk360ApiKey) {
        await sendWhatsApp(
          {
            desk360ApiKey: user.desk360ApiKey,
            desk360AccountId: user.desk360AccountId
          },
          {
            to: user.desk360Phone || user.phone,
            template: 'appointment_confirmation',
            language: { code: 'ar' },
            components: [{
              type: 'body',
              parameters: [
                { type: 'text', text: user.name },
                { type: 'text', text: new Date(date).toLocaleString('ar-SA') }
              ]
            }]
          }
        );
      }

      alert('تم إنشاء الموعد وإرسال التأكيد بنجاح!');
      setDate('');
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء إنشاء الموعد');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">إنشاء موعد جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">التاريخ والوقت</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          {isLoading ? 'جاري إنشاء الموعد...' : 'إنشاء موعد'}
        </button>
      </form>
    </div>
  );
}
