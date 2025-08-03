import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Desk360Settings({ user }: { user: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      accountId: user.desk360AccountId || '',
      apiKey: '',
      phone: user.desk360Phone || ''
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/update-desk360', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          ...data
        })
      });

      if (!response.ok) {
        throw new Error('فشل في تحديث الإعدادات');
      }

      alert('تم تحديث إعدادات Desk360 بنجاح!');
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء تحديث الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">إعدادات Desk360</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Account ID</label>
          <input
            {...register('accountId', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block mb-1 text-gray-700">API Key</label>
          <input
            type="password"
            {...register('apiKey', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block mb-1 text-gray-700">رقم الهاتف</label>
          <input
            {...register('phone', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
        </button>
      </form>
    </div>
  );
}
