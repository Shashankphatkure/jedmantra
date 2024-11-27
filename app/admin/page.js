import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900">
        <div className="flex items-center justify-center h-16 px-4 bg-gray-800">
          <Image
            src="/logo.svg"
            alt="JedMantra Logo"
            width={150}
            height={40}
            className="h-8 w-auto"
          />
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-1">
            {[
              { name: "Dashboard", icon: "home", current: true },
              { name: "Users", icon: "users", current: false },
              { name: "Jobs", icon: "briefcase", current: false },
              { name: "Courses", icon: "academic-cap", current: false },
              { name: "Reports", icon: "chart-bar", current: false },
              { name: "Settings", icon: "cog", current: false },
            ].map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <svg
                  className="mr-3 h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      item.icon === "home"
                        ? "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        : item.icon === "users"
                        ? "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        : item.icon === "briefcase"
                        ? "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        : item.icon === "academic-cap"
                        ? "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        : item.icon === "chart-bar"
                        ? "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        : "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    }
                  />
                </svg>
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Navigation */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div>
              <div className="flex items-center">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
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
                    alt="Admin avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="ml-2 text-gray-700">Admin User</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Total Users", stat: "24,363", change: "+4.75%" },
                { name: "Active Jobs", stat: "1,234", change: "+2.15%" },
                {
                  name: "Course Enrollments",
                  stat: "45,677",
                  change: "+5.25%",
                },
                { name: "Revenue", stat: "£123,456", change: "+8.35%" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {item.name}
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {item.stat}
                            </div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              {item.change}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Recent Activity
                </h2>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View all
                </a>
              </div>
              <div className="mt-4 bg-white shadow overflow-hidden rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {[
                    {
                      user: "John Doe",
                      action: "applied for",
                      target: "Senior Developer position",
                      time: "2 hours ago",
                    },
                    {
                      user: "Jane Smith",
                      action: "enrolled in",
                      target: "React Development Course",
                      time: "4 hours ago",
                    },
                    {
                      user: "Mike Johnson",
                      action: "posted",
                      target: "Frontend Developer job",
                      time: "6 hours ago",
                    },
                  ].map((item, index) => (
                    <li key={index} className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={`/avatar-${index + 1}.jpg`}
                            alt=""
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.user} {item.action}{" "}
                            <span className="font-semibold">{item.target}</span>
                          </p>
                          <p className="text-sm text-gray-500">{item.time}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Content Management */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Pending Approvals */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Pending Approvals
                  </h3>
                  <div className="mt-4 space-y-4">
                    {[
                      {
                        type: "Job Post",
                        title: "Senior React Developer",
                        company: "Tech Co",
                      },
                      {
                        type: "Course",
                        title: "Advanced Python Programming",
                        author: "Jane Doe",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.type} by {item.company || item.author}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700">
                            Approve
                          </button>
                          <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reports */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Reports
                  </h3>
                  <div className="mt-4 space-y-4">
                    {[
                      {
                        type: "User",
                        reason: "Inappropriate behavior",
                        reporter: "Admin",
                      },
                      {
                        type: "Content",
                        reason: "Spam content",
                        reporter: "User",
                      },
                    ].map((item) => (
                      <div
                        key={item.reason}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.type} Report
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.reason} reported by {item.reporter}
                          </p>
                        </div>
                        <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                          Review
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
