"use client";

import Image from "next/image";
import { AcademicCapIcon, ArrowRightIcon, ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function Certificates() {
  const certificates = [
    {
      id: 1,
      course: "Web Development Fundamentals",
      issueDate: "2024-01-15",
      status: "Issued",
      image: "https://via.placeholder.com/400x300",
      instructor: "Sarah Johnson",
      category: "Development",
      duration: "12 weeks",
    },
    {
      id: 2,
      course: "Digital Marketing Essentials",
      issueDate: "2024-02-01",
      status: "Issued",
      image: "https://via.placeholder.com/400x300",
    },
    {
      id: 3,
      course: "Data Science Basics",
      issueDate: "In Progress",
      status: "Pending",
      image: "https://via.placeholder.com/400x300",
    },
  ];

  // Calculate statistics
  const stats = {
    total: certificates.length,
    completed: certificates.filter(cert => cert.status === "Issued").length,
    inProgress: certificates.filter(cert => cert.status === "Pending").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              My Certificates
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Track your achievements and showcase your skills with professional certificates
            </p>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Statistics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-12">
          {[
            { name: "Total Certificates", stat: stats.total, icon: DocumentTextIcon, color: "blue" },
            { name: "Completed", stat: stats.completed, icon: AcademicCapIcon, color: "green" },
            { name: "In Progress", stat: stats.inProgress, icon: ClockIcon, color: "yellow" },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${item.color}-100`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <div className="ml-4">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {item.stat}
                  </dd>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image
                  src={certificate.image}
                  alt={certificate.course}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      certificate.status === "Issued"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {certificate.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
                    Issue Date: {certificate.issueDate}
                  </div>
                </div>

                {certificate.status === "Issued" && (
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Download
                      <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Share
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
