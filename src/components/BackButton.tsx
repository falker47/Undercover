export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-slate-300 hover:text-white w-10 h-10 glass rounded-full flex items-center justify-center transition-colors"
      aria-label="Indietro"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.5 15l-5-5 5-5" />
      </svg>
    </button>
  )
}
