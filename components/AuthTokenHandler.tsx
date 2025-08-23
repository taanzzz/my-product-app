'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

// ✅ সেশনের জন্য একটি ইন্টারফেস ডিফাইন করা হচ্ছে
// এটি বলে দিচ্ছে যে সেশনের ভেতরে customToken নামে একটি স্ট্রিং থাকতে পারে
interface SessionWithCustomToken {
  customToken?: string;
}

export default function AuthTokenHandler() {
  const { data: session } = useSession();

  useEffect(() => {
    // ✅ এখন সেশনকে আমাদের কাস্টম টাইপ হিসেবে গণ্য করা হচ্ছে
    const sessionWithToken = session as SessionWithCustomToken | null;

    if (sessionWithToken && sessionWithToken.customToken) {
      localStorage.setItem('token', sessionWithToken.customToken);
    }
  }, [session]);

  return null; // এই কম্পোনেন্টটি UI-তে কিছুই দেখাবে না
}