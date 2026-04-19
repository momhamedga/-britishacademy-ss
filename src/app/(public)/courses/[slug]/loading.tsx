export default function CourseLoading() {
  return (
    <main className="min-h-screen pt-32 md:pt-44 pb-20 px-4 md:px-6  overflow-hidden">
      {/* تأثيرات الإضاءة في الخلفية */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 1. Skeleton للهيرو (العنوان) */}
        <div className="space-y-6 mb-16">
          <div className="flex gap-3">
            <div className="h-6 w-32 bg-white/5 rounded-full animate-pulse" />
            <div className="h-6 w-24 bg-white/5 rounded-full animate-pulse" />
          </div>
          <div className="h-20 w-3/4 bg-white/10 rounded-3xl animate-pulse" />
          <div className="h-20 w-1/2 bg-white/5 rounded-3xl animate-pulse" />
        </div>

        {/* 2. Skeleton للإحصائيات الثلاثية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-white/5 bg-white/[0.01] mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-10 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                <div className="h-5 w-24 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* 3. Skeleton للـ Tabs (8 أعمدة) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex gap-4 border-b border-white/5 pb-4">
              <div className="h-10 w-28 bg-white/10 rounded-t-lg animate-pulse" />
              <div className="h-10 w-28 bg-white/5 rounded-t-lg animate-pulse" />
              <div className="h-10 w-28 bg-white/5 rounded-t-lg animate-pulse" />
            </div>
            <div className="h-[400px] w-full bg-white/[0.02] rounded-[2.5rem] border border-white/5 animate-pulse" />
          </div>

          {/* 4. Skeleton للـ Sidebar (4 أعمدة) */}
          <div className="lg:col-span-4">
            <div className="h-[500px] w-full bg-white/[0.03] rounded-[2.5rem] border border-gold/10 p-8 space-y-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
                <div className="h-12 w-32 bg-white/10 rounded-xl animate-pulse" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-8 bg-white/10 rounded animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="h-16 w-full bg-gold/20 rounded-2xl animate-pulse mt-auto" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}