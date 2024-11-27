import Image from "next/image";
import Link from "next/link";

export default function TutorDashboard() {
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
              { name: "My Courses", icon: "academic-cap", current: false },
              { name: "Students", icon: "users", current: false },
              { name: "Earnings", icon: "currency-dollar", current: false },
              { name: "Reviews", icon: "star", current: false },
              { name: "Settings", icon: "cog", current: false },
            ].map((item) => (
              <Link
                key={item.name}
                href={`/tutor/${item.name.toLowerCase().replace(" ", "-")}`}
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                {item.name}
              </Link>
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
                  Tutor Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/tutor/courses/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create New Course
                </Link>
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
                <div className="relative flex items-center">
                  <Image
                    src="/avatar.jpg"
                    alt="Tutor avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="ml-2 text-gray-700">John Smith</span>
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
                { name: "Total Students", stat: "1,234", change: "+12.5%" },
                { name: "Active Courses", stat: "15", change: "+2" },
                { name: "Total Revenue", stat: "£45,677", change: "+8.2%" },
                { name: "Average Rating", stat: "4.8", change: "+0.3" },
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

            {/* Recent Activity and Course Performance */}
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Recent Activity */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Recent Activity
                  </h2>
                  <div className="mt-6 flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {[
                        {
                          student: "Alice Johnson",
                          action: "enrolled in",
                          course: "Advanced React Development",
                          time: "2 hours ago",
                        },
                        {
                          student: "Bob Wilson",
                          action: "completed",
                          course: "Web Development Basics",
                          time: "4 hours ago",
                        },
                        {
                          student: "Carol Smith",
                          action: "left a review on",
                          course: "JavaScript Fundamentals",
                          time: "1 day ago",
                        },
                      ].map((item, index) => (
                        <li key={index} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <Image
                                src={`/student-${index + 1}.jpg`}
                                alt=""
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.student} {item.action}{" "}
                                <span className="font-semibold">
                                  {item.course}
                                </span>
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.time}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/tutor/activity"
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View all activity
                    </Link>
                  </div>
                </div>
              </div>

              {/* Course Performance */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Course Performance
                  </h2>
                  <div className="mt-6 space-y-6">
                    {[
                      {
                        name: "Advanced React Development",
                        students: 234,
                        rating: 4.9,
                        revenue: "£12,345",
                      },
                      {
                        name: "Web Development Basics",
                        students: 567,
                        rating: 4.7,
                        revenue: "£23,456",
                      },
                      {
                        name: "JavaScript Fundamentals",
                        students: 789,
                        rating: 4.8,
                        revenue: "£34,567",
                      },
                    ].map((course, index) => (
                      <div
                        key={index}
                        className="border-b pb-6 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {course.name}
                            </h3>
                            <div className="mt-1 flex items-center">
                              <span className="text-sm text-gray-500">
                                {course.students} students
                              </span>
                              <span className="mx-2 text-gray-500">•</span>
                              <div className="flex items-center">
                                <svg
                                  className="h-5 w-5 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 text-sm text-gray-500">
                                  {course.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {course.revenue}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Revenue
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/tutor/courses"
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View all courses
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Engagement */}
            <div className="mt-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Student Engagement
                  </h2>
                  <div className="mt-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        {
                          name: "Course Completion Rate",
                          stat: "78%",
                          change: "+5.4%",
                          description: "Students who complete courses",
                        },
                        {
                          name: "Average Watch Time",
                          stat: "4.2h",
                          change: "+1.2h",
                          description: "Per student per week",
                        },
                        {
                          name: "Student Satisfaction",
                          stat: "94%",
                          change: "+2.3%",
                          description: "Based on course reviews",
                        },
                      ].map((item) => (
                        <div
                          key={item.name}
                          className="bg-white overflow-hidden shadow rounded-lg"
                        >
                          <div className="p-5">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              {item.name}
                            </dt>
                            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                              <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                                {item.stat}
                                <span className="ml-2 text-sm font-medium text-green-600">
                                  {item.change}
                                </span>
                              </div>
                              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                                {item.description}
                              </div>
                            </dd>
                          </div>
                        </div>
                      ))}
                    </div>
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
