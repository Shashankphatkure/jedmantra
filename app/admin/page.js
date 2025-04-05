'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  UsersIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { name: "Total Users", value: "0", icon: UsersIcon, color: "blue", change: "0%", isIncrease: true },
    { name: "Active Jobs", value: "0", icon: BriefcaseIcon, color: "green", change: "0%", isIncrease: true },
    { name: "Total Courses", value: "0", icon: AcademicCapIcon, color: "purple", change: "0%", isIncrease: true },
    { name: "Revenue", value: "₹0", icon: CurrencyDollarIcon, color: "yellow", change: "0%", isIncrease: true },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch users count
        const { count: usersCount, error: usersError } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });

        if (usersError) throw usersError;

        // Fetch active jobs count
        const { count: jobsCount, error: jobsError } = await supabase
          .from('jobs')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Open');

        if (jobsError) throw jobsError;

        // Fetch courses count
        const { count: coursesCount, error: coursesError } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true });

        if (coursesError) throw coursesError;

        // Calculate revenue (this is a simplified example)
        // In a real app, you would have a more complex calculation based on enrollments or orders
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('course_id');

        if (enrollmentsError) throw enrollmentsError;

        // Assuming each enrollment is worth ₹5000 on average
        const revenue = enrollments ? enrollments.length * 5000 : 0;

        // Update stats with real data
        setStats([
          {
            name: "Total Users",
            value: usersCount.toLocaleString(),
            icon: UsersIcon,
            color: "blue",
            change: "+12%",
            isIncrease: true
          },
          {
            name: "Active Jobs",
            value: jobsCount.toLocaleString(),
            icon: BriefcaseIcon,
            color: "green",
            change: "+5%",
            isIncrease: true
          },
          {
            name: "Total Courses",
            value: coursesCount.toLocaleString(),
            icon: AcademicCapIcon,
            color: "purple",
            change: "+8%",
            isIncrease: true
          },
          {
            name: "Revenue",
            value: `₹${revenue.toLocaleString()}`,
            icon: CurrencyDollarIcon,
            color: "yellow",
            change: "+15%",
            isIncrease: true
          },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="mt-2 text-blue-100">
                Welcome to your admin dashboard
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                <ChartBarIcon className="w-5 h-5 mr-2" />
                Generate Report
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
            >
              <div className="flex items-center">
                <div className={`bg-${item.color}-100 rounded-lg p-3`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-500">{item.name}</p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-semibold text-gray-900">
                      {item.value}
                    </p>
                    <div className={`flex items-center ${item.isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                      {item.isIncrease ? (
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 mr-1" />
                      )}
                      <span className="text-xs font-medium">{item.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Management */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Pending Approvals */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Pending Approvals
              </h3>
              <div className="mt-4 space-y-4">
                {[
                  {
                    type: "Job Post",
                    title: "Senior React Developer",
                    company: "Tech Co",
                  },
                  {
                    type: "Course",
                    title: "Advanced Python Programming",
                    author: "Jane Doe",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.type} by {item.company || item.author}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700">
                        Approve
                      </button>
                      <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reports */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Reports
              </h3>
              <div className="mt-4 space-y-4">
                {[
                  {
                    type: "User",
                    reason: "Inappropriate behavior",
                    reporter: "Admin",
                  },
                  {
                    type: "Content",
                    reason: "Spam content",
                    reporter: "User",
                  },
                ].map((item) => (
                  <div
                    key={item.reason}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.type} Report
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.reason} reported by {item.reporter}
                      </p>
                    </div>
                    <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
