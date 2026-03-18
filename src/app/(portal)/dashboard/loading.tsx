export default function Loading() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Header Loading */}
      <div className="flex justify-between items-end">
        <div className="space-y-3">
          <div className="h-2 w-32 bg-white/5 rounded" />
          <div className="h-10 w-64 bg-white/10 rounded-xl" />
        </div>
        <div className="h-16 w-40 bg-white/5 rounded-2xl" />
      </div>

      {/* Progress Card Loading */}
      <div className="h-48 w-full bg-white/[0.02] border border-white/5 rounded-[2rem]" />

      {/* Stats Grid Loading */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-white/[0.01] border border-white/5 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}