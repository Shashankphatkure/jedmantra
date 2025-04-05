'use client';

import Link from 'next/link';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function CategoriesIndex() {
  const categoryTypes = [
    {
      name: 'Course Categories',
      description: 'Manage categories for courses and learning materials',
      icon: AcademicCapIcon,
      color: 'blue',
      href: '/admin/categories/courses',
      count: '4+',
    },
    {
      name: 'Job Categories',
      description: 'Manage categories for job listings and opportunities',
      icon: BriefcaseIcon,
      color: 'green',
      href: '/admin/categories/jobs',
      count: '5+',
    },
    {
      name: 'Internship Categories',
      description: 'Manage categories for internship positions',
      icon: UserGroupIcon,
      color: 'purple',
      href: '/admin/categories/internships',
      count: '5+',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Categories Management</h1>
              <p className="mt-2 text-gray-300">
                Manage categories for courses, jobs, and internships
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTypes.map((type) => (
            <Link
              key={type.name}
              href={type.href}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className={`bg-${type.color}-500 h-2`}></div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`bg-${type.color}-100 rounded-lg p-3`}>
                    <type.icon className={`h-6 w-6 text-${type.color}-600`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{type.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                  </div>
                  <div className={`bg-${type.color}-100 text-${type.color}-800 text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                    {type.count}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <span className={`inline-flex items-center text-${type.color}-600 text-sm font-medium`}>
                    Manage
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
