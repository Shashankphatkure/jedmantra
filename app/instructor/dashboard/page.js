import Image from "next/image";
import Link from "next/link";

export default function InstructorDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900">
                Instructor Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your courses and track student progress
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link
                href="/instructor/courses/create"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Create New Course
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Students",
              value: "1,234",
              change: "+12% from last month",
              positive: true,
            },
            {
              title: "Active Courses",
              value: "8",
              change: "+2 new this month",
              positive: true,
            },
            {
              title: "Course Completion Rate",
              value: "76%",
              change: "+5% from last month",
              positive: true,
            },
            {
              title: "Total Revenue",
              value: "£12,345",
              change: "+8% from last month",
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
                </div>
                <div className="mt-4">
                  <div
                    className={`text-sm ${
                      stat.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Your Courses */}
          <section className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Your Courses
              </h2>
              <div className="mt-6 flow-root">
                <ul className="divide-y divide-gray-200">
                  {[
                    {
                      title: "Advanced Web Development",
                      students: 456,
                      rating: 4.8,
                      revenue: "£4,560",
                      image: "https://via.placeholder.com/80",
                      status: "Active",
                    },
                    {
                      title: "UI/UX Design Fundamentals",
                      students: 328,
                      rating: 4.7,
                      revenue: "£3,280",
                      image: "https://via.placeholder.com/80",
                      status: "Active",
                    },
                    {
                      title: "React Native Masterclass",
                      students: 289,
                      rating: 4.9,
                      revenue: "£2,890",
                      image: "https://via.placeholder.com/80",
                      status: "Draft",
                    },
                  ].map((course) => (
                    <li key={course.title} className="py-5">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={course.image}
                            alt={course.title}
                            width={80}
                            height={80}
                            className="rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {course.title}
                          </p>
                          <div className="mt-1 flex items-center">
                            <span className="text-sm text-gray-500">
                              {course.students} students
                            </span>
                            <span className="mx-2 text-gray-500">&middot;</span>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500">
                                {course.rating}
                              </span>
                              <svg
                                className="h-5 w-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {course.revenue}
                          </p>
                          <p
                            className={`mt-1 text-sm ${
                              course.status === "Active"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {course.status}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h2>
              <div className="mt-6 flow-root">
                <ul className="divide-y divide-gray-200">
                  {[
                    {
                      type: "enrollment",
                      user: "John Doe",
                      avatar: "https://via.placeholder.com/32",
                      course: "Advanced Web Development",
                      time: "2 hours ago",
                    },
                    {
                      type: "review",
                      user: "Sarah Smith",
                      avatar: "https://via.placeholder.com/32",
                      course: "UI/UX Design Fundamentals",
                      rating: 5,
                      time: "4 hours ago",
                    },
                    {
                      type: "completion",
                      user: "Mike Johnson",
                      avatar: "https://via.placeholder.com/32",
                      course: "Advanced Web Development",
                      time: "1 day ago",
                    },
                  ].map((activity, index) => (
                    <li key={index} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={activity.avatar}
                            alt={activity.user}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{activity.user}</span>{" "}
                            {activity.type === "enrollment" && "enrolled in"}
                            {activity.type === "review" && "reviewed"}
                            {activity.type === "completion" && "completed"}{" "}
                            <span className="font-medium">
                              {activity.course}
                            </span>
                          </p>
                          {activity.type === "review" && (
                            <div className="mt-1 flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < activity.rating
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
                          )}
                          <p className="mt-1 text-sm text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Student Performance */}
        <section className="mt-8 bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Student Performance
            </h2>
            <div className="mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Activity
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      name: "John Doe",
                      avatar: "https://via.placeholder.com/32",
                      course: "Advanced Web Development",
                      progress: 75,
                      lastActivity: "2 hours ago",
                      grade: "A",
                    },
                    {
                      name: "Sarah Smith",
                      avatar: "https://via.placeholder.com/32",
                      course: "UI/UX Design Fundamentals",
                      progress: 60,
                      lastActivity: "1 day ago",
                      grade: "B+",
                    },
                    {
                      name: "Mike Johnson",
                      avatar: "https://via.placeholder.com/32",
                      course: "Advanced Web Development",
                      progress: 90,
                      lastActivity: "3 hours ago",
                      grade: "A+",
                    },
                  ].map((student) => (
                    <tr key={student.name}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Image
                              src={student.avatar}
                              alt={student.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.course}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">
                            {student.progress}%
                          </span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 rounded-full h-2"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.lastActivity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {student.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
