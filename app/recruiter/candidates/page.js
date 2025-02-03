'use client'
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
import { useState, useEffect } from "react";

export default function CandidatesPage() {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    Role: "All Roles",
    Experience: "Any",
    Status: "All"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  
  // Mock data with more candidates
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
    {
      id: 2,
      name: "John Doe",
      image: "https://picsum.photos/seed/candidate2/64/64",
      role: "Full Stack Developer",
      experience: "3 years",
      location: "New York, USA",
      education: "MSc Software Engineering",
      skills: ["Python", "React", "AWS"],
      status: "New",
      email: "john.doe@example.com",
      phone: "+1 234 567 8901",
      rating: 4.5,
    },
    // Add more candidates...
  ];

  const filters = [
    { name: "Role", options: ["All Roles", "Developer", "Designer", "Manager"] },
    { name: "Experience", options: ["Any", "0-2 years", "3-5 years", "5+ years"] },
    { name: "Status", options: ["All", "New", "Reviewed", "Interviewed", "Offered"] },
  ];

  // Filter and search logic
  useEffect(() => {
    let results = [...candidates];
    
    // Apply search
    if (searchQuery) {
      results = results.filter(candidate =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Apply filters
    if (selectedFilters.Role !== "All Roles") {
      results = results.filter(candidate => 
        candidate.role.includes(selectedFilters.Role)
      );
    }
    if (selectedFilters.Experience !== "Any") {
      results = results.filter(candidate => {
        const years = parseInt(candidate.experience);
        switch(selectedFilters.Experience) {
          case "0-2 years": return years <= 2;
          case "3-5 years": return years >= 3 && years <= 5;
          case "5+ years": return years > 5;
          default: return true;
        }
      });
    }
    if (selectedFilters.Status !== "All") {
      results = results.filter(candidate => 
        candidate.status === selectedFilters.Status
      );
    }
    
    setFilteredCandidates(results);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchQuery, selectedFilters]);

  // Pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, role, or skills..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              {filters.map((filter) => (
                <div key={filter.name} className="relative">
                  <select
                    value={selectedFilters[filter.name]}
                    onChange={(e) => handleFilterChange(filter.name, e.target.value)}
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

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {paginatedCandidates.length} of {filteredCandidates.length} candidates
          </p>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Card Header with Status Badge */}
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    candidate.status === 'New' ? 'bg-blue-50 text-blue-700' :
                    candidate.status === 'Interviewed' ? 'bg-purple-50 text-purple-700' :
                    candidate.status === 'Offered' ? 'bg-green-50 text-green-700' :
                    'bg-gray-50 text-gray-700'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Candidate Info Header */}
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Image
                      src={candidate.image}
                      alt={candidate.name}
                      width={72}
                      height={72}
                      className="rounded-lg object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2">
                      <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-md">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-700">
                          {candidate.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {candidate.name}
                    </h3>
                    <p className="text-sm font-medium text-purple-600">{candidate.role}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {candidate.location}
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center text-gray-600">
                      <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm">
                        {candidate.experience}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center text-gray-600">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm">
                        {candidate.education.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-6">
                  <p className="text-xs font-medium text-gray-500 mb-2">KEY SKILLS</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => window.location.href = `mailto:${candidate.email}`}
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Send email"
                      >
                        <EnvelopeIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => window.location.href = `tel:${candidate.phone}`}
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Call candidate"
                      >
                        <PhoneIcon className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <Link
                      href={`/recruiter/candidates/${candidate.id}`}
                      className="inline-flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm group"
                    >
                      View Profile
                      <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Updated Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-purple-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  page === currentPage
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-purple-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-purple-50 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}
