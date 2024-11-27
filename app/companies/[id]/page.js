import Image from "next/image";
import Link from "next/link";

export default function CompanyProfile() {
  const company = {
    name: "Tech Innovators Ltd",
    logo: "https://via.placeholder.com/150",
    coverImage: "https://via.placeholder.com/1200x300",
    industry: "Technology",
    location: "London, UK",
    founded: "2010",
    size: "501-1000 employees",
    description:
      "Tech Innovators Ltd is a leading software development and innovation company, specializing in cutting-edge technology solutions. We work with clients across various industries to deliver transformative digital experiences.",
    website: "https://techinnovators.com",
    openPositions: 12,
    rating: 4.8,
    benefits: [
      "Flexible working hours",
      "Remote work options",
      "Health insurance",
      "Professional development",
      "Stock options",
      "Gym membership",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Image */}
      <div className="relative h-72">
        <Image
          src={company.coverImage}
          alt="Company cover"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-40">
            <div className="flex items-end">
              <div className="flex-shrink-0">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={120}
                  height={120}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="ml-6 mb-4">
                <h1 className="text-4xl font-bold text-white">
                  {company.name}
                </h1>
                <div className="mt-2 flex items-center text-gray-200">
                  <span>{company.industry}</span>
                  <span className="mx-2">•</span>
                  <span>{company.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About {company.name}
              </h2>
              <p className="text-gray-600">{company.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Founded</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {company.founded}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Company size
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">{company.size}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Industry
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {company.industry}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Website</h3>
                  <a
                    href={company.website}
                    className="mt-1 text-sm text-blue-600 hover:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.website}
                  </a>
                </div>
              </div>
            </section>

            {/* Open Positions */}
            <section className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Open Positions
                </h2>
                <span className="text-blue-600">
                  {company.openPositions} positions
                </span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Senior Frontend Developer",
                    department: "Engineering",
                    location: "London, UK",
                    type: "Full-time",
                    salary: "£65,000 - £85,000",
                    posted: "2 days ago",
                  },
                  {
                    title: "Product Manager",
                    department: "Product",
                    location: "Remote",
                    type: "Full-time",
                    salary: "£55,000 - £75,000",
                    posted: "1 week ago",
                  },
                  {
                    title: "UX Designer",
                    department: "Design",
                    location: "London, UK",
                    type: "Full-time",
                    salary: "£45,000 - £60,000",
                    posted: "3 days ago",
                  },
                ].map((position) => (
                  <div
                    key={position.title}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {position.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {position.posted}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>{position.department}</span>
                      <span className="mx-2">•</span>
                      <span>{position.location}</span>
                      <span className="mx-2">•</span>
                      <span>{position.type}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-900">
                      {position.salary}
                    </div>
                    <div className="mt-4">
                      <Link
                        href="#"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Employee Reviews
                </h2>
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
                    {company.rating} out of 5
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  {
                    title: "Great place to work and grow",
                    rating: 5,
                    author: "Senior Developer",
                    date: "1 month ago",
                    pros: "Excellent work-life balance, great colleagues, lots of learning opportunities",
                    cons: "Can be fast-paced and challenging at times",
                  },
                  {
                    title: "Innovative and supportive environment",
                    rating: 4,
                    author: "Product Designer",
                    date: "2 months ago",
                    pros: "Creative freedom, good benefits, strong team culture",
                    cons: "Some processes could be more streamlined",
                  },
                ].map((review) => (
                  <div
                    key={review.title}
                    className="border-t border-gray-200 pt-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {review.title}
                      </h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating
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
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {review.author} • {review.date}
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Pros
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {review.pros}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Cons
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {review.cons}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Company Stats */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Company Overview
              </h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Total Employees
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    750+
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Average Tenure
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    3.5 years
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Growth Rate
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    25% YoY
                  </dd>
                </div>
              </dl>
            </section>

            {/* Benefits */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Benefits & Perks
              </h2>
              <ul className="space-y-3">
                {company.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-sm text-gray-600">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Follow Company */}
            <section className="bg-white shadow rounded-lg p-6">
              <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Follow Company
              </button>
              <div className="mt-4 flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
