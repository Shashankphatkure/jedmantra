import Image from "next/image";

export default function AdminAnalytics() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <div className="flex items-center space-x-4">
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 12 months</option>
              <option>All time</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Export Report
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Total Revenue",
              stat: "$123,456",
              change: "+12%",
              changeType: "increase",
            },
            {
              name: "Active Users",
              stat: "12,345",
              change: "+8.2%",
              changeType: "increase",
            },
            {
              name: "Course Enrollments",
              stat: "3,456",
              change: "+15.3%",
              changeType: "increase",
            },
            {
              name: "Job Applications",
              stat: "2,345",
              change: "+5.4%",
              changeType: "increase",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="rounded-md bg-blue-500 p-3">
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
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
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
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            item.changeType === "increase"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
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

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Revenue Chart */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Revenue Overview
              </h2>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                      Daily
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md">
                      Weekly
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                      Monthly
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    Total Revenue: $123,456
                  </div>
                </div>
                <div className="mt-6">
                  <div className="h-72 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Revenue Chart Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                User Activity
              </h2>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Active Users: 12,345
                  </div>
                </div>
                <div className="mt-6">
                  <div className="h-72 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">
                      User Activity Chart Placeholder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Performance */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Course Performance
              </h2>
              <div className="mt-6">
                <div className="space-y-4">
                  {[
                    {
                      name: "React Fundamentals",
                      enrollments: 456,
                      completion: 78,
                      rating: 4.8,
                    },
                    {
                      name: "Advanced JavaScript",
                      enrollments: 389,
                      completion: 65,
                      rating: 4.7,
                    },
                    {
                      name: "Web Development",
                      enrollments: 324,
                      completion: 82,
                      rating: 4.9,
                    },
                  ].map((course) => (
                    <div
                      key={course.name}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {course.name}
                          </h3>
                          <div className="mt-1 text-sm text-gray-500">
                            {course.enrollments} enrollments
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {course.rating}/5.0
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {course.completion}% completion
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                            <div
                              style={{ width: `${course.completion}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Geographic Distribution
              </h2>
              <div className="mt-6">
                <div className="space-y-4">
                  {[
                    { country: "United States", users: 5678, percentage: 45 },
                    { country: "India", users: 3456, percentage: 25 },
                    { country: "United Kingdom", users: 2345, percentage: 15 },
                    { country: "Canada", users: 1234, percentage: 10 },
                    { country: "Others", users: 987, percentage: 5 },
                  ].map((region) => (
                    <div key={region.country} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">
                            {region.country}
                          </div>
                          <div className="text-sm text-gray-500">
                            {region.users} users
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="relative pt-1">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                              <div
                                style={{ width: `${region.percentage}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 text-sm text-gray-500">
                        {region.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
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
              <ul className="-my-5 divide-y divide-gray-200">
                {[
                  {
                    user: "Sarah Johnson",
                    action: "enrolled in",
                    target: "React Fundamentals",
                    time: "2 hours ago",
                    avatar: "https://via.placeholder.com/40",
                  },
                  {
                    user: "Mike Chen",
                    action: "completed",
                    target: "Advanced JavaScript",
                    time: "4 hours ago",
                    avatar: "https://via.placeholder.com/40",
                  },
                  {
                    user: "Emma Wilson",
                    action: "applied for",
                    target: "Senior Developer position",
                    time: "6 hours ago",
                    avatar: "https://via.placeholder.com/40",
                  },
                ].map((activity, index) => (
                  <li key={index} className="py-5">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={activity.avatar}
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.user} {activity.action} {activity.target}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                View all activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
