"use client";

import { useState } from "react";
import Link from "next/link";

export default function RecruiterDashboard() {
  const [stats] = useState([
    { name: "Active Jobs", stat: "12", change: "+2%", changeType: "increase" },
    {
      name: "Total Applications",
      stat: "156",
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Time to Hire (avg)",
      stat: "24 days",
      change: "-5%",
      changeType: "decrease",
    },
    {
      name: "Interview Rate",
      stat: "68%",
      change: "+4%",
      changeType: "increase",
    },
  ]);

  const [recentActivity] = useState([
    {
      id: 1,
      type: "application",
      candidate: "Sarah Wilson",
      position: "Senior Software Engineer",
      time: "2 hours ago",
      status: "New Application",
    },
    {
      id: 2,
      type: "interview",
      candidate: "Michael Brown",
      position: "Product Designer",
      time: "4 hours ago",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      type: "offer",
      candidate: "Emily Davis",
      position: "Marketing Manager",
      time: "1 day ago",
      status: "Offer Sent",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Overview
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Track your recruitment metrics and recent activities
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                href="/recruiter/jobs/create"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Post New Job
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.name}
                className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
              >
                <dt>
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </p>
                </dt>
                <dd className="mt-1">
                  <p className="text-3xl font-semibold text-gray-900">
                    {item.stat}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      item.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.change}
                  </p>
                </dd>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h2>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            {activity.candidate}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {activity.status}
                            </p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 text-sm text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {activity.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/recruiter/jobs"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Manage Jobs</p>
                <p className="text-sm text-gray-500">
                  View and manage all job postings
                </p>
              </div>
            </Link>

            <Link
              href="/recruiter/candidates"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  View Candidates
                </p>
                <p className="text-sm text-gray-500">
                  Review all candidate applications
                </p>
              </div>
            </Link>

            <Link
              href="/recruiter/analytics"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Analytics</p>
                <p className="text-sm text-gray-500">
                  View recruitment metrics and reports
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
