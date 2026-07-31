function Button({ children, variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-[#d9a441] text-[#1c3d2e] font-bold',
    secondary: 'border border-gray-300 text-[#1c3d2e]',
    dark: 'bg-[#1c3d2e] text-white font-bold',
  }

  return (
    <button
      className={`text-sm px-4 py-2 disabled:opacity-50 ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button