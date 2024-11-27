import Image from "next/image";
import Link from "next/link";

export default function StudentApplications() {
  const applications = [
    {
      id: 1,
      company: "Tech Corp",
      position: "Senior React Developer",
      status: "Interview",
      appliedDate: "2024-01-15",
      logo: "https://via.placeholder.com/40",
      location: "London, UK",
      type: "Full-time",
      nextStep: "Technical Interview - Jan 20, 2024",
    },
    {
      id: 2,
      company: "Design Studio",
      position: "UX Designer",
      status: "Applied",
      appliedDate: "2024-01-10",
      logo: "https://via.placeholder.com/40",
      location: "Remote",
      type: "Contract",
      nextStep: "Awaiting response",
    },
    {
      id: 3,
      company: "Startup Inc",
      position: "Full Stack Developer",
      status: "Rejected",
      appliedDate: "2024-01-05",
      logo: "https://via.placeholder.com/40",
      location: "New York, USA",
      type: "Full-time",
      nextStep: null,
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Job Applications
          </h1>
          <Link
            href="/jobs"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse Jobs
          </Link>
        </div>

        {/* Application Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Total Applications", stat: "12", change: "+3 this month" },
            {
              name: "Active Applications",
              stat: "5",
              change: "2 interviews scheduled",
            },
            { name: "Interviews", stat: "3", change: "Next: Jan 20, 2024" },
            {
              name: "Response Rate",
              stat: "75%",
              change: "+5% from last month",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {item.stat}
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {item.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search applications..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>All Status</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {applications.map((application) => (
              <li key={application.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          className="h-12 w-12 rounded-full"
                          src={application.logo}
                          alt={application.company}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {application.position}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.company}
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 flex items-center space-x-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          application.status === "Interview"
                            ? "bg-green-100 text-green-800"
                            : application.status === "Applied"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {application.status}
                      </span>
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="mr-6 flex items-center text-sm text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {application.type}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {application.location}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Applied on {application.appliedDate}
                      </div>
                    </div>
                    {application.nextStep && (
                      <div className="mt-2 text-sm text-gray-500">
                        Next step: {application.nextStep}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200">
                      View Details
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      Update Status
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      Withdraw
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Interviews */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">
              Upcoming Interviews
            </h2>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {[
                {
                  company: "Tech Corp",
                  position: "Senior React Developer",
                  type: "Technical Interview",
                  date: "Jan 20, 2024",
                  time: "10:00 AM",
                  interviewer: "David Lee",
                  logo: "https://via.placeholder.com/40",
                },
                {
                  company: "Startup Inc",
                  position: "Full Stack Developer",
                  type: "HR Interview",
                  date: "Jan 22, 2024",
                  time: "2:00 PM",
                  interviewer: "Sarah Chen",
                  logo: "https://via.placeholder.com/40",
                },
              ].map((interview, index) => (
                <li key={index} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          className="h-12 w-12 rounded-full"
                          src={interview.logo}
                          alt={interview.company}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {interview.position}
                        </div>
                        <div className="text-sm text-gray-500">
                          {interview.company}
                        </div>
                      </div>
                    </div>
                    <div className="ml-6">
                      <div className="text-sm text-gray-900">
                        {interview.type}
                      </div>
                      <div className="text-sm text-gray-500">
                        {interview.date} at {interview.time}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200">
                      Join Meeting
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      Reschedule
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
