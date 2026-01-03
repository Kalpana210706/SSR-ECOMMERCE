import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center">
      <div className="max-w-4xl text-center px-6">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to Our E-Commerce Platform
        </h1>

        <p className="text-lg opacity-90 mb-10">
          A modern product management dashboard with real-time analytics,
          secure admin access, and server-side rendering.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/products"
            className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            View Products
          </Link>

          <Link
            href="/login"
            className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700 transition"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </main>
  );
}


