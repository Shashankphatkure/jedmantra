import Link from "next/link";
import Image from "next/image";

export default function InstructorDashboard() {
  const stats = [
    {
      name: "Total Students",
      stat: "1,234",
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Course Revenue",
      stat: "$12,345",
      change: "+8.2%",
      changeType: "increase",
    },
    {
      name: "Average Rating",
      stat: "4.8/5.0",
      change: "+0.3",
      changeType: "increase",
    },
    { name: "Active Courses", stat: "8", change: "+2", changeType: "increase" },
  ];

  const recentActivities = [
    {
      user: "Sarah Johnson",
      avatar: "https://via.placeholder.com/40",
      action: "enrolled in",
      target: "Advanced React Patterns",
      time: "2 hours ago",
    },
    {
      user: "Mike Chen",
      avatar: "https://via.placeholder.com/40",
      action: "completed",
      target: "React Fundamentals",
      time: "4 hours ago",
    },
    {
      user: "Emma Wilson",
      avatar: "https://via.placeholder.com/40",
      action: "left a review on",
      target: "JavaScript Basics",
      time: "6 hours ago",
    },
  ];

  const popularCourses = [
    {
      title: "React Fundamentals",
      students: 456,
      rating: 4.9,
      revenue: "$5,678",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Advanced JavaScript",
      students: 389,
      rating: 4.8,
      revenue: "$4,567",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Web Development Bootcamp",
      students: 324,
      rating: 4.7,
      revenue: "$3,456",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Stats */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.name}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
              >
                <dt>
                  <div className="absolute bg-blue-500 rounded-md p-3">
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
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {item.stat}
                  </p>
                  <p
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      item.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.change}
                  </p>
                </dd>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h2>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="py-5">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={activity.avatar}
                            alt={activity.user}
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
                <Link
                  href="/instructor/activity"
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View all activity
                </Link>
              </div>
            </div>
          </div>

          {/* Popular Courses */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Popular Courses
              </h2>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {popularCourses.map((course, index) => (
                    <li key={index} className="py-5">
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
                        </div>
                        <div>
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <Link
                  href="/instructor/courses"
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View all courses
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/instructor/courses/create"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:bg-gray-50"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Create New Course
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Get started with a new course and share your knowledge.
                </p>
              </div>
            </Link>

            <Link
              href="/instructor/analytics"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:bg-gray-50"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  View Analytics
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Check your course performance and student engagement.
                </p>
              </div>
            </Link>

            <Link
              href="/instructor/reviews"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:bg-gray-50"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white">
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
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Manage Reviews
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Respond to student reviews and maintain course quality.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
