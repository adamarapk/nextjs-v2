"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove('auth_token');
    router.push('/login');
  };

  const linkStyle = (path) => {
    return pathname === path
      ? 'bg-gray-200 text-gray-900'
      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900';
  };

  return (
    <nav className="bg-transparent absolute w-full z-10 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href="/products" className={`px-3 py-2 rounded-md text-sm font-medium ${linkStyle('/products')}`}>
                Products
            </Link>
            <Link href="/profile" className={`px-3 py-2 rounded-md text-sm font-medium ${linkStyle('/profile')}`}>
                Profile
            </Link>
          </div>
          
          <div>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}