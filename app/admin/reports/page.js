'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import {
  ChartBarIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function AdminReports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Revenue Report",
      description: "Monthly revenue breakdown by courses and categories",
      lastGenerated: "2 hours ago",
      frequency: "Monthly",
      status: "Generated",
      type: "Financial",
      icon: "CurrencyDollarIcon"
    },
    {
      id: 2,
      name: "User Activity Report",
      description: "User engagement and activity metrics",
      lastGenerated: "1 day ago",
      frequency: "Weekly",
      status: "Pending",
      type: "Analytics",
      icon: "UserGroupIcon"
    },
    {
      id: 3,
      name: "Course Performance",
      description: "Course completion rates and student progress",
      lastGenerated: "3 days ago",
      frequency: "Weekly",
      status: "Generated",
      type: "Performance",
      icon: "AcademicCapIcon"
    },
  ]);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  // Helper function to get the appropriate icon
  const getReportIcon = (iconName) => {
    switch (iconName) {
      case 'CurrencyDollarIcon':
        return CurrencyDollarIcon;
      case 'UserGroupIcon':
        return UserGroupIcon;
      case 'AcademicCapIcon':
        return AcademicCapIcon;
      default:
        return DocumentTextIcon;
    }
  };

  const generateReport = async (reportId) => {
    try {
      setLoading(true);

      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update report status
      const updatedReports = reports.map(report => {
        if (report.id === reportId) {
          return {
            ...report,
            status: 'Generated',
            lastGenerated: 'Just now'
          };
        }
        return report;
      });

      setReports(updatedReports);
      toast.success('Report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = (reportId) => {
    // Simulate download
    toast.success('Report download started');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Reports</h1>
              <p className="mt-2 text-blue-100">
                Generate and manage system reports
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                onClick={() => toast.success('Custom report builder coming soon!')}
              >
                <ChartBarIcon className="w-5 h-5 mr-2" />
                Create Custom Report
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {reports.map((report) => {
              const ReportIcon = getReportIcon(report.icon);
              return (
                <div
                  key={report.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <div className={`
                        p-3 rounded-lg mr-4
                        ${report.type === 'Financial' ? 'bg-green-100 text-green-700' : ''}
                        ${report.type === 'Analytics' ? 'bg-blue-100 text-blue-700' : ''}
                        ${report.type === 'Performance' ? 'bg-purple-100 text-purple-700' : ''}
                      `}>
                        <ReportIcon className="h-6 w-6" />
                      </div>
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
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${report.status === 'Generated' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => generateReport(report.id)}
                      disabled={loading}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChartBarIcon className="h-4 w-4 mr-1" />
                      Generate
                    </button>
                    {report.status === 'Generated' && (
                      <button
                        onClick={() => downloadReport(report.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
