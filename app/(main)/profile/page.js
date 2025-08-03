"use client"; 

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'; 
import Cookies from 'js-cookie';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('auth_token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/v1/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data profil atau token tidak valid.');
        }

        const data = await response.json();
        setUser(data);

      } catch (error) {
        console.error(error);
        Cookies.remove('auth_token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return <p className="text-center mt-20">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-center mt-20">Gagal memuat profil. Silakan coba login kembali.</p>;
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">User Profile</h1>
        <img src={user.avatar} alt={user.name} className="w-24 h-24 mx-auto rounded-full" />
        <div className="text-center">
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400 capitalize">Role: {user.role}</p>
        </div>
      </div>
    </main>
  );
}