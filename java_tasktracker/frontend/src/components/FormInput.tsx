import type { InputHTMLAttributes } from "react"

export default function FormInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 bg-neutral-800 text-white border border-rose-700 
        rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${props.className ?? ""}`}
    />
  )
}
