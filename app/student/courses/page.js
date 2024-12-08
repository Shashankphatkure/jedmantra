import Image from "next/image";
import Link from "next/link";
import { 
  MagnifyingGlassIcon, 
  BookOpenIcon, 
  CheckCircleIcon,
  ChartBarIcon,
  ClockIcon,
  UserCircleIcon,
  ArrowRightIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Made more compact */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              My Learning Journey
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Track your progress and continue learning
            </p>

            {/* Search and Filter - Centered and improved spacing */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search your courses..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-white/60" />
              </div>
              <select className="w-full sm:w-40 pl-4 pr-10 py-3 rounded-lg border border-white/20 bg-white/10 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent">
                <option value="">All Courses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Stats - Improved grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { name: "Enrolled Courses", stat: "8", icon: BookOpenIcon, color: "blue" },
            { name: "Completed Courses", stat: "3", icon: CheckCircleIcon, color: "green" },
            { name: "Average Progress", stat: "68%", icon: ChartBarIcon, color: "purple" },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${item.color}-100`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {item.stat}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Courses - Improved card layout */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Active Courses</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-40">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      course.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-1">
                    {course.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <UserCircleIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="line-clamp-1">{course.instructor}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{course.lastAccessed}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-blue-600">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${course.progress}%` }}
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      ></div>
                    </div>
                  </div>

                  <Link
                    href={`/courses/learn/${course.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors group"
                  >
                    {course.status === "Completed" ? "Review Course" : "Continue Learning"}
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses - Improved card layout */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Recommended for You
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
