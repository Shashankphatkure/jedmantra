import Image from "next/image";
import Link from "next/link";

export default function DiscussionThread() {
  const discussion = {
    title: "Tips for learning React Hooks effectively?",
    author: "Sarah Johnson",
    avatar: "https://via.placeholder.com/40",
    category: "Course Help",
    content: `I'm currently learning React Hooks and would love to hear some tips from experienced developers. What are some best practices and common pitfalls to avoid?

Some specific questions I have:
1. When should I use useEffect vs useLayoutEffect?
2. What's the best way to handle data fetching with hooks?
3. How do you organize custom hooks in a large project?

Would really appreciate any insights from the community!`,
    date: "2 days ago",
    views: 234,
    likes: 45,
    tags: ["react", "javascript", "web-development"],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <Link
                  href="/community"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </Link>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {discussion.title}
                  </h1>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <span>{discussion.category}</span>
                    <span className="mx-2">&middot;</span>
                    <span>{discussion.views} views</span>
                    <span className="mx-2">&middot;</span>
                    <span>{discussion.likes} likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Original Post */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <Image
                    src={discussion.avatar}
                    alt={discussion.author}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {discussion.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {discussion.date}
                    </div>
                  </div>
                </div>
                <div className="mt-4 prose max-w-none text-gray-500">
                  {discussion.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="inline-flex items-center text-gray-500 hover:text-gray-700">
                      <svg
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      Like
                    </button>
                    <button className="inline-flex items-center text-gray-500 hover:text-gray-700">
                      <svg
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      Share
                    </button>
                    <button className="inline-flex items-center text-gray-500 hover:text-gray-700">
                      <svg
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      Save
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    {discussion.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Replies */}
            <div className="space-y-6">
              {[
                {
                  author: "Mike Chen",
                  avatar: "https://via.placeholder.com/40",
                  role: "Senior Developer",
                  content:
                    "Here are some tips from my experience:\n\n1. Always include dependencies in useEffect when accessing external values\n2. Use custom hooks to extract common logic\n3. Start with useState for simple state management before reaching for complex solutions",
                  date: "1 day ago",
                  likes: 12,
                  isVerified: true,
                },
                {
                  author: "Emma Wilson",
                  avatar: "https://via.placeholder.com/40",
                  role: "React Developer",
                  content:
                    "Regarding data fetching, I recommend using React Query or SWR. They handle caching, loading states, and error handling really well.",
                  date: "1 day ago",
                  likes: 8,
                },
              ].map((reply, index) => (
                <div key={index} className="bg-white shadow rounded-lg">
                  <div className="p-6">
                    <div className="flex items-center">
                      <Image
                        src={reply.avatar}
                        alt={reply.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {reply.author}
                          </span>
                          {reply.isVerified && (
                            <svg
                              className="ml-1 h-4 w-4 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reply.role}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reply.date}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 prose max-w-none text-gray-500">
                      {reply.content.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="inline-flex items-center text-gray-500 hover:text-gray-700">
                          <svg
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                          {reply.likes} Likes
                        </button>
                        <button className="inline-flex items-center text-gray-500 hover:text-gray-700">
                          <svg
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                            />
                          </svg>
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add a Reply
              </h3>
              <div className="space-y-4">
                <textarea
                  rows={4}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Share your thoughts..."
                />
                <div className="flex justify-end">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                    Post Reply
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Info */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                About the Author
              </h3>
              <div className="flex items-center">
                <Image
                  src={discussion.avatar}
                  alt={discussion.author}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <div className="text-lg font-medium text-gray-900">
                    {discussion.author}
                  </div>
                  <div className="text-sm text-gray-500">Member since 2023</div>
                  <div className="mt-2">
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Discussions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Similar Discussions
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Understanding React Context API",
                    replies: 8,
                    views: 156,
                  },
                  {
                    title: "Best practices for React performance",
                    replies: 12,
                    views: 234,
                  },
                  {
                    title: "Managing complex state with useReducer",
                    replies: 6,
                    views: 123,
                  },
                ].map((discussion) => (
                  <Link
                    key={discussion.title}
                    href="#"
                    className="block p-4 rounded-lg hover:bg-gray-50"
                  >
                    <h4 className="text-sm font-medium text-gray-900">
                      {discussion.title}
                    </h4>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>{discussion.replies} replies</span>
                      <span className="mx-2">&middot;</span>
                      <span>{discussion.views} views</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
