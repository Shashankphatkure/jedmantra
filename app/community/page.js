import Image from "next/image";
import Link from "next/link";

export default function Community() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900">
                Community Forum
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Connect, share, and learn with fellow students and instructors
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Start New Discussion
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search and Filters */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search discussions..."
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="sm:w-48">
                  <select className="block w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Categories</option>
                    <option>General Discussion</option>
                    <option>Course Help</option>
                    <option>Career Advice</option>
                  </select>
                </div>
                <div className="sm:w-48">
                  <select className="block w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Most Replies</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              {[
                {
                  title: "Tips for learning React Hooks effectively?",
                  author: "Sarah Johnson",
                  avatar: "https://via.placeholder.com/32",
                  category: "Course Help",
                  replies: 12,
                  views: 234,
                  lastReply: "2 hours ago",
                  tags: ["react", "javascript", "web-development"],
                  pinned: true,
                },
                {
                  title: "Career transition from backend to full-stack",
                  author: "Mike Chen",
                  avatar: "https://via.placeholder.com/32",
                  category: "Career Advice",
                  replies: 8,
                  views: 156,
                  lastReply: "4 hours ago",
                  tags: ["career", "full-stack", "learning"],
                },
                {
                  title: "Best resources for UI/UX design principles",
                  author: "Emma Wilson",
                  avatar: "https://via.placeholder.com/32",
                  category: "General Discussion",
                  replies: 15,
                  views: 320,
                  lastReply: "1 day ago",
                  tags: ["design", "ui-ux", "resources"],
                },
              ].map((discussion) => (
                <div
                  key={discussion.title}
                  className="bg-white shadow rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={discussion.avatar}
                          alt={discussion.author}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <Link
                            href="#"
                            className="text-lg font-medium text-gray-900 hover:text-blue-600"
                          >
                            {discussion.title}
                          </Link>
                          <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                            <span>{discussion.author}</span>
                            <span>&middot;</span>
                            <span>{discussion.lastReply}</span>
                          </div>
                        </div>
                      </div>
                      {discussion.pinned && (
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 text-blue-500"
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
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {discussion.category}
                        </span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <svg
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            {discussion.replies} replies
                          </div>
                          <div className="flex items-center">
                            <svg
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            {discussion.views} views
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {discussion.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Categories
              </h2>
              <div className="space-y-2">
                {[
                  { name: "General Discussion", count: 156 },
                  { name: "Course Help", count: 89 },
                  { name: "Career Advice", count: 45 },
                  { name: "Project Showcase", count: 34 },
                  { name: "Study Groups", count: 23 },
                ].map((category) => (
                  <Link
                    key={category.name}
                    href="#"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                  >
                    <span className="text-sm text-gray-900">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Top Contributors */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Top Contributors
              </h2>
              <div className="space-y-4">
                {[
                  {
                    name: "Sarah Johnson",
                    avatar: "https://via.placeholder.com/40",
                    role: "Course Instructor",
                    points: 1250,
                  },
                  {
                    name: "Mike Chen",
                    avatar: "https://via.placeholder.com/40",
                    role: "Student",
                    points: 980,
                  },
                  {
                    name: "Emma Wilson",
                    avatar: "https://via.placeholder.com/40",
                    role: "Student",
                    points: 845,
                  },
                ].map((contributor) => (
                  <div
                    key={contributor.name}
                    className="flex items-center space-x-3"
                  >
                    <Image
                      src={contributor.avatar}
                      alt={contributor.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {contributor.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {contributor.role}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                      {contributor.points} pts
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[
                  {
                    type: "reply",
                    user: "John Doe",
                    action: "replied to",
                    target: "Tips for learning React Hooks",
                    time: "5 min ago",
                  },
                  {
                    type: "like",
                    user: "Sarah Smith",
                    action: "liked",
                    target: "Career transition guide",
                    time: "10 min ago",
                  },
                  {
                    type: "post",
                    user: "Mike Johnson",
                    action: "posted",
                    target: "New discussion about UI design",
                    time: "1 hour ago",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.type === "reply" && (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                          <svg
                            className="h-5 w-5 text-blue-600"
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
                        </span>
                      )}
                      {activity.type === "like" && (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-100">
                          <svg
                            className="h-5 w-5 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </span>
                      )}
                      {activity.type === "post" && (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                          <svg
                            className="h-5 w-5 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-800">
                        <Link href="#" className="font-medium text-gray-900">
                          {activity.user}
                        </Link>{" "}
                        {activity.action}{" "}
                        <Link href="#" className="font-medium text-gray-900">
                          {activity.target}
                        </Link>
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
