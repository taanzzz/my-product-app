'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState('verifying'); 
  const [message, setMessage] = useState('Verifying your email, please wait...');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Verification token not found.');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
          toast.success('Verification successful!');
        } else {
          throw new Error(data.message || 'Verification failed');
        }
      } catch (error: any) {
        setStatus('error');
        setMessage(error.message);
        toast.error(error.message);
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="max-w-md w-full text-center bg-white dark:bg-slate-800 p-10 rounded-xl shadow-lg">
        {status === 'verifying' && (
          <div>
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold">{message}</h2>
          </div>
        )}
        {status === 'success' && (
          <div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">Success!</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{message}</p>
            <Link href="/login">
              <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                Go to Login
              </button>
            </Link>
          </div>
        )}
        {status === 'error' && (
          <div>
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Error!</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{message}</p>
             <Link href="/register">
              <button className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700">
                Try Registering Again
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}