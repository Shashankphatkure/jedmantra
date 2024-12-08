import Image from "next/image";
import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Jobs() {
  const supabase = createServerComponentClient({ cookies })
  const { data: jobs } = await supabase
    .from('jobs')
    .select(`
      *,
      job_recruiters (
        recruiters (
          first_name,
          last_name,
          avatar_url,
          response_rate
        )
      )
    `)
    .eq('status', 'Open')
    .order('posted_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section - Updated with gradient background */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Discover thousands of job opportunities with new positions added
            daily
          </p>

          {/* Search Form - Updated styling */}
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Added decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Updated Filters Sidebar */}
          <div className="lg:w-72 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Clear All
                </button>
              </div>

              {/* Updated filter sections with counts and hover states */}
              <div className="space-y-8">
                {/* Date Posted - converted to modern style */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Date Posted
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: "Last 24 hours", count: 156 },
                      { name: "Last 3 days", count: 284 },
                      { name: "Last 7 days", count: 542 },
                      { name: "Last 14 days", count: 864 },
                      { name: "Last 30 days", count: 1205 },
                    ].map((option) => (
                      <label
                        key={option.name}
                        className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="date"
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                            {option.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {option.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Job Type - similar updates for other filter sections */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Job Type</h4>
                  <div className="space-y-2">
                    {[
                      "Full-time",
                      "Part-time",
                      "Contract",
                      "Temporary",
                      "Internship",
                    ].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Salary Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Salary Range</h4>
                  <div className="space-y-2">
                    {[
                      "£0 - £20,000",
                      "£20,000 - £30,000",
                      "£30,000 - £50,000",
                      "£50,000 - £70,000",
                      "£70,000+",
                    ].map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <h4 className="font-medium mb-2">Experience Level</h4>
                  <div className="space-y-2">
                    {[
                      "Entry Level",
                      "Mid Level",
                      "Senior Level",
                      "Director",
                      "Executive",
                    ].map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings - Updated to use real data */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">1,205</span> jobs
              </p>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Most relevant</option>
                <option>Newest first</option>
                <option>Highest paid</option>
                <option>Closest to you</option>
              </select>
            </div>

            {/* Updated Job Cards */}
            <div className="space-y-6">
              {jobs?.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                        <Link href={`/jobs/${job.id}`}>
                          {job.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {job.company_name} • {job.location}
                      </p>
                      <div className="mt-2 space-y-2">
                        {(job.salary_min || job.salary_max) && (
                          <p className="text-gray-600">
                            {job.salary_currency} {job.salary_min?.toLocaleString()} - {job.salary_max?.toLocaleString()} a year
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {job.job_type}
                          </span>
                          {job.is_remote && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Remote
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Posted {new Date(job.posted_at).toLocaleDateString()}</span>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </a>
                {[1, 2, 3, 4, 5].map((page) => (
                  <a
                    key={page}
                    href="#"
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      page === 1
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </a>
                ))}
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
