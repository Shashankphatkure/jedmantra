import Image from "next/image";
import Link from "next/link";

export default function CourseAnalytics() {
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
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last year</option>
                </select>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Total Enrollments",
                value: "1,234",
                change: "+12.5%",
                positive: true,
              },
              {
                title: "Active Students",
                value: "892",
                change: "+5.2%",
                positive: true,
              },
              {
                title: "Completion Rate",
                value: "76%",
                change: "-2.1%",
                positive: false,
              },
              {
                title: "Average Rating",
                value: "4.8/5",
                change: "+0.3",
                positive: true,
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </p>
                      <p className="mt-1 text-3xl font-semibold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`flex items-center ${
                        stat.positive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <svg
                        className={`h-5 w-5 ${
                          stat.positive ? "rotate-0" : "rotate-180"
                        }`}
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
                      <span className="ml-1 text-sm">{stat.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Enrollment Trends */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Enrollment Trends
              </h3>
              <div className="mt-4 h-72 relative">
                <Image
                  src="https://via.placeholder.com/800x400?text=Enrollment+Chart"
                  alt="Enrollment trends chart"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>

            {/* Student Progress */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Student Progress
              </h3>
              <div className="mt-4 h-72 relative">
                <Image
                  src="https://via.placeholder.com/800x400?text=Progress+Chart"
                  alt="Student progress chart"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>

          {/* Course Performance Table */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Course Performance
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enrollments
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Completion Rate
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg. Rating
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        title: "Web Development Bootcamp",
                        image: "https://via.placeholder.com/40",
                        enrollments: 456,
                        completion: "82%",
                        rating: 4.9,
                        revenue: "£45,600",
                      },
                      {
                        title: "Data Science Fundamentals",
                        image: "https://via.placeholder.com/40",
                        enrollments: 328,
                        completion: "75%",
                        rating: 4.7,
                        revenue: "£32,800",
                      },
                      {
                        title: "UI/UX Design Principles",
                        image: "https://via.placeholder.com/40",
                        enrollments: 289,
                        completion: "79%",
                        rating: 4.8,
                        revenue: "£28,900",
                      },
                    ].map((course) => (
                      <tr key={course.title}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <Image
                                src={course.image}
                                alt={course.title}
                                width={40}
                                height={40}
                                className="rounded"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {course.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {course.enrollments}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {course.completion}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900">
                              {course.rating}
                            </span>
                            <div className="ml-2 flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(course.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {course.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Student Engagement */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Popular Modules */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Most Popular Modules
              </h3>
              <div className="mt-4 space-y-4">
                {[
                  { name: "Introduction to HTML", completion: 95 },
                  { name: "CSS Fundamentals", completion: 88 },
                  { name: "JavaScript Basics", completion: 82 },
                  { name: "Responsive Design", completion: 78 },
                ].map((module) => (
                  <div key={module.name}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {module.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {module.completion}%
                      </span>
                    </div>
                    <div className="mt-2 relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${module.completion}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Feedback */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Student Feedback
              </h3>
              <div className="mt-4 space-y-4">
                {[
                  {
                    name: "Sarah Johnson",
                    avatar: "https://via.placeholder.com/32",
                    rating: 5,
                    comment:
                      "The course content is very well structured and easy to follow. Great practical examples!",
                    date: "2 days ago",
                  },
                  {
                    name: "Michael Chen",
                    avatar: "https://via.placeholder.com/32",
                    rating: 4,
                    comment:
                      "Very informative course. Would love to see more advanced topics covered.",
                    date: "5 days ago",
                  },
                ].map((feedback) => (
                  <div
                    key={feedback.name}
                    className="border-b border-gray-200 pb-4"
                  >
                    <div className="flex items-start">
                      <Image
                        src={feedback.avatar}
                        alt={feedback.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">
                            {feedback.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {feedback.date}
                          </p>
                        </div>
                        <div className="mt-1 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < feedback.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-700">
                          {feedback.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
