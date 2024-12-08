import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
  ChevronDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function CandidatesPage() {
  // Mock data - replace with actual data fetching
  const candidates = [
    {
      id: 1,
      name: "Sarah Wilson",
      image: "https://picsum.photos/seed/candidate1/64/64",
      role: "Senior Frontend Developer",
      experience: "5 years",
      location: "London, UK",
      education: "BSc Computer Science",
      skills: ["React", "TypeScript", "Node.js"],
      status: "Interviewed",
      email: "sarah.wilson@example.com",
      phone: "+44 123 456 7890",
      rating: 4.8,
    },
    // Add more candidate data as needed
  ];

  const filters = [
    { name: "Role", options: ["All Roles", "Developer", "Designer", "Manager"] },
    { name: "Experience", options: ["Any", "0-2 years", "3-5 years", "5+ years"] },
    { name: "Status", options: ["All", "New", "Reviewed", "Interviewed", "Offered"] },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Candidates</h1>
              <p className="mt-2 text-xl text-white/90">
                Browse and manage candidate applications
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="inline-flex items-center px-6 py-3 border-2 border-white rounded-lg text-white hover:bg-white/10 transition-colors font-medium group">
                Export Candidates
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              {filters.map((filter) => (
                <div key={filter.name} className="relative">
                  <select
                    className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    {filter.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={candidate.image}
                    alt={candidate.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-gray-600">{candidate.role}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                    {candidate.experience} experience
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-2" />
                    {candidate.education}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-600">{candidate.rating}</span>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                    {candidate.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <button className="text-gray-600 hover:text-purple-600 transition-colors">
                    <EnvelopeIcon className="h-5 w-5" />
                  </button>
                  <button className="text-gray-600 hover:text-purple-600 transition-colors">
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                  <Link
                    href={`/recruiter/candidates/${candidate.id}`}
                    className="flex items-center text-purple-600 hover:text-purple-700 transition-colors group"
                  >
                    View Profile
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg ${
                  page === 1
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-purple-50"
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      </main>
    </div>
  );
}
