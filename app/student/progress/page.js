"use client";

import { useState } from "react";
import { 
  AcademicCapIcon, 
  ClockIcon, 
  BookOpenIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

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
      image: "https://via.placeholder.com/150",
      instructor: "Sarah Johnson",
    },
    {
      id: 2,
      name: "Digital Marketing Essentials",
      progress: 45,
      hoursSpent: 12,
      lastAccessed: "2024-02-09",
      nextMilestone: "Submit Social Media Strategy Assignment",
      image: "https://via.placeholder.com/150",
      instructor: "John Smith",
    },
    {
      id: 3,
      name: "Data Science Basics",
      progress: 15,
      hoursSpent: 6,
      lastAccessed: "2024-02-08",
      nextMilestone: "Complete Python Fundamentals Quiz",
      image: "https://via.placeholder.com/150",
      instructor: "Emily Davis",
    },
  ];

  const stats = [
    { name: "Total Learning Hours", value: "42", icon: ClockIcon, color: "blue" },
    { name: "Courses in Progress", value: "3", icon: BookOpenIcon, color: "pink" },
    { name: "Completed Courses", value: "2", icon: CheckCircleIcon, color: "green" },
    { name: "Average Score", value: "88%", icon: ChartBarIcon, color: "purple" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Matching the design */}
      <div className="bg-[#4F46E5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Learning Progress
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Track your learning journey and achievements
            </p>
            
            {/* Timeframe Selector - Matching design */}
            <div className="inline-block">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-48 pl-4 pr-10 py-2 rounded-lg bg-white/20 text-white border-0 focus:ring-2 focus:ring-white/50"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid - Matching the design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white rounded-2xl shadow p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Progress - Matching the design */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Course Progress
          </h2>
          <div className="space-y-6">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl shadow p-6"
              >
                <div className="flex items-start gap-6">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {course.name}
                      </h3>
                      <span className="text-lg font-semibold text-[#4F46E5]">
                        {course.progress}%
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-4">
                      Instructor: {course.instructor}
                    </p>

                    <div className="mb-4">
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          style={{ width: `${course.progress}%` }}
                          className="h-full bg-[#4F46E5] rounded-full"
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{course.hoursSpent} hours spent</span>
                      </div>
                      <div className="flex items-center">
                        <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span>Last: {course.lastAccessed}</span>
                      </div>
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span>Next: {course.nextMilestone}</span>
                      </div>
                    </div>
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
