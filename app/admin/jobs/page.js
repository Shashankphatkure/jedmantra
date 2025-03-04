'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  MagnifyingGlassIcon,
  BriefcaseIcon,
  UsersIcon,
  CurrencyPoundIcon,
  BuildingOfficeIcon,
  PlusIcon,
  MapPinIcon,
  ClockIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isDeleting, setIsDeleting] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Format currency in Indian format (INR)
  const formatIndianCurrency = (amount) => {
    if (!amount) return '—';
    
    // Format number in Indian style (with commas at thousands, lakhs, crores)
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
    
    return formatter.format(amount);
  };

  // Fetch jobs with recruiters
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        job_recruiters (
          recruiter: recruiters (
            id,
            first_name,
            last_name,
            avatar_url,
            title,
            company
          )
        )
      `)
      .order('posted_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      return;
    }

    setJobs(data);
    setFilteredJobs(data);
  };

  // Handle search
  useEffect(() => {
    const results = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(results);
  }, [searchTerm, jobs]);

  // Delete job
  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        // First delete from job_recruiters
        const { error: relError } = await supabase
          .from('job_recruiters')
          .delete()
          .eq('job_id', jobId);

        if (relError) throw relError;

        // Then delete the job
        const { error } = await supabase
          .from('jobs')
          .delete()
          .eq('id', jobId);

        if (error) throw error;

        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        setFilteredJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        alert('Job deleted successfully');
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Error deleting job. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Calculate stats
  const openJobs = filteredJobs.filter(job => job.status === 'Open').length;
  const avgSalary = filteredJobs.reduce((sum, job) => 
    sum + ((job.salary_min + job.salary_max) / 2 || 0), 0) / filteredJobs.length;
  const remoteJobs = filteredJobs.filter(job => job.is_remote).length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Job Management</h1>
              <p className="mt-2 text-indigo-100">
                Manage and monitor all job listings in one place
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors">
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                Export
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                <PlusIcon className="w-5 h-5 mr-2" />
                Post Job
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            {
              name: "Total Jobs",
              stat: jobs.length,
              icon: BriefcaseIcon,
              color: "indigo",
            },
            {
              name: "Open Positions",
              stat: openJobs,
              icon: UsersIcon,
              color: "green",
            },
            {
              name: "Average Salary",
              stat: `£${Math.round(avgSalary).toLocaleString()}`,
              icon: CurrencyPoundIcon,
              color: "yellow",
            },
            {
              name: "Remote Jobs",
              stat: remoteJobs,
              icon: BuildingOfficeIcon,
              color: "purple",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* ... Stats card content (same structure as courses) ... */}
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4 sm:w-auto">
                <select className="min-w-[160px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg">
                  <option>All Types</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
                <select className="min-w-[160px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg">
                  <option>All Status</option>
                  <option>Open</option>
                  <option>Closed</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Level
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.company_name}</div>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <MapPinIcon className="w-3 h-3 mr-1" />
                            {job.location}
                            {job.is_remote && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Remote
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.job_type}</div>
                      <div className="text-sm text-gray-500">{job.experience_level}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatIndianCurrency(job.salary_min)} - {formatIndianCurrency(job.salary_max)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.posted_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => {/* Handle edit */}}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteJob(job.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results Message */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              No jobs found matching your search criteria
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          {/* ... Pagination content (same as courses) ... */}
        </div>
      </div>
    </div>
  );
}
