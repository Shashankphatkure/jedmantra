"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function StudentDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const skipLinks = [
    { id: "main-content", label: "Skip to main content" },
    { id: "active-courses", label: "Skip to active courses" },
    { id: "learning-goals", label: "Skip to learning goals" }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 z-50">
        {skipLinks.map(link => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="sr-only focus:not-sr-only focus:block focus:bg-indigo-600 
              focus:text-white focus:px-4 focus:py-2 focus:m-2 focus:rounded-lg
              focus:shadow-lg focus:outline-none"
          >
            {link.label}
          </a>
        ))}
      </div>

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
            ) : (
              <section className="bg-white shadow-lg rounded-xl p-6 transform transition-all duration-300 hover:shadow-xl">
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
            )}

            {/* Active Courses */}
            <section id="active-courses" className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Active Courses</h2>
                <div className="relative">
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg
                    px-3 py-1">
                    Sort by
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {courses.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No Active Courses</h3>
                    <p className="text-gray-500 mt-2">Start your learning journey today</p>
                    <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg 
                      hover:bg-indigo-700 active:scale-95 transition-all duration-200
                      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Browse Courses
                    </button>
                  </div>
                ) : (
                  <div className="group relative bg-white border border-gray-100 rounded-xl p-6 
                    hover:shadow-lg transition-all duration-300 hover:scale-[1.02] 
                    hover:border-indigo-200">
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
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Learning Goals */}
            <section id="learning-goals" className="bg-white shadow-lg rounded-xl p-6">
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
          </div>
        </div>
      </main>

      {/* Toast Notifications Container */}
      <div className="fixed bottom-6 left-6 z-50">
        {/* Add toast notifications here */}
      </div>
    </div>
  );
}

// Utility components
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    {/* Add skeleton structure */}
  </div>
);

const ToastNotification = ({ message, type }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 flex items-center gap-3 
    transform transition-all duration-300 hover:shadow-xl">
    {/* Add toast notification structure */}
  </div>
);

const Tooltip = ({ children, content }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
      hidden group-hover:block z-50">
      <div className="bg-gray-900 text-white text-sm rounded-lg py-1 px-2 whitespace-nowrap">
        {content}
      </div>
    </div>
  </div>
);
