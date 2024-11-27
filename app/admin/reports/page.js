import Image from "next/image";

export default function AdminReports() {
  const reports = [
    {
      id: 1,
      name: "Revenue Report",
      description: "Monthly revenue breakdown by courses and categories",
      lastGenerated: "2 hours ago",
      frequency: "Monthly",
      status: "Generated",
      type: "Financial",
    },
    {
      id: 2,
      name: "User Activity Report",
      description: "User engagement and activity metrics",
      lastGenerated: "1 day ago",
      frequency: "Weekly",
      status: "Pending",
      type: "Analytics",
    },
    {
      id: 3,
      name: "Course Performance",
      description: "Course completion rates and student progress",
      lastGenerated: "3 days ago",
      frequency: "Weekly",
      status: "Generated",
      type: "Performance",
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Generate New Report
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Total Reports",
              stat: "45",
              change: "+12%",
              changeType: "increase",
            },
            {
              name: "Generated This Month",
              stat: "12",
              change: "+8.2%",
              changeType: "increase",
            },
            {
              name: "Scheduled Reports",
              stat: "8",
              change: "+4.3%",
              changeType: "increase",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="rounded-md bg-blue-500 p-3">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {item.stat}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            item.changeType === "increase"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
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
                placeholder="Search reports..."
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
              <option>All Types</option>
              <option>Financial</option>
              <option>Analytics</option>
              <option>Performance</option>
            </select>
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>All Status</option>
              <option>Generated</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Schedule Report
            </button>
          </div>
        </div>

        {/* Reports List */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {reports.map((report) => (
              <li key={report.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            report.type === "Financial"
                              ? "bg-green-100"
                              : report.type === "Analytics"
                              ? "bg-blue-100"
                              : "bg-purple-100"
                          }`}
                        >
                          <svg
                            className={`h-6 w-6 ${
                              report.type === "Financial"
                                ? "text-green-600"
                                : report.type === "Analytics"
                                ? "text-blue-600"
                                : "text-purple-600"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h2 className="text-sm font-medium text-gray-900">
                          {report.name}
                        </h2>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              {report.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0 flex items-center space-x-4">
                      <div className="flex flex-col items-end">
                        <p className="text-sm text-gray-500">Last Generated</p>
                        <p className="text-sm text-gray-900">
                          {report.lastGenerated}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          report.status === "Generated"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {report.status}
                      </span>
                      <div className="flex items-center">
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
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </button>
                        <button className="ml-4 text-gray-400 hover:text-gray-500">
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">45</span> reports
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
