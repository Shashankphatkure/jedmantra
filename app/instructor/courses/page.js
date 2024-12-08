"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserGroupIcon,
  StarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function InstructorCourses() {
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the fundamentals of web development from scratch",
      thumbnail: "https://via.placeholder.com/400x250",
      students: 150,
      rating: 4.8,
      price: 99.99,
      status: "published",
      lastUpdated: "2024-02-15",
      category: "Development",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      description: "Master advanced JavaScript patterns and modern ES6+ features",
      thumbnail: "https://via.placeholder.com/400x250",
      students: 120,
      rating: 4.9,
      price: 149.99,
      status: "draft",
      lastUpdated: "2024-02-10",
      category: "Programming",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      description: "Complete guide to modern UI/UX design principles",
      thumbnail: "https://via.placeholder.com/400x250",
      students: 85,
      rating: 4.7,
      price: 129.99,
      status: "published",
      lastUpdated: "2024-02-08",
      category: "Design",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">My Courses</h1>
              <p className="text-xl text-white/90">
                Manage and track all your courses in one place
              </p>
            </div>
            <Link
              href="/instructor/courses/create"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-medium shadow-lg hover:bg-blue-50 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create New Course
            </Link>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <select className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Categories</option>
                <option>Development</option>
                <option>Design</option>
                <option>Business</option>
              </select>
              <select className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      course.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <UserGroupIcon className="h-5 w-5 text-gray-400 mr-1" />
                      <span className="text-gray-600">{course.students}</span>
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="text-gray-600">{course.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-1" />
                      <span className="text-gray-600">{course.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Last updated: {new Date(course.lastUpdated).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-green-50">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50">
                      <TrashIcon className="h-5 w-5" />
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
