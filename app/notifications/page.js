import Image from "next/image";
import Link from "next/link";

export default function Notifications() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/logo.svg"
                  alt="JedMantra Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center">
              <button className="ml-4 relative flex-shrink-0 p-1 text-blue-600 hover:text-blue-700">
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="ml-4 relative flex items-center">
                <Image
                  src="/avatar.jpg"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="ml-2 text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className="lg:w-64">
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <div className="mt-6 space-y-6">
                    {[
                      { name: "All Notifications", count: 12, current: true },
                      { name: "Jobs", count: 4, current: false },
                      { name: "Courses", count: 3, current: false },
                      { name: "Messages", count: 2, current: false },
                      { name: "Updates", count: 3, current: false },
                    ].map((filter) => (
                      <button
                        key={filter.name}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
                          filter.current
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span>{filter.name}</span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            filter.current
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {filter.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1">
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-900">
                      Notifications
                    </h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Mark all as read
                    </button>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        type: "job",
                        title: "New job match found",
                        description:
                          "A new Senior Developer position matches your preferences",
                        time: "2 hours ago",
                        read: false,
                      },
                      {
                        type: "course",
                        title: "Course update available",
                        description:
                          "New content added to React Development Course",
                        time: "4 hours ago",
                        read: false,
                      },
                      {
                        type: "message",
                        title: "New message from Tech Co Ltd",
                        description:
                          "Regarding your job application for Frontend Developer",
                        time: "1 day ago",
                        read: true,
                      },
                      {
                        type: "update",
                        title: "Profile completion reminder",
                        description:
                          "Complete your profile to increase visibility to employers",
                        time: "2 days ago",
                        read: true,
                      },
                    ].map((notification, index) => (
                      <div
                        key={index}
                        className={`flex items-start p-4 ${
                          !notification.read ? "bg-blue-50" : "hover:bg-gray-50"
                        } rounded-lg transition-colors duration-150 ease-in-out`}
                      >
                        <div className="flex-shrink-0">
                          {notification.type === "job" ? (
                            <svg
                              className="h-6 w-6 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          ) : notification.type === "course" ? (
                            <svg
                              className="h-6 w-6 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                          ) : notification.type === "message" ? (
                            <svg
                              className="h-6 w-6 text-purple-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-6 w-6 text-yellow-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p
                              className={`text-sm font-medium ${
                                !notification.read
                                  ? "text-blue-900"
                                  : "text-gray-900"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {notification.time}
                            </p>
                          </div>
                          <p
                            className={`mt-1 text-sm ${
                              !notification.read
                                ? "text-blue-800"
                                : "text-gray-600"
                            }`}
                          >
                            {notification.description}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Dismiss</span>
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More */}
                  <div className="mt-6">
                    <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Load More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
