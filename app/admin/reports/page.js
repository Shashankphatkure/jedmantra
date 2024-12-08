'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function AdminReports() {
  const [reports] = useState([
    {
      id: 1,
      name: "Revenue Report",
      description: "Monthly revenue breakdown by courses and categories",
      lastGenerated: "2 hours ago",
      frequency: "Monthly",
      status: "Generated",
      type: "Financial",
    },
    {
      id: 2,
      name: "User Activity Report",
      description: "User engagement and activity metrics",
      lastGenerated: "1 day ago",
      frequency: "Weekly",
      status: "Pending",
      type: "Analytics",
    },
    {
      id: 3,
      name: "Course Performance",
      description: "Course completion rates and student progress",
      lastGenerated: "3 days ago",
      frequency: "Weekly",
      status: "Generated",
      type: "Performance",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Reports</h1>
              <p className="mt-2 text-green-100">
                Generate and manage system reports
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
                <ChartBarIcon className="w-5 h-5 mr-2" />
                Generate Report
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                Export All
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reports Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      Last generated: {report.lastGenerated}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ArrowPathIcon className="h-4 w-4 mr-1" />
                      Frequency: {report.frequency}
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${report.status === 'Generated' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {report.status}
                </span>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                  View Details
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
