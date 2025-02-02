"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { 
  BriefcaseIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  UserPlusIcon,
  ClockIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function RecruiterDashboard() {
  const [recruiter, setRecruiter] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

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

  useEffect(() => {
    async function getRecruiterProfile() {
      try {
        // Get the current logged in user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        // Fetch the recruiter profile for this user
        const { data: recruiterData, error: recruiterError } = await supabase
          .from('recruiters')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (recruiterError) throw recruiterError;

        setRecruiter({
          ...recruiterData,
          performance_metrics: {
            hire_rate: 78,
            candidate_satisfaction: 4.8,
            time_to_hire: 25,
            active_candidates: 156
          }
        });
      } catch (error) {
        console.error('Error fetching recruiter profile:', error);
      } finally {
        setLoading(false);
      }
    }

    getRecruiterProfile();
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!recruiter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">No Recruiter Profile Found</h2>
          <p className="mt-2 text-gray-600">Please complete your profile setup to continue.</p>
          <Link
            href="/recruiter/profile/setup"
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
          >
            Setup Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:60px_60px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Welcome back, {recruiter.first_name}! 👋
              </h1>
              <p className="mt-2 text-xl text-white/90">
                Here's what's happening with your recruitment pipeline
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-4">
              <Link
                href="/recruiter/company"
                className="inline-flex items-center px-6 py-3 border-2 border-white rounded-lg text-white hover:bg-white/10 transition-colors font-medium group"
              >
                View Company
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
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
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Enhanced Recruiter Profile Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-xl">
          <div className="p-8">
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="relative group">
                  <Image
                    src={recruiter.avatar_url}
                    alt={`${recruiter.first_name} ${recruiter.last_name}`}
                    width={120}
                    height={120}
                    className="rounded-xl object-cover ring-4 ring-white shadow-lg"
                  />
                  <div className={`absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white ${recruiter.is_online ? 'bg-green-400' : 'bg-gray-300'}`} />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {recruiter.first_name} {recruiter.last_name}
                    </h3>
                    <div className="mt-1 flex items-center space-x-4">
                      <p className="text-gray-600">{recruiter.title}</p>
                      <span className="text-gray-300">•</span>
                      <p className="text-gray-600">{recruiter.company}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      View Profile
                    </button>
                    <button className="px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg text-sm font-medium transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-pink-100 rounded-lg">
                        <StarIcon className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{recruiter.performance_metrics.hire_rate}%</p>
                        <p className="text-sm text-gray-500">Hire Rate</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <ChartBarIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{recruiter.performance_metrics.candidate_satisfaction}</p>
                        <p className="text-sm text-gray-500">Satisfaction</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <ClockIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{recruiter.performance_metrics.time_to_hire}d</p>
                        <p className="text-sm text-gray-500">Time to Hire</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <UserGroupIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{recruiter.performance_metrics.active_candidates}</p>
                        <p className="text-sm text-gray-500">Active Candidates</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {recruiter.email}
                  </div>
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {recruiter.office_location}
                  </div>
                  <div className="flex items-center">
                    <DocumentCheckIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {recruiter.current_hiring_count} Active Positions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
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
              className="relative rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-200 hover:-translate-y-1 mb-8"
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
