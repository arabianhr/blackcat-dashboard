export default function TailsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-2">Tails</h1>
      <p className="text-neutral-500 text-sm mb-6">Individual tail management and triggers</p>
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 text-center">
        <p className="text-neutral-400">Connecting to blackcat_core executor endpoints...</p>
        <p className="text-xs text-neutral-600 mt-2">Endpoint: blackcat_core /tails</p>
      </div>
    </div>
  )
}
