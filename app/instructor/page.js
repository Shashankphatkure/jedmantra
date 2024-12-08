'use client';

import {
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  StarIcon,
  ArrowRightIcon,
  VideoCameraIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function InstructorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome back, John Smith
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Track your course performance and engage with your students
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Students",
                  value: "1,234",
                  change: "+12%",
                  icon: UserGroupIcon,
                },
                {
                  label: "Total Revenue",
                  value: "₹12,345",
                  change: "+8.2%",
                  icon: CurrencyDollarIcon,
                },
                {
                  label: "Course Rating",
                  value: "4.8/5.0",
                  change: "+0.3",
                  icon: StarIcon,
                },
                {
                  label: "Active Courses",
                  value: "8",
                  change: "+2",
                  icon: VideoCameraIcon,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-emerald-400 text-sm mt-1">
                        {stat.change} this month
                      </p>
                    </div>
                    <stat.icon className="h-12 w-12 text-white/80" />
                  </div>
                </div>
              ))}
            </div>

            {/* New Withdrawal Section - Centered */}
            <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 ">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Available for Withdrawal</h3>
                <p className="text-3xl font-bold text-white mb-4">₹2,450</p>
                <button
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors mb-4"
                  onClick={() => {/* Add withdrawal logic */}}
                >
                  Request Withdraw Amount
                </button>
                <p className="text-white/80 text-sm">
                  Note: You can withdraw the amount only if more than ₹1000 is available.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "Create New Course",
              description: "Start building your next course and share your knowledge",
              icon: AcademicCapIcon,
              href: "/instructor/courses/create",
              color: "blue",
            },
            {
              title: "View Analytics",
              description: "Track your performance and student engagement",
              icon: ChartBarIcon,
              href: "/instructor/analytics",
              color: "purple",
            },
            {
              title: "Manage Reviews",
              description: "Respond to student feedback and maintain quality",
              icon: StarIcon,
              href: "/instructor/reviews",
              color: "pink",
            },
          ].map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`inline-flex p-4 rounded-xl bg-${action.color}-100 text-${action.color}-600 mb-6`}>
                <action.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 mb-4">{action.description}</p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                Get Started
                <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity & Popular Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Continue with your existing Recent Activity and Popular Courses sections,
              but update their styling to match the new design */}
        </div>
      </div>
    </div>
  );
}
