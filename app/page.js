export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">NetworkPulse</h1>
          <p className="mt-4 text-lg text-gray-600">Your LinkedIn network insights platform</p>
        </div>

        <div className="mt-8">
          <a
            href="/api/auth/signin/linkedin"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in with LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
