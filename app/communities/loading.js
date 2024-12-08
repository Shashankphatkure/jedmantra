export default function Loading() {
  return (
    <main className="">
      {/* Header Skeleton */}
      <header className="p-4 border-b border-gray-800 backdrop-blur-md bg-black/70 sticky top-0 z-10 flex justify-between items-center">
        <div className="h-6 w-48 bg-gray-800 rounded animate-pulse" />
        <div className="relative flex items-center max-w-md w-full">
          <div className="w-full h-10 bg-gray-800 rounded-full animate-pulse" />
        </div>
      </header>

      <div className="p-3 overflow-hidden">
        {/* Categories Skeleton */}
        <div className="flex gap-1.5 overflow-x-auto pb-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-10 w-32 bg-gray-800 rounded-full animate-pulse"
            />
          ))}
        </div>

        <div className="pt-3 space-y-6">
          {/* Section Title Skeleton */}
          <div className="h-6 w-40 bg-gray-800 rounded animate-pulse mb-4" />

          {/* Community Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-900 p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 animate-pulse" />
                  <div>
                    <div className="h-5 w-32 bg-gray-800 rounded animate-pulse mb-2" />
                    <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-8 w-16 bg-gray-800 rounded-full animate-pulse" />
              </div>
            ))}
          </div>

          {/* Show More Button Skeleton */}
          <div className="flex justify-center">
            <div className="h-10 w-32 bg-gray-800 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
