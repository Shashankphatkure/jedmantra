"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  AcademicCapIcon, 
  ArrowRightIcon, 
  ClockIcon, 
  DocumentTextIcon,
  ShareIcon,
  CloudArrowDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";

export default function Certificates() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const certificates = [
    {
      id: 1,
      course: "Web Development Fundamentals",
      issueDate: "2024-01-15", 
      status: "Issued",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
      instructor: "Sarah Johnson",
      category: "Development",
      duration: "12 weeks",
      score: "95%",
      validUntil: "2025-01-15",
      skills: ["HTML", "CSS", "JavaScript"]
    },
    {
      id: 2,
      course: "Digital Marketing Essentials",
      issueDate: "2024-02-01",
      status: "Issued", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
      instructor: "Sarah Johnson",
      category: "Development",
      duration: "12 weeks",
      score: "95%",
      validUntil: "2025-01-15",
      skills: ["HTML", "CSS", "JavaScript"]
    },
    {
      id: 3,
      course: "Data Science Basics",
      issueDate: "In Progress",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      instructor: "Sarah Johnson",
      category: "Development", 
      duration: "12 weeks",
      score: "95%",
      validUntil: "2025-01-15",
      skills: ["HTML", "CSS", "JavaScript"]
    },
  ];

  // Calculate statistics
  const stats = {
    total: certificates.length,
    completed: certificates.filter(cert => cert.status === "Issued").length,
    inProgress: certificates.filter(cert => cert.status === "Pending").length,
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-48 bg-blue-100 mb-8" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow h-96" />
          ))}
        </div>
      </div>
    </div>
  );

  const filteredCertificates = certificates
    .filter(cert => {
      const matchesSearch = cert.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cert.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || cert.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.issueDate) - new Date(a.issueDate);
      if (sortBy === "oldest") return new Date(a.issueDate) - new Date(b.issueDate);
      return 0;
    });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-600/20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              My Certificates
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Track your achievements and showcase your skills with professional certificates
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 
          bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-70 
          bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 mt-4">
        {/* Enhanced Statistics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-6">
          {[
            { name: "Total Certificates", stat: stats.total, icon: DocumentTextIcon, color: "blue" },
            { name: "Completed", stat: stats.completed, icon: AcademicCapIcon, color: "green" },
            { name: "In Progress", stat: stats.inProgress, icon: ClockIcon, color: "yellow" },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-3 rounded-xl bg-${item.color}-50 
                  ring-4 ring-${item.color}-50/50`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {item.stat}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search certificates..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-48 pl-4 pr-10 py-3 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All</option>
              <option>Issued</option>
              <option>Pending</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-48 pl-4 pr-10 py-3 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Enhanced Certificates Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {filteredCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg 
                transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image
                  src={certificate.image}
                  alt={certificate.course}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  priority
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs 
                    font-medium ${
                      certificate.status === "Issued"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {certificate.status}
                  </span>
                  {certificate.score && (
                    <span className="text-white text-sm font-medium">
                      Score: {certificate.score}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 
                  transition-colors">
                  {certificate.course}
                </h3>
                
                <div className="space-y-3 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-2" />
                    {certificate.instructor}
                  </div>
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                    {certificate.category}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                    {certificate.status === "Issued" ? (
                      <span>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</span>
                    ) : (
                      <span>Expected: {certificate.issueDate}</span>
                    )}
                  </div>
                </div>

                {certificate.skills && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs 
                            font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {certificate.status === "Issued" && (
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 
                        border border-transparent text-sm font-medium rounded-lg text-white 
                        bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <CloudArrowDownIcon className="h-5 w-5 mr-2" />
                      Download
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 
                        border border-gray-300 text-sm font-medium rounded-lg text-gray-700 
                        bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <ShareIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
