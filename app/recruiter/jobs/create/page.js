import Image from "next/image";
import Link from "next/link";

export default function CreateJob() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/logo.svg"
                  alt="JedMantra Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <nav className="hidden md:ml-6 md:flex space-x-8">
                <Link
                  href="/recruiter/dashboard"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/recruiter/jobs"
                  className="text-blue-600 hover:text-blue-700 px-3 py-2 text-sm font-medium"
                >
                  Jobs
                </Link>
                <Link
                  href="/recruiter/candidates"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                >
                  Candidates
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <button className="ml-4 relative flex-shrink-0 p-1 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="ml-4 relative flex items-center">
                <Image
                  src="/avatar.jpg"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="ml-2 text-gray-700">Tech Company Ltd</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Post a New Job
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Fill in the details below to create your job posting.
                  </p>

                  <form className="mt-6 space-y-8">
                    {/* Basic Information */}
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        Basic Information
                      </h2>
                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Job Title
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="title"
                              id="title"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="e.g., Senior Software Engineer"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Job Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="description"
                              name="description"
                              rows={6}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="Describe the role, responsibilities, and ideal candidate"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="department"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Department
                          </label>
                          <select
                            id="department"
                            name="department"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option>Engineering</option>
                            <option>Design</option>
                            <option>Product</option>
                            <option>Marketing</option>
                            <option>Sales</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="e.g., London, UK"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        Requirements
                      </h2>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label
                            htmlFor="experience"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Experience Level
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option>Entry Level</option>
                            <option>Mid Level</option>
                            <option>Senior Level</option>
                            <option>Lead</option>
                            <option>Executive</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="skills"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Required Skills
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="skills"
                              id="skills"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="e.g., React, Node.js, TypeScript"
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Separate skills with commas
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="education"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Education
                          </label>
                          <select
                            id="education"
                            name="education"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option>High School</option>
                            <option>Bachelor's Degree</option>
                            <option>Master's Degree</option>
                            <option>PhD</option>
                            <option>Not Required</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Employment Details */}
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        Employment Details
                      </h2>
                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                          <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Employment Type
                          </label>
                          <select
                            id="type"
                            name="type"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Temporary</option>
                            <option>Internship</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="schedule"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Schedule
                          </label>
                          <select
                            id="schedule"
                            name="schedule"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option>Monday to Friday</option>
                            <option>Weekends</option>
                            <option>Flexible</option>
                            <option>Shifts</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="salary-min"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Salary Range (Min)
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                £
                              </span>
                            </div>
                            <input
                              type="text"
                              name="salary-min"
                              id="salary-min"
                              className="block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0.00"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                GBP
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="salary-max"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Salary Range (Max)
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                £
                              </span>
                            </div>
                            <input
                              type="text"
                              name="salary-max"
                              id="salary-max"
                              className="block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0.00"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                GBP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {/* Company Information */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Company Information
                  </h2>
                  <div className="mt-4">
                    <div className="aspect-w-3 aspect-h-2">
                      <div className="flex items-center justify-center bg-gray-100 rounded-lg">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                          Upload Company Logo
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="company-description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="company-description"
                          name="company-description"
                          rows={4}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Tell candidates about your company"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screening Questions */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Screening Questions
                  </h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label
                        htmlFor="question"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Add Question
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="question"
                          id="question"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="e.g., Do you have experience with React?"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Question
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="space-y-4">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Post Job
                    </button>
                    <button
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save as Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
