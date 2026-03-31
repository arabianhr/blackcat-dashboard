export default function TasksPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-2">Tasks</h1>
      <p className="text-neutral-500 text-sm mb-6">All operations performed by Black Cat</p>
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 text-center">
        <p className="text-neutral-400">Connecting to n8n execution history...</p>
        <p className="text-xs text-neutral-600 mt-2">Endpoint: n8n /api/v1/executions</p>
      </div>
    </div>
  )
}
