import {
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function InstructorAnalytics() {
  const stats = [
    {
      name: "Total Revenue",
      stat: "$12,345",
      change: "+8.2%",
      changeType: "increase",
      icon: CurrencyDollarIcon,
      color: "blue",
    },
    {
      name: "Course Enrollments",
      stat: "2,345",
      change: "+12.1%",
      changeType: "increase",
      icon: UserGroupIcon,
      color: "purple",
    },
    {
      name: "Average Rating",
      stat: "4.8/5.0",
      change: "+0.3",
      changeType: "increase",
      icon: AcademicCapIcon,
      color: "pink",
    },
    {
      name: "Completion Rate",
      stat: "78%",
      change: "+5.4%",
      changeType: "increase",
      icon: ChartBarIcon,
      color: "indigo",
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - adjusted padding and spacing */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 relative overflow-hidden pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-3">Analytics</h1>
            <p className="text-xl text-white/90 mb-6">
              Track your performance metrics and course insights
            </p>

            {/* Date Range Selector - improved spacing and hover states */}
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg rounded-xl p-3">
              <select className="bg-transparent text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer hover:bg-white/5">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last 12 months</option>
                <option value="all">All time</option>
              </select>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-all duration-200 active:scale-95">
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-12">
        {/* Stats Grid - improved card styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${item.color}-100`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <div className={`flex items-center text-sm ${
                  item.changeType === "increase" ? "text-green-600" : "text-red-600"
                }`}>
                  {item.changeType === "increase" ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  {item.change}
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{item.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{item.stat}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid - improved spacing and consistency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart - adjusted internal spacing */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors">Daily</button>
                <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">Weekly</button>
                <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">Monthly</button>
              </div>
            </div>
            <div className="h-80 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Revenue Chart Placeholder</p>
            </div>
          </div>

          {/* Course Performance - adjusted spacing between items */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-8">Top Performing Courses</h2>
            <div className="space-y-8">
              {topCourses.map((course, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>{course.students} students</span>
                      <span className="mx-2">•</span>
                      <span>{course.rating} rating</span>
                      <span className="mx-2">•</span>
                      <span>{course.revenue}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-indigo-600 rounded-full"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
