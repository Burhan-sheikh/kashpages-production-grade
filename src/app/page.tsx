import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white">
      <div className="container px-4 py-16 text-center">
        <h1 className="mb-6 font-display text-6xl font-bold tracking-tight text-gray-900">
          Build Beautiful Landing Pages
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Professional page builder with drag-and-drop, real-time collaboration, and stunning templates.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/auth/signup"
            className="rounded-lg bg-primary-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Get Started Free
          </Link>
          <Link
            href="/templates"
            className="rounded-lg border-2 border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            View Templates
          </Link>
        </div>
      </div>
    </div>
  )
}