'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  StarIcon,
  ArrowRightIcon,
  VideoCameraIcon,
  ClockIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

export default function InstructorDashboard() {
  const [instructor] = useState({
    id: "123e4567-e89b-12d3-a456-426614174000",
    first_name: "John",
    last_name: "Smith",
    title: "Senior Software Instructor",
    specialization: "Web Development",
    email: "john.smith@example.com",
    avatar_url: "/avatars/john.jpg",
    is_online: true,
    response_rate: 98.5,
    avg_response_time: 60,
    current_courses_count: 8,
    location: "San Francisco, CA",
    performance_metrics: {
      student_satisfaction: 4.8,
      total_students: 1234,
      completion_rate: 85,
      total_revenue: 12345
    }
  });

  const [stats] = useState([
    { name: "Active Courses", stat: "8", icon: VideoCameraIcon },
    { name: "Total Students", stat: "1,234", icon: UserGroupIcon },
    { name: "Course Rating", stat: "4.8", icon: StarIcon },
    { name: "Total Revenue", stat: "₹12,345", icon: CurrencyDollarIcon },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:60px_60px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Welcome back, {instructor.first_name}! 👋
              </h1>
              <p className="mt-2 text-xl text-white/90">
                Track your course performance and engage with your students
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-4">
              <Link
                href="/instructor/courses/create"
                className="inline-flex items-center px-6 py-3 border-2 border-white rounded-lg text-white hover:bg-white/10 transition-colors font-medium group"
              >
                Create New Course
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Enhanced Instructor Profile Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-xl">
          <div className="p-8">
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="relative group">
                  <Image
                    src={instructor.avatar_url}
                    alt={`${instructor.first_name} ${instructor.last_name}`}
                    width={120}
                    height={120}
                    className="rounded-xl object-cover ring-4 ring-white shadow-lg"
                  />
                  <div className={`absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white ${instructor.is_online ? 'bg-green-400' : 'bg-gray-300'}`} />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {instructor.first_name} {instructor.last_name}
                    </h3>
                    <div className="mt-1 flex items-center space-x-4">
                      <p className="text-gray-600">{instructor.title}</p>
                      <span className="text-gray-300">•</span>
                      <p className="text-gray-600">{instructor.specialization}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      View Profile
                    </button>
                    <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <StarIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{instructor.performance_metrics.student_satisfaction}</p>
                        <p className="text-sm text-gray-500">Rating</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <UserGroupIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{instructor.performance_metrics.total_students}</p>
                        <p className="text-sm text-gray-500">Students</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <ChartBarIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{instructor.performance_metrics.completion_rate}%</p>
                        <p className="text-sm text-gray-500">Completion</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">₹{instructor.performance_metrics.total_revenue}</p>
                        <p className="text-sm text-gray-500">Revenue</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {instructor.email}
                  </div>
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {instructor.location}
                  </div>
                  <div className="flex items-center">
                    <VideoCameraIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {instructor.current_courses_count} Active Courses
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Available for Withdrawal</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">₹2,450</p>
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors mb-4">
              Request Withdrawal
            </button>
            <p className="text-gray-500 text-sm">
              Note: Minimum withdrawal amount is ₹1,000
            </p>
          </div>
        </div>

        {/* Your existing Quick Actions and Recent Activity sections can go here */}
      </main>
    </div>
  );
}
