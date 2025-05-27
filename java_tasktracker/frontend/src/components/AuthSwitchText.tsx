interface Props {
  text: string
  linkText: string
  onClick: () => void
}

export default function AuthSwitchText({ text, linkText, onClick }: Props) {
  return (
    <p className="text-sm text-center text-rose-300">
      {text}{" "}
      <button onClick={onClick} className="text-rose-400 hover:underline font-medium">
        {linkText}
      </button>
    </p>
  )
}
