import Image from "next/image";
import Link from "next/link";

export default function JobApplications() {
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
            </div>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Track New Application
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Total Applications",
                value: "24",
                change: "+3 this week",
                icon: (
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
              },
              {
                title: "Interviews Scheduled",
                value: "5",
                change: "Next: Tomorrow",
                icon: (
                  <svg
                    className="h-6 w-6 text-gray-400"
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
                ),
              },
              {
                title: "Response Rate",
                value: "45%",
                change: "+5% vs last month",
                icon: (
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
              },
              {
                title: "Offers Received",
                value: "2",
                change: "Latest: 3 days ago",
                icon: (
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">{stat.icon}</div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.title}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-500">
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Applications Table */}
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Job Applications
                </h3>
                <div className="flex space-x-3">
                  <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>All Applications</option>
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    Filter
                  </button>
                </div>
              </div>
            </div>
            <ul className="divide-y divide-gray-200">
              {[
                {
                  company: "Tech Corp",
                  logo: "https://via.placeholder.com/40",
                  position: "Senior Frontend Developer",
                  location: "London, UK",
                  type: "Full-time",
                  applied: "2023-11-15",
                  status: "Interview",
                  statusColor: "yellow",
                },
                {
                  company: "Design Studio",
                  logo: "https://via.placeholder.com/40",
                  position: "UX Designer",
                  location: "Remote",
                  type: "Contract",
                  applied: "2023-11-12",
                  status: "Offer",
                  statusColor: "green",
                },
                {
                  company: "Startup Inc",
                  logo: "https://via.placeholder.com/40",
                  position: "Full Stack Developer",
                  location: "Manchester, UK",
                  type: "Full-time",
                  applied: "2023-11-10",
                  status: "Applied",
                  statusColor: "blue",
                },
              ].map((application) => (
                <li
                  key={application.company}
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          src={application.logo}
                          alt={application.company}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {application.position}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.company}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
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
                          <span className="mx-2">•</span>
                          {application.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-end">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${application.statusColor}-100 text-${application.statusColor}-800`}
                        >
                          {application.status}
                        </span>
                        <span className="mt-1 text-sm text-gray-500">
                          Applied {application.applied}
                        </span>
                      </div>
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
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Interviews */}
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Upcoming Interviews
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {[
                {
                  company: "Tech Corp",
                  logo: "https://via.placeholder.com/40",
                  position: "Senior Frontend Developer",
                  date: "Tomorrow at 2:00 PM",
                  type: "Technical Interview",
                  interviewer: "Sarah Smith",
                  platform: "Zoom",
                },
                {
                  company: "Design Studio",
                  logo: "https://via.placeholder.com/40",
                  position: "UX Designer",
                  date: "Nov 20 at 11:00 AM",
                  type: "Portfolio Review",
                  interviewer: "Mike Johnson",
                  platform: "Google Meet",
                },
              ].map((interview) => (
                <li key={interview.date} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          src={interview.logo}
                          alt={interview.company}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {interview.position}
                        </div>
                        <div className="text-sm text-gray-500">
                          {interview.company}
                        </div>
                        <div className="mt-2">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">
                              {interview.type}
                            </span>{" "}
                            with {interview.interviewer}
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {interview.date} • {interview.platform}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200">
                        Join Call
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Notes */}
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Notes
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {[
                {
                  company: "Tech Corp",
                  note: "Completed technical assessment. Need to follow up about results.",
                  date: "2 hours ago",
                  author: "You",
                },
                {
                  company: "Design Studio",
                  note: "Portfolio presentation went well. Waiting for feedback from the design team.",
                  date: "1 day ago",
                  author: "You",
                },
              ].map((note) => (
                <li key={note.date} className="px-4 py-4 sm:px-6">
                  <div className="text-sm text-gray-900">{note.company}</div>
                  <p className="mt-1 text-sm text-gray-500">{note.note}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {note.author} • {note.date}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
