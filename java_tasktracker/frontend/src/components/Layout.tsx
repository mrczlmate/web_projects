import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
  bgColor?: string
}

export default function Layout({
  children,
  bgColor = "from-neutral-900 to-neutral-800"}: LayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} flex items-center justify-center px-4`}>
      <div className="w-full max-w-md bg-neutral-950 text-white shadow-2xl rounded-2xl p-6 sm:p-8 space-y-6 border border-rose-700">
        {children}
      </div>
    </div>
  )
}
