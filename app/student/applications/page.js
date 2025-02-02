"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, MagnifyingGlassIcon, MapPinIcon, BriefcaseIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';

const statusColors = {
  Interview: { bg: "bg-green-100", text: "text-green-800" },
  Open: { bg: "bg-blue-100", text: "text-blue-800" },
  Offer: { bg: "bg-purple-100", text: "text-purple-800" },
  Rejected: { bg: "bg-red-100", text: "text-red-800" }
};

export default function StudentApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [stats, setStats] = useState({
    totalApplications: 0,
    activeApplications: 0,
    interviews: 0,
    responseRate: 0
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          id,
          status,
          created_at,
          jobs (
            id,
            title,
            company_name,
            location,
            job_type,
            salary_min,
            salary_max,
            salary_currency
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setApplications(data);
      calculateStats(data);
    } catch (error) {
      toast.error("Failed to load applications");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const active = data.filter(app => ['Open', 'Interview'].includes(app.status)).length;
    const interviews = data.filter(app => app.status === 'Interview').length;
    const responseRate = total 
      ? Math.round((data.filter(app => app.status !== 'Open').length / total) * 100)
      : 0;

    setStats({
      totalApplications: total,
      activeApplications: active,
      interviews,
      responseRate
    });
  };

  const filteredApplications = applications
    .filter(app => {
      const matchesSearch = app.jobs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.jobs.company_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

  const StatCard = ({ title, value, subtext, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <dt className="text-sm font-medium text-gray-500 truncate mb-2">
        {title}
      </dt>
      <dd>
        <div className={`text-3xl font-bold text-${color}-600 mb-2`}>
          {value}
        </div>
        <div className="text-sm text-gray-600">
          {subtext}
        </div>
      </dd>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-64" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-32" />
            ))}
          </div>
          <div className="bg-white rounded-xl h-20 mb-8" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-40" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              Your Job Applications
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Track and manage your job applications in one place
            </p>
            <div className="flex gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white 
                  font-medium rounded-lg hover:bg-white/10 transition-colors group"
              >
                Browse New Jobs
                <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/savedjobs"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white 
                  font-medium rounded-lg hover:bg-white/10 transition-colors group"
              >
                Saved Jobs
                <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 
          bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 
          bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <StatCard
            title="Total Applications"
            value={stats.totalApplications}
            subtext={`${applications.filter(app => {
              const oneMonthAgo = new Date();
              oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
              return new Date(app.created_at) > oneMonthAgo;
            }).length} this month`}
            color="blue"
          />
          <StatCard
            title="Active Applications"
            value={stats.activeApplications}
            subtext={`${stats.interviews} interviews scheduled`}
            color="green"
          />
          <StatCard
            title="Interviews"
            value={stats.interviews}
            subtext="Upcoming interviews"
            color="purple"
          />
          <StatCard
            title="Response Rate"
            value={`${stats.responseRate}%`}
            subtext="Based on status updates"
            color="pink"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 
                  focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-48 pl-4 pr-10 py-3 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option>All</option>
              <option>Open</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          {filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto h-24 w-24 text-gray-400">
                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No applications found</h3>
              <p className="mt-2 text-gray-500">
                {searchTerm || statusFilter !== "All" 
                  ? "Try adjusting your filters"
                  : "Start applying to jobs to track your applications"}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <li key={application.id} className="group">
                  <div className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-pink-600 
                          transition-colors">
                          {application.jobs.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {application.jobs.company_name}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm 
                        font-medium ${statusColors[application.status].bg} 
                        ${statusColors[application.status].text}`}>
                        {application.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                        {application.jobs.job_type}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                        {application.jobs.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                        Applied {new Date(application.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-4">
                      <Link
                        href={`/applications/${application.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent 
                          text-sm font-medium rounded-lg text-white bg-pink-600 
                          hover:bg-pink-700 transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        className="inline-flex items-center px-4 py-2 border border-gray-300 
                          text-sm font-medium rounded-lg text-gray-700 bg-white 
                          hover:bg-gray-50 transition-colors"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
