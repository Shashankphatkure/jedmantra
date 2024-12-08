import Image from "next/image";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <section className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Learning Progress
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">4</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Courses in Progress
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Completed Courses
                  </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Certificates Earned
                  </div>
                </div>
              </div>
            </section>

            {/* Active Courses */}
            <section className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Active Courses
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Advanced Web Development",
                    image: "https://picsum.photos/seed/webdev/400/300",
                    progress: 75,
                    nextLesson: "React Hooks Deep Dive",
                    instructor: "John Smith",
                    lastAccessed: "2 days ago",
                  },
                  {
                    title: "UI/UX Design Fundamentals",
                    image: "https://picsum.photos/seed/uidesign/400/300",
                    progress: 45,
                    nextLesson: "User Research Methods",
                    instructor: "Sarah Johnson",
                    lastAccessed: "1 week ago",
                  },
                ].map((course) => (
                  <div
                    key={course.title}
                    className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-6">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={160}
                        height={120}
                        className="rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Instructor: {course.instructor}
                        </p>
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="font-medium text-gray-900">{course.progress}% Complete</span>
                            <span className="text-gray-500">Last accessed {course.lastAccessed}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-indigo-600 rounded-full h-2 transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            Next: {course.nextLesson}
                          </div>
                          <button className="inline-flex items-center px-4 py-2 rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activities */}
            <section className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Activities
              </h2>
              <div className="space-y-6">
                {[
                  {
                    type: "assignment",
                    title: "JavaScript Basics Quiz",
                    course: "Advanced Web Development",
                    score: "90%",
                    date: "Yesterday",
                  },
                  {
                    type: "certificate",
                    title: "HTML & CSS Mastery",
                    course: "Web Development Fundamentals",
                    date: "3 days ago",
                  },
                  {
                    type: "forum",
                    title: "Discussion: Best Practices in UI Design",
                    course: "UI/UX Design Fundamentals",
                    date: "1 week ago",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {activity.type === "assignment" && (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                          <svg
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                      )}
                      {activity.type === "certificate" && (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                          <svg
                            className="h-5 w-5 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                        </span>
                      )}
                      {activity.type === "forum" && (
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-100">
                          <svg
                            className="h-5 w-5 text-purple-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">{activity.course}</p>
                    </div>
                    <div className="text-right">
                      {activity.score && (
                        <p className="text-sm font-medium text-green-600">
                          {activity.score}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Learning Goals */}
            <section className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Learning Goals
              </h2>
              <div className="space-y-6">
                {[
                  { goal: "Complete Advanced Web Development", progress: 75 },
                  { goal: "Master React and Redux", progress: 30 },
                  { goal: "Learn UI/UX Design", progress: 45 },
                ].map((goal) => (
                  <div key={goal.goal}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium text-gray-900">{goal.goal}</span>
                      <span className="text-indigo-600">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-indigo-600 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended Courses */}
            <section className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recommended for You
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Data Science Fundamentals",
                    image: "https://picsum.photos/seed/datascience/400/300",
                    instructor: "Michael Chen",
                    rating: 4.8,
                    students: 1234,
                  },
                  {
                    title: "Mobile App Development",
                    image: "https://picsum.photos/seed/mobiledev/400/300",
                    instructor: "Emma Wilson",
                    rating: 4.7,
                    students: 987,
                  },
                ].map((course) => (
                  <div 
                    key={course.title} 
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={80}
                      height={60}
                      className="rounded-lg shadow-sm"
                    />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {course.instructor}
                      </p>
                      <div className="mt-1 flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {course.rating}
                        </span>
                        <div className="ml-1 flex">
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
                        <span className="ml-2 text-sm text-gray-500">
                          ({course.students} students)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-500 font-medium">
                  View All Recommendations
                </button>
              </div>
            </section>

            {/* Upcoming Events */}
            <section className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Upcoming Events
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Live Q&A: React Best Practices",
                    date: "Tomorrow, 2:00 PM",
                    instructor: "John Smith",
                  },
                  {
                    title: "Workshop: UI Design Principles",
                    date: "Friday, 11:00 AM",
                    instructor: "Sarah Johnson",
                  },
                ].map((event) => (
                  <div
                    key={event.title}
                    className="border-l-4 border-blue-600 pl-4"
                  >
                    <h3 className="text-sm font-medium text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                    <p className="text-sm text-gray-500">
                      By {event.instructor}
                    </p>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-500 font-medium">
                      Set Reminder
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
