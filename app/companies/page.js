import Image from "next/image";
import Link from "next/link";

export default function Companies() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Top Companies Hiring Now
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Discover and connect with leading companies across various
            industries
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search companies..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
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
            </div>
            <div>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Industries</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Education</option>
              </select>
            </div>
            <div>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Locations</option>
                <option>London</option>
                <option>Manchester</option>
                <option>Birmingham</option>
                <option>Remote</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Companies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Companies
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Tech Innovators Ltd",
                logo: "https://via.placeholder.com/150",
                industry: "Technology",
                location: "London, UK",
                description:
                  "Leading software development and innovation company",
                openPositions: 12,
                rating: 4.8,
                featured: true,
              },
              {
                name: "Healthcare Plus",
                logo: "https://via.placeholder.com/150",
                industry: "Healthcare",
                location: "Manchester, UK",
                description: "Revolutionary healthcare technology solutions",
                openPositions: 8,
                rating: 4.6,
                featured: true,
              },
              {
                name: "EduTech Solutions",
                logo: "https://via.placeholder.com/150",
                industry: "Education",
                location: "Remote",
                description: "Transforming education through technology",
                openPositions: 5,
                rating: 4.7,
                featured: true,
              },
            ].map((company) => (
              <Link
                href={`/companies/${company.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                key={company.name}
                className="block"
              >
                <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={80}
                        height={80}
                        className="rounded"
                      />
                      {company.featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {company.name}
                    </h3>
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
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {company.industry}
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
                      {company.location}
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      {company.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(company.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {company.rating}
                        </span>
                      </div>
                      <span className="text-sm text-blue-600">
                        {company.openPositions} open positions
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Companies */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Companies
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "FinTech Solutions",
                logo: "https://via.placeholder.com/150",
                industry: "Finance",
                location: "London, UK",
                description: "Innovative financial technology solutions",
                openPositions: 6,
                rating: 4.5,
              },
              {
                name: "Creative Studios",
                logo: "https://via.placeholder.com/150",
                industry: "Design",
                location: "Birmingham, UK",
                description: "Creative design and branding agency",
                openPositions: 4,
                rating: 4.3,
              },
              {
                name: "Data Analytics Pro",
                logo: "https://via.placeholder.com/150",
                industry: "Technology",
                location: "Remote",
                description: "Advanced data analytics and insights",
                openPositions: 7,
                rating: 4.4,
              },
            ].map((company) => (
              <Link
                href={`/companies/${company.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                key={company.name}
                className="block"
              >
                <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={80}
                        height={80}
                        className="rounded"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {company.name}
                    </h3>
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
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {company.industry}
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
                      {company.location}
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      {company.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(company.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {company.rating}
                        </span>
                      </div>
                      <span className="text-sm text-blue-600">
                        {company.openPositions} open positions
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
