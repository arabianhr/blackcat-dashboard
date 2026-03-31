export default function HealthPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-2">Health</h1>
      <p className="text-neutral-500 text-sm mb-6">System health and infrastructure status</p>
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 text-center">
        <p className="text-neutral-400">Connecting to container health + server metrics...</p>
        <p className="text-xs text-neutral-600 mt-2">Endpoints: Docker API, Prometheus, disk/memory</p>
      </div>
    </div>
  )
}
