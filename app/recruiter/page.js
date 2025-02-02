"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { 
  BriefcaseIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  UserPlusIcon 
} from "@heroicons/react/24/outline";

export default function RecruiterDashboard() {
  const [stats] = useState([
    { name: "Active Jobs", stat: "12", icon: BriefcaseIcon },
    { name: "Total Applications", stat: "156", icon: UserGroupIcon },
    { name: "Interviews Scheduled", stat: "24", icon: CalendarIcon },
    { name: "Hired Candidates", stat: "8", icon: UserPlusIcon },
  ]);

  const [recentJobs] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      applicants: 45,
      posted: "2d ago",
      status: "active",
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      applicants: 28,
      posted: "3d ago",
      status: "active",
    },
    {
      id: 3,
      title: "Marketing Manager",
      department: "Marketing",
      location: "San Francisco, CA",
      type: "Full-time",
      applicants: 34,
      posted: "5d ago",
      status: "active",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Recruiter Dashboard
              </h1>
              <p className="mt-2 text-xl text-white/90">
                Manage your job postings and track candidate applications
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                href="/recruiter/jobs/create"
                className="inline-flex items-center px-6 py-3 border-2 border-white rounded-lg text-white hover:bg-white/10 transition-colors font-medium group"
              >
                Post New Job
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-sm px-6 py-4 hover:shadow-xl transition-all duration-200 border border-gray-100 hover:border-pink-100"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-pink-50 text-pink-600">
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {item.stat}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Jobs */}
        <div className="mt-12">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-semibold text-gray-900">
                Recent Job Postings
              </h2>
              <p className="mt-2 text-gray-600">
                A list of all your recent job postings including their title,
                department, and status.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="overflow-hidden bg-white shadow-sm rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Job Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Applicants
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Posted
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {recentJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {job.title}
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          {job.type}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {job.department}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {job.location}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {job.applicants}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {job.posted}
                      </td>
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          href={`/recruiter/jobs/${job.id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 hover:underline"
                        >
                          View
                        </Link>
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4 hover:underline">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            {
              title: "View All Candidates",
              description: "Browse and manage all candidate applications",
              href: "/recruiter/candidates",
              gradient: "from-blue-500 to-blue-600",
            },
            {
              title: "Recruitment Analytics",
              description: "View detailed recruitment metrics and reports",
              href: "/recruiter/analytics",
              gradient: "from-purple-500 to-purple-600",
            },
          ].map((action, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-r ${action.gradient} p-8`}>
                <Link href={action.href} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-xl font-semibold text-white mb-2">
                    {action.title}
                  </p>
                  <p className="text-white/90">
                    {action.description}
                  </p>
                  <ArrowRightIcon className="h-6 w-6 text-white mt-4 group-hover:translate-x-2 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
