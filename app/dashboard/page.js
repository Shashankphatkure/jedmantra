import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
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
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-600">
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
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <Image
                    src="/avatar.jpg"
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-gray-700">John Doe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, John! Here's what's happening with your job search and
            learning progress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Applications */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Job Applications
                </h2>
                <div className="mt-6 space-y-6">
                  {[1, 2, 3].map((application) => (
                    <div
                      key={application}
                      className="flex items-start space-x-4 pb-6 border-b last:border-0"
                    >
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-blue-600">
                          Senior Software Engineer
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Tech Company Ltd • London
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span>Applied on Jan 12, 2024</span>
                          <span className="mx-2">•</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Under Review
                          </span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">View application</span>
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href="/applications"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View all applications →
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Progress */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Current Courses
                </h2>
                <div className="mt-6 space-y-6">
                  {[1, 2].map((course) => (
                    <div key={course} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-900">
                          Advanced React Development
                        </h3>
                        <span className="text-sm text-gray-500">
                          75% Complete
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                            <div
                              style={{ width: "75%" }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Next: Advanced Hooks
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                          Continue →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href="/courses"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Browse more courses →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Summary */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/avatar.jpg"
                    alt="User avatar"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      John Doe
                    </h2>
                    <p className="text-sm text-gray-500">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-b py-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-500">Applications</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                    <p className="text-sm text-gray-500">Courses</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/profile"
                    className="w-full flex justify-center py-2 px-4 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Saved Jobs */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Saved Jobs
                </h2>
                <div className="mt-6 space-y-4">
                  {[1, 2, 3].map((job) => (
                    <div
                      key={job}
                      className="flex items-start space-x-4 pb-4 border-b last:border-0"
                    >
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-blue-600">
                          Frontend Developer
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Tech Startup • Remote
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          £45,000 - £60,000
                        </p>
                      </div>
                      <button className="text-red-400 hover:text-red-500">
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href="/saved-jobs"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View all saved jobs →
                  </Link>
                </div>
              </div>
            </div>

            {/* Recommended Skills */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recommended Skills
                </h2>
                <div className="mt-6 space-y-4">
                  {[
                    { skill: "TypeScript", jobs: 156 },
                    { skill: "React Native", jobs: 89 },
                    { skill: "AWS", jobs: 234 },
                  ].map((item) => (
                    <div
                      key={item.skill}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.skill}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.jobs} related jobs
                        </p>
                      </div>
                      <Link
                        href={`/courses?skill=${item.skill}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Learn →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
