import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 text-white">
        <div className="flex flex-col justify-between">
          <Link href="/" className="text-2xl font-display font-bold">
            KashPages
          </Link>
          <div>
            <h2 className="text-4xl font-display font-bold mb-4">
              Build Beautiful Landing Pages
            </h2>
            <p className="text-lg text-primary-100">
              Professional page builder with drag-and-drop, real-time collaboration, and stunning templates.
            </p>
          </div>
          <div className="text-sm text-primary-200">
            © 2026 KashPages. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
