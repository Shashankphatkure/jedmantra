'use client'
import Image from "next/image";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from 'react';

export default function Courses() {
  // Initialize Supabase client
  const supabase = createClientComponentClient();
  
  // State management
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    duration: [],
    price: [],
    rating: []
  });

  // Fetch courses on component mount
  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('*');

      if (error) {
        console.error('Error fetching courses:', error);
        setError(error);
        return;
      }

      setCourses(data);
      setFilteredCourses(data);
    }

    fetchCourses();
  }, []);

  // Update the useEffect to apply filters
  useEffect(() => {
    const filtered = courses.filter(course => {
      // Apply search term filter
      const matchesSearch = !searchTerm || 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Apply category filter
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.includes(course.category);

      // Apply level filter
      const matchesLevel = filters.levels.length === 0 || 
        filters.levels.includes(course.skill_level);

      // Apply rating filter
      const matchesRating = filters.rating.length === 0 || 
        filters.rating.some(minRating => course.rating >= minRating);

      // Return true only if all filters match
      return matchesSearch && matchesCategory && matchesLevel && matchesRating;
    });

    setFilteredCourses(filtered);
  }, [courses, searchTerm, filters]);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  // Add handler for filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const updatedFilters = { ...prev };
      
      if (updatedFilters[filterType].includes(value)) {
        // Remove value if already selected
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
      } else {
        // Add value if not selected
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      
      return updatedFilters;
    });
  };

  // Add clear filters handler
  const clearFilters = () => {
    setFilters({
      categories: [],
      levels: [],
      duration: [],
      price: [],
      rating: []
    });
    setSearchTerm('');
  };

  if (error) {
    return <div>Error loading courses</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Your Next Learning Journey
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Choose from thousands of online courses with new additions every
            month
          </p>

          {/* Updated Search Form */}
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search courses, skills, or topics"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-72 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Category */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Category</h4>
                  <span className="text-sm text-gray-500">5 of 12</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Programming", count: 1234 },
                    { name: "Business & Management", count: 856 },
                    { name: "Design & Creative", count: 753 },
                    { name: "Marketing & Digital", count: 642 },
                    { name: "IT & Software", count: 524 },
                  ].map((category) => (
                    <label
                      key={category.name}
                      className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category.name)}
                          onChange={() => handleFilterChange('categories', category.name)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {category.count}
                      </span>
                    </label>
                  ))}
                </div>
                <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
                  Show More
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Level */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-900 mb-4">Level</h4>
                <div className="space-y-3">
                  {[
                    { name: "Beginner", count: 1423 },
                    { name: "Intermediate", count: 867 },
                    { name: "Advanced", count: 534 },
                    { name: "Expert", count: 234 },
                  ].map((level) => (
                    <label
                      key={level.name}
                      className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.levels.includes(level.name)}
                          onChange={() => handleFilterChange('levels', level.name)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                          {level.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {level.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-900 mb-4">Duration</h4>
                <div className="space-y-3">
                  {[
                    { name: "0-2 Hours", count: 645 },
                    { name: "2-5 Hours", count: 834 },
                    { name: "5-10 Hours", count: 456 },
                    { name: "10+ Hours", count: 267 },
                  ].map((duration) => (
                    <label
                      key={duration.name}
                      className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.duration.includes(duration.name)}
                          onChange={() => handleFilterChange('duration', duration.name)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                          {duration.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {duration.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-900 mb-4">Price</h4>
                <div className="space-y-3">
                  {[
                    { name: "Free", count: 283 },
                    { name: "Under ₹1,000", count: 645 },
                    { name: "₹1,000 - ₹5,000", count: 834 },
                    { name: "₹5,000 - ₹10,000", count: 456 },
                    { name: "₹10,000+", count: 267 },
                  ].map((price) => (
                    <label
                      key={price.name}
                      className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.price.includes(price.name)}
                          onChange={() => handleFilterChange('price', price.name)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                          {price.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {price.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Ratings</h4>
                <div className="space-y-3">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.rating.includes(rating)}
                          onChange={() => handleFilterChange('rating', rating)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div className="ml-3 flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(rating)
                                    ? "text-yellow-400"
                                    : i === Math.floor(rating) &&
                                      rating % 1 !== 0
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
                          <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                            & up
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {Math.floor(Math.random() * 1000)}
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
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredCourses.length}</span> courses
              </p>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* Course Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <Image
                      src={course.course_image || `https://picsum.photos/seed/course-${course.id}/800/400`}
                      alt={`${course.title} thumbnail`}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {course.bestseller && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Bestseller
                        </span>
                      )}
                      {course.new_course && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-600">
                        {course.skill_level}
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
                          {course.rating} ({course.review_count})
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <Link
                        href={`/courses/${course.id}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {course.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Image
                          src={course.instructor_image || `https://picsum.photos/seed/instructor-${course.id}/32/32`}
                          alt={course.instructor_name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {course.instructor_name}
                        </span>
                      </div>
                      <div className="text-right">
                        {course.original_price && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{course.original_price}
                          </span>
                        )}
                        <span className="ml-2 text-lg font-bold text-gray-900">
                          ₹{course.price}
                        </span>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group">
                      Enroll Now
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </a>
                {[1, 2, 3, 4, 5].map((page) => (
                  <a
                    key={page}
                    href="#"
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      page === 1
                        ? "text-blue-600 bg-blue-50 border-blue-500"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </a>
                ))}
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
