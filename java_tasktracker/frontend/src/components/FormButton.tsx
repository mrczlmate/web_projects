import type { ButtonHTMLAttributes } from "react"

export default function FormButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 rounded-lg transition ${props.className ?? ""}`}
    >
      {children}
    </button>
  )
}
