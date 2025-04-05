'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
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
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  const handleApprove = async (verification) => {
    try {
      // Update the verification status
      const tableName = verification.verificationType === 'instructor' ? 'instructor_verifications' : 'recruiter_verifications';

      const { error: updateError } = await supabase
        .from(tableName)
        .update({
          status: 'approved',
          verified_at: new Date().toISOString(),
        })
        .eq('id', verification.verificationId);

      if (updateError) throw updateError;

      // Update the user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          verification_status: 'verified',
          role: verification.verificationType,
        })
        .eq('id', verification.userId);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        toast.error('Error updating user profile');
        return;
      }

      // Update local state
      setPendingApprovals(prev => prev.filter(v => v.id !== verification.id));

      toast.success(`${verification.type} verification approved`);
    } catch (error) {
      console.error('Error approving verification:', error);
      toast.error('Failed to approve verification');
    }
  };

  const handleReject = async (verification) => {
    try {
      // Update the verification status
      const tableName = verification.verificationType === 'instructor' ? 'instructor_verifications' : 'recruiter_verifications';

      const { error: updateError } = await supabase
        .from(tableName)
        .update({
          status: 'rejected',
          verified_at: new Date().toISOString(),
        })
        .eq('id', verification.verificationId);

      if (updateError) throw updateError;

      // Update the user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          verification_status: 'rejected',
        })
        .eq('id', verification.userId);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        toast.error('Error updating user profile');
        return;
      }

      // Update local state
      setPendingApprovals(prev => prev.filter(v => v.id !== verification.id));

      toast.success(`${verification.type} verification rejected`);
    } catch (error) {
      console.error('Error rejecting verification:', error);
      toast.error('Failed to reject verification');
    }
  };

  const handleReviewReport = async (report) => {
    toast.success(`Reviewing report ID: ${report.id}`);
    // In a real implementation, you would navigate to a detailed report view
    // or open a modal with more information
  };

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Create tables if they don't exist
        await fetch('/api/admin/create-tables', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Fetch users count
        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (usersError) throw usersError;

        // Fetch active jobs count (if table exists)
        let jobsCount = 0;
        try {
          const { count, error } = await supabase
            .from('jobs')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'Open');

          if (!error) jobsCount = count;
        } catch (error) {
          console.log('Jobs table may not exist yet');
        }

        // Fetch courses count (if table exists)
        let coursesCount = 0;
        try {
          const { count, error } = await supabase
            .from('courses')
            .select('*', { count: 'exact', head: true });

          if (!error) coursesCount = count;
        } catch (error) {
          console.log('Courses table may not exist yet');
        }

        // Calculate revenue (mock data for now)
        const revenue = 25000;

        // Update stats with real data
        setStats([
          {
            name: "Total Users",
            value: usersCount ? usersCount.toLocaleString() : '0',
            icon: UsersIcon,
            color: "blue",
            change: "+12%",
            isIncrease: true
          },
          {
            name: "Active Jobs",
            value: jobsCount ? jobsCount.toLocaleString() : '0',
            icon: BriefcaseIcon,
            color: "green",
            change: "+5%",
            isIncrease: true
          },
          {
            name: "Total Courses",
            value: coursesCount ? coursesCount.toLocaleString() : '0',
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

        // Fetch pending verification requests
        try {
          // Try instructor verifications first
          const { data: instructorVerifications, error: instructorError } = await supabase
            .from('instructor_verifications')
            .select(`
              *,
              user:user_id (email, id)
            `)
            .eq('status', 'pending')
            .limit(5);

          // Try recruiter verifications
          const { data: recruiterVerifications, error: recruiterError } = await supabase
            .from('recruiter_verifications')
            .select(`
              *,
              user:user_id (email, id)
            `)
            .eq('status', 'pending')
            .limit(5);

          // Combine and format the verifications
          const formattedVerifications = [];

          if (instructorVerifications && !instructorError) {
            instructorVerifications.forEach(v => {
              formattedVerifications.push({
                id: v.id,
                type: 'Instructor',
                title: v.full_name,
                author: v.user?.email || 'Unknown',
                userId: v.user_id,
                verificationId: v.id,
                verificationType: 'instructor'
              });
            });
          }

          if (recruiterVerifications && !recruiterError) {
            recruiterVerifications.forEach(v => {
              formattedVerifications.push({
                id: v.id,
                type: 'Recruiter',
                title: v.full_name,
                company: v.company_name,
                userId: v.user_id,
                verificationId: v.id,
                verificationType: 'recruiter'
              });
            });
          }

          setPendingApprovals(formattedVerifications);
        } catch (error) {
          console.log('Verification tables may not exist yet');
        }

        // Fetch recent reports
        try {
          const { data: reports, error: reportsError } = await supabase
            .from('reports')
            .select(`
              *,
              reporter:reporter_id (email)
            `)
            .order('created_at', { ascending: false })
            .limit(5);

          if (reports && !reportsError) {
            const formattedReports = reports.map(report => ({
              id: report.id,
              type: report.reported_type,
              reason: report.reason,
              reporter: report.reporter?.email || 'Anonymous',
              reportId: report.id
            }));
            setRecentReports(formattedReports);
          }
        } catch (error) {
          console.log('Reports table may not exist yet');
        }
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
                {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : pendingApprovals.length === 0 ? (
                  <p className="text-sm text-gray-500 py-4">No pending approvals at this time.</p>
                ) : (
                  pendingApprovals.map((item) => (
                    <div
                      key={`${item.type}-${item.id}`}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.type} {item.company ? `from ${item.company}` : item.author ? `by ${item.author}` : ''}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(item)}
                          className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(item)}
                          className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
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
                {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : recentReports.length === 0 ? (
                  <p className="text-sm text-gray-500 py-4">No reports at this time.</p>
                ) : (
                  recentReports.map((item) => (
                    <div
                      key={item.id}
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
                      <button
                        onClick={() => handleReviewReport(item)}
                        className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                      >
                        Review
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
