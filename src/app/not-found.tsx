import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-purple-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. Please check the URL or return to the homepage.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
