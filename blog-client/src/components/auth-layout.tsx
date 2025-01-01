interface AuthLayoutProps {
    children: React.ReactNode
    title: string
    subtitle: string
  }
  
  export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          </div>
          <div className="rounded-lg border bg-white/50 backdrop-blur-xl shadow-xl p-6">
            {children}
          </div>
        </div>
      </div>
    )
  }
  
  