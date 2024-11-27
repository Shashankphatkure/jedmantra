import Image from "next/image";
import Link from "next/link";

export default function Courses() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}

      {/* Search Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search courses, skills, or topics"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Search Courses
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              {/* Category */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Category</h4>
                <div className="space-y-2">
                  {[
                    "Programming & Development",
                    "Business & Management",
                    "Design & Creative",
                    "Marketing & Digital",
                    "IT & Software",
                  ].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Level</h4>
                <div className="space-y-2">
                  {["Beginner", "Intermediate", "Advanced", "Expert"].map(
                    (level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {level}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Duration</h4>
                <div className="space-y-2">
                  {["0-2 Hours", "2-5 Hours", "5-10 Hours", "10+ Hours"].map(
                    (duration) => (
                      <label key={duration} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {duration}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-medium mb-2">Price</h4>
                <div className="space-y-2">
                  {[
                    "Free",
                    "Under £50",
                    "£50 - £100",
                    "£100 - £200",
                    "£200+",
                  ].map((price) => (
                    <label key={price} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Course Listings */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Showing 856 courses</p>
              <select className="border border-gray-300 rounded-md px-3 py-1.5">
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* Course Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((course) => (
                <div
                  key={course}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={`https://picsum.photos/seed/course-${course}/800/400`}
                      alt={`Course ${course} thumbnail`}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Bestseller
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600">
                        Programming
                      </span>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-600">
                          4.8 (2.5k reviews)
                        </span>
                      </div>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900">
                      <Link
                        href={`/courses/${course}`}
                        className="hover:text-blue-600"
                      >
                        Complete Web Development Bootcamp 2024
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      Learn web development from scratch. Master HTML, CSS,
                      JavaScript, React, and Node.js through hands-on projects.
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Image
                            src={`https://picsum.photos/seed/instructor-${course}/24/24`}
                            alt="Instructor"
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            John Smith
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                          £89.99
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </a>
                {[1, 2, 3, 4, 5].map((page) => (
                  <a
                    key={page}
                    href="#"
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      page === 1
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </a>
                ))}
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
