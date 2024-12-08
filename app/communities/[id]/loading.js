export default function Loading() {
  return (
    <main className="">
      {/* Community Header Skeleton */}
      <div className="relative">
        {/* Cover Image Skeleton */}
        <div className="h-24 bg-gray-800 animate-pulse" />

        {/* Community Info Skeleton */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
              <div className="h-4 w-96 bg-gray-800 rounded mt-2 animate-pulse" />
              <div className="flex gap-4 mt-4">
                <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-28 bg-gray-800 rounded-full animate-pulse" />
              <div className="h-10 w-24 bg-gray-800 rounded-full animate-pulse" />
              <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse" />
              <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="border-b border-gray-800">
          <div className="flex gap-4 px-4 py-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 w-16 bg-gray-800 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Posts Skeleton */}
      <div className="pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border-b border-gray-800">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 animate-pulse" />
              <div className="flex-grow">
                <div className="h-4 w-48 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-800 rounded mt-2 animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-800 rounded mt-2 animate-pulse" />
                <div className="flex justify-between mt-4 max-w-md">
                  {[1, 2, 3, 4].map((j) => (
                    <div
                      key={j}
                      className="h-4 w-16 bg-gray-800 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
