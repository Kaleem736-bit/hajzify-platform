import Head from 'next/head';
import Image from 'next/image';

export default function Layout({ children, title = 'Hajzify' }: { 
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Image
            src="/images/hajzify-logo.png"
            alt="Hajzify Logo"
            width={120}
            height={40}
          />
          <nav className="ml-auto">
            <ul className="flex space-x-6">
              <li>
                <a href="/dashboard" className="text-blue-600 hover:text-blue-800">
                  لوحة التحكم
                </a>
              </li>
              <li>
                <a href="/settings" className="text-blue-600 hover:text-blue-800">
                  الإعدادات
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Hajzify. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
