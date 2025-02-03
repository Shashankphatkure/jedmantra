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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function StudentCourses() {
  const supabase = createClientComponentClient()
  
  // Fetch enrolled courses with their details
  const { data: enrollments, error: enrollmentsError } = await supabase
    .from('enrollments')
    .select(`
      *,
      course:courses(
        id,
        title,
        instructor_name,
        course_image,
        instructor_image,
        video_hours,
        lecture_count
      )
    `)
    .eq('status', 'active')
    .order('enrolled_at', { ascending: false })

  // Calculate stats
  const totalEnrolled = enrollments?.length || 0
  const completedCourses = enrollments?.filter(e => e.status === 'completed').length || 0
  const averageProgress = enrollments?.reduce((acc, curr) => {
    const progress = curr.progress?.overall || 0
    return acc + progress
  }, 0) / totalEnrolled || 0

  // Fetch recommended courses
  const { data: recommendedCourses } = await supabase
    .from('courses')
    .select('*')
    .limit(3)
    .order('created_at', { ascending: false })
    // You might want to add more sophisticated recommendation logic here

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
            { name: "Enrolled Courses", stat: totalEnrolled, icon: BookOpenIcon, color: "blue" },
            { name: "Completed Courses", stat: completedCourses, icon: CheckCircleIcon, color: "green" },
            { name: "Average Progress", stat: `${Math.round(averageProgress)}%`, icon: ChartBarIcon, color: "purple" },
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

        {/* Active Courses - Premium card layout */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Active Courses</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {enrollments?.map((enrollment) => (
              <div
                key={enrollment.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="relative h-56">
                  <Image
                    src={enrollment.course.course_image}
                    alt={enrollment.course.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                      enrollment.status === "completed"
                        ? "bg-green-100/90 text-green-800"
                        : "bg-blue-100/90 text-blue-800"
                    }`}>
                      {enrollment.status === "completed" ? "Completed" : "In Progress"}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {enrollment.course.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Instructor Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                        <Image
                          src={enrollment.course.instructor_image}
                          alt={enrollment.course.instructor_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Instructor</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {enrollment.course.instructor_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {enrollment.course.video_hours}h
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <BookOpenIcon className="h-4 w-4 mr-1" />
                        {enrollment.course.lecture_count} lectures
                      </div>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 font-medium">Course Progress</span>
                      <span className="font-bold text-blue-600">{enrollment.progress?.overall}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${enrollment.progress?.overall}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/courses/learn/${enrollment.course.id}`}
                    className="group/button w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    {enrollment.status === "completed" ? (
                      <>
                        <BookOpenIcon className="h-5 w-5 mr-2" />
                        Review Course
                      </>
                    ) : (
                      <>
                        <ArrowRightIcon className="h-5 w-5 mr-2 group-hover/button:translate-x-1 transition-transform" />
                        Continue Learning
                      </>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses - Premium card layout */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Recommended for You
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses?.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="relative h-56">
                  <Image
                    src={course.course_image}
                    alt={course.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-white/90 text-gray-900 backdrop-blur-sm">
                      ${course.price}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Instructor Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                        <Image
                          src={course.instructor_image}
                          alt={course.instructor_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Instructor</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {course.instructor_name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{course.video_hours} hours</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpenIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{course.lecture_count} lectures</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="group/button w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md">
                    <AcademicCapIcon className="h-5 w-5 mr-2" />
                    Enroll Now
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
