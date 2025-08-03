import Desk360Settings from '@/components/Desk360Settings';
import { db } from '@/lib/db';
import { getSession } from 'next-auth/react';

export default function Settings({ user }: { user: any }) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">الإعدادات</h1>
      <Desk360Settings user={user} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
