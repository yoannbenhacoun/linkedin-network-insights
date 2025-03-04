'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }

    if (status === 'authenticated' && session) {
      // Fetch LinkedIn profile data
      fetch('/api/linkedin/profile')
        .then(res => res.json())
        .then(data => {
          setProfile(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching profile:', err);
          setLoading(false);
        });
    }
  }, [session, status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your data...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {profile && (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {profile.firstName ? profile.firstName.charAt(0) : ''}
                </div>
                <span className="ml-2 font-medium">
                  {profile.firstName} {profile.lastName}
                </span>
              </div>
            )}
            <button
              onClick={() => router.push('/api/auth/signout')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your LinkedIn Profile</h2>
          {profile ? (
            <div className="space-y-2">
              <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
              <p><strong>LinkedIn ID:</strong> {profile.id}</p>
            </div>
          ) : (
            <p>Unable to load profile data.</p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Network Summary</h2>
            <p className="text-gray-600">
              Coming soon: Detailed insights about your LinkedIn network.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-600">
              Coming soon: Analysis of your recent LinkedIn activity.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
