"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  AcademicCapIcon, 
  ClockIcon, 
  BookOpenIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function Progress() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

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
      category: "development"
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
      category: "marketing"
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
      category: "data"
    },
  ];

  const stats = [
    { 
      name: "Total Learning Hours", 
      value: "42", 
      icon: ClockIcon, 
      color: "blue",
      trend: "+12% vs last week"
    },
    { name: "Courses in Progress", value: "3", icon: BookOpenIcon, color: "pink" },
    { name: "Completed Courses", value: "2", icon: CheckCircleIcon, color: "green" },
    { name: "Average Score", value: "88%", icon: ChartBarIcon, color: "purple" },
  ];

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-48 bg-indigo-100 mb-8" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 h-32" />
          ))}
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 h-40" />
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-indigo-800/20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <SparklesIcon className="h-5 w-5 text-indigo-200 mr-2" />
              <span className="text-sm text-white">Keep up the great work!</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Learning Progress
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Track your learning journey and achievements. Stay motivated and reach your goals!
            </p>
            
            {/* Enhanced Timeframe Selector */}
            <div className="inline-flex rounded-lg p-1 bg-white/10 backdrop-blur-sm">
              {["week", "month", "year"].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${selectedTimeframe === timeframe 
                      ? "bg-white text-indigo-600" 
                      : "text-white hover:bg-white/10"}`}
                >
                  This {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-3 rounded-xl bg-${stat.color}-50 
                  ring-4 ring-${stat.color}-50/50`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  {stat.trend && (
                    <p className="mt-1 text-sm font-medium text-green-600 flex items-center">
                      <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                      {stat.trend}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Categories */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Course Progress
          </h2>
          <div className="flex gap-2">
            {["all", "development", "marketing", "data"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeTab === tab 
                    ? "bg-indigo-600 text-white" 
                    : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Course Progress */}
        <div className="space-y-6">
          {courses
            .filter(course => activeTab === "all" || course.category === activeTab)
            .map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md 
                transition-all duration-200 group"
            >
              <div className="flex items-start gap-6">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={course.image}
                    alt={course.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 
                      transition-colors duration-200">
                      {course.name}
                    </h3>
                    <span className="text-lg font-semibold text-indigo-600">
                      {course.progress}%
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4">
                    Instructor: {course.instructor}
                  </p>

                  <div className="mb-4 relative">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${course.progress}%` }}
                        className="h-full bg-indigo-600 rounded-full 
                          transition-all duration-500 ease-out"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
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
                      <span className="truncate" title={course.nextMilestone}>
                        Next: {course.nextMilestone}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 
                      font-medium inline-flex items-center group">
                      Continue Learning
                      <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 
                        transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
