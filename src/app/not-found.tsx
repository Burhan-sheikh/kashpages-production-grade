import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-4xl font-bold">404 - Page Not Found</h2>
      <p className="mb-8 text-gray-600">The page you're looking for doesn't exist.</p>
      <Link
        href="/"
        className="rounded-lg bg-primary-600 px-6 py-3 text-white transition-colors hover:bg-primary-700"
      >
        Go Home
      </Link>
    </div>
  )
}