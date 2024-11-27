"use client";

import Image from "next/image";

export default function Certificates() {
  const certificates = [
    {
      id: 1,
      course: "Web Development Fundamentals",
      issueDate: "2024-01-15",
      status: "Issued",
      image: "https://via.placeholder.com/400x300",
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

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          My Certificates
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="relative h-48">
                <Image
                  src={certificate.image}
                  alt={certificate.course}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {certificate.course}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Issue Date: {certificate.issueDate}
                  </p>
                  <span
                    className={`inline-flex mt-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      certificate.status === "Issued"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {certificate.status}
                  </span>
                </div>
                {certificate.status === "Issued" && (
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg
                        className="-ml-0.5 mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download Certificate
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
