// src/app/courses/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-48 pb-20">
      {/* Skeleton للهيدر */}
      <div className="mb-20 space-y-4">
        <div className="w-48 h-6 bg-white/5 animate-pulse rounded-full" />
        <div className="w-full max-w-2xl h-20 bg-white/5 animate-pulse rounded-3xl" />
      </div>

      {/* Skeleton لشبكة الكورسات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-[500px] glass rounded-[2.5rem] border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        ))}
      </div>
    </div>
  )
}