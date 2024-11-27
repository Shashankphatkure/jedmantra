"use client";

import { useState } from "react";

export default function Progress() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  const courses = [
    {
      id: 1,
      name: "Web Development Fundamentals",
      progress: 75,
      hoursSpent: 24,
      lastAccessed: "2024-02-10",
      nextMilestone: "Complete Module 5: Advanced CSS",
    },
    {
      id: 2,
      name: "Digital Marketing Essentials",
      progress: 45,
      hoursSpent: 12,
      lastAccessed: "2024-02-09",
      nextMilestone: "Submit Social Media Strategy Assignment",
    },
    {
      id: 3,
      name: "Data Science Basics",
      progress: 15,
      hoursSpent: 6,
      lastAccessed: "2024-02-08",
      nextMilestone: "Complete Python Fundamentals Quiz",
    },
  ];

  const stats = [
    { name: "Total Learning Hours", value: "42" },
    { name: "Courses in Progress", value: "3" },
    { name: "Completed Courses", value: "2" },
    { name: "Average Score", value: "88%" },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">My Progress</h1>
          <div className="flex items-center space-x-2">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
              >
                <dt>
                  <div className="absolute bg-indigo-500 rounded-md p-3">
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
                    {stat.name}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Course Progress */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Course Progress</h2>
          <div className="mt-4 space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {course.name}
                  </h3>
                  <span className="text-sm font-medium text-gray-500">
                    {course.progress}%
                  </span>
                </div>
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${course.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Hours Spent
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {course.hoursSpent} hours
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Last Accessed
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {course.lastAccessed}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Next Milestone
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {course.nextMilestone}
                    </p>
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
