import Image from "next/image";
import Link from "next/link";

export default function StudentOverview() {
  const quickActions = [
    {
      name: "Continue Learning",
      description: "Resume your last course",
      href: "/student/courses",
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "Browse Jobs",
      description: "Find new opportunities",
      href: "/jobs",
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "View Applications",
      description: "Track your job applications",
      href: "/student/applications",
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      name: "Certificates",
      description: "View your achievements",
      href: "/student/certificates",
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center">
            <Image
              src="https://via.placeholder.com/64"
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, John!
              </h1>
              <p className="text-gray-500">
                Ready to continue your learning journey?
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <div
              key={action.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="rounded-md bg-blue-500 p-3">
                      {action.icon}
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <Link
                      href={action.href}
                      className="text-lg font-medium text-gray-900 hover:text-blue-600"
                    >
                      {action.name}
                    </Link>
                    <p className="mt-1 text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Current Course Progress */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Current Course Progress
              </h2>
              <div className="mt-6">
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        React Fundamentals
                      </h3>
                      <p className="text-sm text-gray-500">75% Complete</p>
                    </div>
                    <Link
                      href="/student/courses"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                      Continue
                    </Link>
                  </div>
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: "75%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Advanced JavaScript
                      </h3>
                      <p className="text-sm text-gray-500">45% Complete</p>
                    </div>
                    <Link
                      href="/student/courses"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                      Continue
                    </Link>
                  </div>
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: "45%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Upcoming Interviews
                </h2>
                <Link
                  href="/student/applications"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View all
                </Link>
              </div>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {[
                    {
                      company: "Tech Corp",
                      position: "Senior React Developer",
                      type: "Technical Interview",
                      date: "Jan 20, 2024",
                      time: "10:00 AM",
                      logo: "https://via.placeholder.com/40",
                    },
                    {
                      company: "Startup Inc",
                      position: "Full Stack Developer",
                      type: "HR Interview",
                      date: "Jan 22, 2024",
                      time: "2:00 PM",
                      logo: "https://via.placeholder.com/40",
                    },
                  ].map((interview, index) => (
                    <li key={index} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={interview.logo}
                            alt={interview.company}
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {interview.position}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {interview.company}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-sm text-gray-900">
                            {interview.date}
                          </p>
                          <p className="text-sm text-gray-500">
                            {interview.time}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h2>
            <div className="mt-6 flow-root">
              <ul className="-mb-8">
                {[
                  {
                    content: "Completed Module 5: React Hooks",
                    target: "React Fundamentals",
                    date: "2 hours ago",
                    icon: (
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    content: "Applied for position",
                    target: "Senior React Developer at Tech Corp",
                    date: "4 hours ago",
                    icon: (
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    ),
                  },
                  {
                    content: "Started new course",
                    target: "Advanced JavaScript",
                    date: "1 day ago",
                    icon: (
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
                        <svg
                          className="w-5 h-5 text-purple-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    ),
                  },
                ].map((item, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== 2 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>{item.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div>
                            <p className="text-sm text-gray-500">
                              {item.content}{" "}
                              <span className="font-medium text-gray-900">
                                {item.target}
                              </span>
                            </p>
                            <p className="mt-0.5 text-sm text-gray-500">
                              {item.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
