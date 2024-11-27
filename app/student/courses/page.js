import Image from "next/image";
import Link from "next/link";

export default function StudentCourses() {
  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "Mike Chen",
      progress: 75,
      lastAccessed: "2 hours ago",
      image: "https://via.placeholder.com/150",
      status: "In Progress",
      nextLesson: "React Hooks Introduction",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Sarah Johnson",
      progress: 45,
      lastAccessed: "1 day ago",
      image: "https://via.placeholder.com/150",
      status: "In Progress",
      nextLesson: "Promises and Async/Await",
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      instructor: "Emma Wilson",
      progress: 100,
      lastAccessed: "1 week ago",
      image: "https://via.placeholder.com/150",
      status: "Completed",
      nextLesson: null,
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">My Courses</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>All Courses</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Not Started</option>
            </select>
          </div>
        </div>

        {/* Course Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Enrolled Courses",
              stat: "8",
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              ),
            },
            {
              name: "Completed Courses",
              stat: "3",
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
            },
            {
              name: "Average Progress",
              stat: "68%",
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ),
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
                      {item.icon}
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
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course List */}
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="relative pb-2/3">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="absolute h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {course.title}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      course.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Instructor: {course.instructor}
                </p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="mt-2">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${course.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Last accessed {course.lastAccessed}
                  </p>
                  {course.nextLesson && (
                    <p className="mt-1 text-sm text-gray-500">
                      Next lesson: {course.nextLesson}
                    </p>
                  )}
                </div>
                <div className="mt-6">
                  <Link
                    href={`/courses/learn/${course.id}`}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {course.status === "Completed"
                      ? "Review Course"
                      : "Continue Learning"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Courses */}
        <div className="mt-12">
          <h2 className="text-lg font-medium text-gray-900">
            Recommended Courses
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "TypeScript Essentials",
                instructor: "David Lee",
                duration: "6 hours",
                level: "Intermediate",
                image: "https://via.placeholder.com/150",
                price: "$49.99",
              },
              {
                title: "Node.js Advanced",
                instructor: "Lisa Wang",
                duration: "8 hours",
                level: "Advanced",
                image: "https://via.placeholder.com/150",
                price: "$59.99",
              },
              {
                title: "Vue.js for Beginners",
                instructor: "Tom Wilson",
                duration: "5 hours",
                level: "Beginner",
                image: "https://via.placeholder.com/150",
                price: "$39.99",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="relative pb-2/3">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Instructor: {course.instructor}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>{course.duration}</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-lg font-medium text-gray-900">
                      {course.price}
                    </span>
                  </div>
                  <div className="mt-6">
                    <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
