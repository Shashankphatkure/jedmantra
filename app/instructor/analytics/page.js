import Image from "next/image";

export default function InstructorAnalytics() {
  const stats = [
    {
      name: "Total Revenue",
      stat: "$12,345",
      change: "+8.2%",
      changeType: "increase",
    },
    {
      name: "Course Enrollments",
      stat: "2,345",
      change: "+12.1%",
      changeType: "increase",
    },
    {
      name: "Average Rating",
      stat: "4.8/5.0",
      change: "+0.3",
      changeType: "increase",
    },
    {
      name: "Completion Rate",
      stat: "78%",
      change: "+5.4%",
      changeType: "increase",
    },
  ];

  const topCourses = [
    {
      title: "React Fundamentals",
      revenue: "$5,678",
      students: 456,
      rating: 4.9,
      completionRate: "82%",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Advanced JavaScript",
      revenue: "$4,567",
      students: 389,
      rating: 4.8,
      completionRate: "75%",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Web Development Bootcamp",
      revenue: "$3,456",
      students: 324,
      rating: 4.7,
      completionRate: "79%",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>

        {/* Date Range Selector */}
        <div className="mt-4 flex items-center space-x-4">
          <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 12 months</option>
            <option>All time</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Export Report
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
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

        {/* Revenue Chart */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Revenue Overview
              </h2>
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
            </div>
            <div className="mt-6">
              <div className="h-72 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Revenue Chart Placeholder</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Course Performance */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Course Performance
              </h2>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {topCourses.map((course) => (
                    <li key={course.title} className="py-5">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={course.image}
                            alt={course.title}
                            width={60}
                            height={60}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {course.title}
                          </p>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span>{course.students} students</span>
                            <span className="mx-2">&middot;</span>
                            <span>{course.rating} rating</span>
                            <span className="mx-2">&middot;</span>
                            <span>{course.revenue}</span>
                          </div>
                          <div className="mt-2 flex items-center">
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: course.completionRate }}
                                ></div>
                              </div>
                            </div>
                            <span className="ml-2 text-sm text-gray-500">
                              {course.completionRate} completion
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Student Demographics */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Student Demographics
              </h2>
              <div className="mt-6">
                <div className="h-96 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">
                    Demographics Chart Placeholder
                  </p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Top Countries
                  </h3>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        United States
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        45%
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">India</span>
                      <span className="text-sm font-medium text-gray-900">
                        25%
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">UK</span>
                      <span className="text-sm font-medium text-gray-900">
                        15%
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Age Groups
                  </h3>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">18-24</span>
                      <span className="text-sm font-medium text-gray-900">
                        30%
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">25-34</span>
                      <span className="text-sm font-medium text-gray-900">
                        45%
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">35-44</span>
                      <span className="text-sm font-medium text-gray-900">
                        25%
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
