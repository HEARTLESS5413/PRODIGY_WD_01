export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel flex flex-col items-center gap-4 rounded-[2rem] px-8 py-10 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-accent-gold" />
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-accent-gold">Noir Table</p>
          <p className="mt-3 text-lg font-medium text-white">Preparing your dining experience...</p>
        </div>
      </div>
    </div>
  );
}
