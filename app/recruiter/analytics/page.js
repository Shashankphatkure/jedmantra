import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ClockIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function RecruiterAnalytics() {
  // Mock data - replace with actual data fetching
  const metrics = [
    {
      name: "Total Applications",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      period: "from last month",
    },
    {
      name: "Active Jobs",
      value: "156",
      change: "+4.2%",
      trend: "up",
      period: "from last month",
    },
    {
      name: "Time to Hire",
      value: "18 days",
      change: "-2.3%",
      trend: "down",
      period: "from last month",
    },
    {
      name: "Acceptance Rate",
      value: "68%",
      change: "+5.4%",
      trend: "up",
      period: "from last month",
    },
  ];

  const topJobs = [
    {
      title: "Senior Frontend Developer",
      applications: 245,
      views: 1200,
      status: "Active",
      conversionRate: "20.4%",
    },
    {
      title: "UX Designer",
      applications: 189,
      views: 950,
      status: "Active",
      conversionRate: "19.9%",
    },
    {
      title: "Product Manager",
      applications: 167,
      views: 880,
      status: "Active",
      conversionRate: "19.0%",
    },
  ];

  const applicationSources = [
    { source: "Direct", count: 1245, percentage: 45 },
    { source: "LinkedIn", count: 856, percentage: 30 },
    { source: "Indeed", count: 458, percentage: 16 },
    { source: "Referrals", count: 288, percentage: 9 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Analytics</h1>
              <p className="mt-2 text-xl text-white/90">
                Track your recruitment metrics and performance
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="relative">
                <select className="appearance-none bg-white/10 text-white border-2 border-white/20 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-white/50">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last 12 months</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric) => (
            <div
              key={metric.name}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-500">
                  {metric.name}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                    metric.trend === "up"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  {metric.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              <p className="mt-1 text-sm text-gray-500">{metric.period}</p>
            </div>
          ))}
        </div>

        {/* Top Performing Jobs */}
        <div className="bg-white rounded-xl shadow-lg mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Top Performing Jobs
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                      Conversion Rate
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topJobs.map((job, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {job.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {job.applications}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {job.views}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {job.conversionRate}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Application Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Application Sources
            </h2>
            <div className="space-y-4">
              {applicationSources.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {source.source}
                    </span>
                    <span className="text-sm text-gray-500">
                      {source.count} applications
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hiring Pipeline */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Hiring Pipeline
            </h2>
            <div className="space-y-6">
              {[
                { stage: "Applied", count: 2847, percentage: 100 },
                { stage: "Screening", count: 1245, percentage: 43 },
                { stage: "Interview", count: 568, percentage: 20 },
                { stage: "Offer", count: 189, percentage: 7 },
                { stage: "Hired", count: 124, percentage: 4 },
              ].map((stage) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {stage.stage}
                    </span>
                    <span className="text-sm text-gray-500">
                      {stage.count} candidates
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
