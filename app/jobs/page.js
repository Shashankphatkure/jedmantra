import Image from "next/image";
import Link from "next/link";

export default function Jobs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}

      {/* Search Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Job title, keyword, or company"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="City, state, or remote"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              {/* Date Posted */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Date Posted</h4>
                <div className="space-y-2">
                  {[
                    "Last 24 hours",
                    "Last 3 days",
                    "Last 7 days",
                    "Last 14 days",
                    "Last 30 days",
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="date"
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type */}
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
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
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

          {/* Job Listings */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Showing 1,205 jobs</p>
              <select className="border border-gray-300 rounded-md px-3 py-1.5">
                <option>Most relevant</option>
                <option>Newest first</option>
                <option>Highest paid</option>
                <option>Closest to you</option>
              </select>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((job) => (
                <div
                  key={job}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                        <Link href={`/jobs/${job}`}>
                          Senior Software Engineer
                        </Link>
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Tech Company Ltd • London
                      </p>
                      <div className="mt-2 space-y-2">
                        <p className="text-gray-600">
                          £65,000 - £85,000 a year
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Full-time
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Remote
                          </span>
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
                      We are looking for a Senior Software Engineer to join our
                      growing team. You will be responsible for developing and
                      maintaining our core products...
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Posted 2 days ago</span>
                      <span>•</span>
                      <span>45 applicants</span>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
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
