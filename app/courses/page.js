'use client'
import Image from "next/image";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from 'react';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Courses() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize Supabase client
  const supabase = createClientComponentClient();
  
  // State management
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'Most Popular');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [coursesPerPage] = useState(9);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: searchParams.get('categories') ? searchParams.get('categories').split(',') : [],
    levels: searchParams.get('levels') ? searchParams.get('levels').split(',') : [],
    duration: searchParams.get('duration') ? searchParams.get('duration').split(',') : [],
    price: searchParams.get('price') ? searchParams.get('price').split(',') : [],
    rating: searchParams.get('rating') ? searchParams.get('rating').split(',').map(Number) : []
  });

  // Update URL with current filters and sort
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('search', searchTerm);
    if (sortOption !== 'Most Popular') params.set('sort', sortOption);
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value.length > 0) {
        params.set(key, value.join(','));
      }
    });
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  // Update URL when filters, sort, or page changes
  useEffect(() => {
    updateUrlParams();
  }, [filters, sortOption, currentPage, searchTerm]);

  // Fetch courses on component mount
  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*');

        if (error) {
          console.error('Error fetching courses:', error);
          setError(error);
          return;
        }

        if (!data || data.length === 0) {
          // Handle empty data
          setCourses([]);
          setFilteredCourses([]);
        } else {
          // Validate and normalize course data
          const validatedCourses = data.map(course => ({
            id: course.id || Math.random().toString(36).substr(2, 9),
            title: course.title || 'Untitled Course',
            description: course.description || 'No description available',
            price: typeof course.price === 'number' ? course.price : 0,
            original_price: course.original_price,
            rating: course.rating || 0,
            review_count: course.review_count || 0,
            instructor_name: course.instructor_name || 'Instructor',
            instructor_image: course.instructor_image,
            course_image: course.course_image,
            category: course.category || 'Uncategorized',
            skill_level: course.skill_level || 'All Levels',
            duration_hours: course.duration_hours || 0,
            student_count: course.student_count || 0,
            bestseller: course.bestseller || false,
            new_course: course.new_course || false,
            created_at: course.created_at || new Date().toISOString()
          }));
          
          setCourses(validatedCourses);
          setFilteredCourses(validatedCourses);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []);

  // Update the useEffect to apply filters
  useEffect(() => {
    const filtered = courses.filter(course => {
      // Apply search term filter
      const matchesSearch = !searchTerm || 
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase());

      // Apply category filter
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.includes(course.category);

      // Apply level filter
      const matchesLevel = filters.levels.length === 0 || 
        filters.levels.includes(course.skill_level);

      // Apply duration filter
      const matchesDuration = filters.duration.length === 0 || 
        filters.duration.some(durationRange => {
          if (durationRange === "0-2 Hours" && course.duration_hours <= 2) return true;
          if (durationRange === "2-5 Hours" && course.duration_hours > 2 && course.duration_hours <= 5) return true;
          if (durationRange === "5-10 Hours" && course.duration_hours > 5 && course.duration_hours <= 10) return true;
          if (durationRange === "10+ Hours" && course.duration_hours > 10) return true;
          return false;
        });

      // Apply price filter
      const matchesPrice = filters.price.length === 0 || 
        filters.price.some(priceRange => {
          if (priceRange === "Free" && course.price === 0) return true;
          if (priceRange === "Under ₹1,000" && course.price > 0 && course.price < 1000) return true;
          if (priceRange === "₹1,000 - ₹5,000" && course.price >= 1000 && course.price <= 5000) return true;
          if (priceRange === "₹5,000 - ₹10,000" && course.price > 5000 && course.price <= 10000) return true;
          if (priceRange === "₹10,000+" && course.price > 10000) return true;
          return false;
        });

      // Apply rating filter
      const matchesRating = filters.rating.length === 0 || 
        filters.rating.some(minRating => course.rating >= minRating);

      // Return true only if all filters match
      return matchesSearch && matchesCategory && matchesLevel && matchesDuration && matchesPrice && matchesRating;
    });

    setFilteredCourses(filtered);
  }, [courses, searchTerm, filters]);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when search changes
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
    setCurrentPage(1); // Reset to first page when filters change
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
    setCurrentPage(1); // Reset to first page when filters are cleared
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Apply sorting to filtered courses
  const sortedCourses = React.useMemo(() => {
    if (!filteredCourses.length) return [];
    
    const sorted = [...filteredCourses];
    
    switch (sortOption) {
      case 'Most Popular':
        return sorted.sort((a, b) => (b.student_count || 0) - (a.student_count || 0));
      case 'Highest Rated':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'Newest':
        return sorted.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
      case 'Price: Low to High':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'Price: High to Low':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      default:
        return sorted;
    }
  }, [filteredCourses, sortOption]);

  // Calculate pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Toggle show all categories
  const toggleShowAllCategories = () => {
    setShowAllCategories(prev => !prev);
  };

  // Toggle filter sidebar on mobile
  const toggleFilterSidebar = () => {
    setIsFilterOpen(prev => !prev);
  };

  // Category data with more options
  const allCategories = [
    { name: "Programming", count: 1234 },
    { name: "Business & Management", count: 856 },
    { name: "Design & Creative", count: 753 },
    { name: "Marketing & Digital", count: 642 },
    { name: "IT & Software", count: 524 },
    { name: "Data Science", count: 412 },
    { name: "Personal Development", count: 387 },
    { name: "Health & Fitness", count: 298 },
    { name: "Music", count: 245 },
    { name: "Photography & Video", count: 213 },
    { name: "Teaching & Academics", count: 187 },
    { name: "Language Learning", count: 156 }
  ];

  // Display limited or all categories based on state
  const displayedCategories = showAllCategories ? allCategories : allCategories.slice(0, 5);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // The search is already applied on input change, but this could be used
    // for analytics tracking or other functionality
    console.log('Search submitted:', searchTerm);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-bold text-gray-900">Error Loading Courses</h2>
          <p className="mt-2 text-gray-600">{error.message || 'An unexpected error occurred. Please try again later.'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Discover Your Next Learning Journey
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl">
            Choose from thousands of online courses with new additions every
            month
          </p>

          {/* Updated Search Form with better spacing and responsiveness */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl max-w-3xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search courses, skills, or topics"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleFilterSidebar}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-expanded={isFilterOpen}
            aria-controls="filter-section"
          >
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            <span className="ml-1 bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full text-xs">
              {Object.values(filters).flat().length}
            </span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Filters Sidebar - Improved spacing and consistency */}
          <div 
            id="filter-section"
            className={`${isFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 space-y-6 lg:flex-shrink-0`}
            aria-label="Filter options"
          >
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-md sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Category - Improved spacing */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Category</h4>
                  <span className="text-xs text-gray-500">
                    {showAllCategories ? allCategories.length : 5} of {allCategories.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {displayedCategories.map((category) => (
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
                      <span className="text-xs text-gray-500">
                        {category.count}
                      </span>
                    </label>
                  ))}
                </div>
                <button 
                  onClick={toggleShowAllCategories}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  {showAllCategories ? 'Show Less' : 'Show More'}
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${showAllCategories ? 'rotate-180' : ''}`}
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

              {/* Level - Improved spacing */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Level</h4>
                <div className="space-y-2">
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
                      <span className="text-xs text-gray-500">
                        {level.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration - Improved spacing */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Duration</h4>
                <div className="space-y-2">
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
                      <span className="text-xs text-gray-500">
                        {duration.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price - Improved spacing */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price</h4>
                <div className="space-y-2">
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
                      <span className="text-xs text-gray-500">
                        {price.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ratings - Improved spacing */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Ratings</h4>
                <div className="space-y-2">
                  {[
                    { rating: 4.5, count: 752 },
                    { rating: 4.0, count: 409 },
                    { rating: 3.5, count: 287 },
                    { rating: 3.0, count: 164 }
                  ].map((ratingOption) => (
                    <label
                      key={ratingOption.rating}
                      className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.rating.includes(ratingOption.rating)}
                          onChange={() => handleFilterChange('rating', ratingOption.rating)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div className="ml-3 flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(ratingOption.rating)
                                    ? "text-yellow-400"
                                    : i === Math.floor(ratingOption.rating) &&
                                      ratingOption.rating % 1 !== 0
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
                      <span className="text-xs text-gray-500">
                        {ratingOption.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Course Listings - Improved spacing and responsiveness */}
          <div className="flex-1">
            {/* Sort and Results Count - Improved alignment */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredCourses.length}</span> courses
              </p>
              <select 
                value={sortOption}
                onChange={handleSortChange}
                className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Sort courses by"
              >
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* Course Cards - Improved grid and spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="mt-auto">
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))
              ) : courses.length === 0 ? (
                // No courses in database
                <div className="col-span-full py-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No Courses Available</h3>
                  <p className="mt-1 text-sm text-gray-500">There are currently no courses in our database.</p>
                </div>
              ) : currentCourses.length > 0 ? (
                currentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div className="relative h-48">
                      <Image
                        src={course.course_image || `https://picsum.photos/seed/course-${course.id}/800/400`}
                        alt={`${course.title} thumbnail`}
                        fill
                        className="object-cover rounded-t-xl"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.target.src = "https://via.placeholder.com/800x400?text=Course+Image";
                        }}
                      />
                      <div className="absolute top-4 right-4 flex space-x-2">
                        {course.bestseller && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Bestseller
                          </span>
                        )}
                        {course.new_course && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 md:p-5 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {course.skill_level}
                        </span>
                        <div className="flex items-center">
                          <svg
                            className="h-4 w-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-xs text-gray-600">
                            {course.rating.toFixed(1)} ({course.review_count})
                          </span>
                        </div>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        <Link
                          href={`/courses/${course.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {course.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between mb-4 mt-auto">
                        <div className="flex items-center">
                          <Image
                            src={course.instructor_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor_name)}&background=random`}
                            alt={course.instructor_name}
                            width={24}
                            height={24}
                            className="rounded-full"
                            onError={(e) => {
                              // Fallback if image fails to load
                              e.target.src = "https://via.placeholder.com/24x24?text=I";
                            }}
                          />
                          <span className="ml-2 text-xs text-gray-600">
                            {course.instructor_name}
                          </span>
                        </div>
                        <div className="text-right">
                          {course.original_price > 0 && (
                            <span className="text-xs text-gray-500 line-through block">
                              ₹{course.original_price.toLocaleString()}
                            </span>
                          )}
                          <span className="text-base font-bold text-gray-900">
                            {course.price > 0 ? `₹${course.price.toLocaleString()}` : "Free"}
                          </span>
                        </div>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group">
                        Enroll Now
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                  <div className="mt-6">
                    <button onClick={clearFilters} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Clear all filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Pagination - Improved responsiveness */}
            {!isLoading && courses.length > 0 && currentCourses.length > 0 && totalPages > 1 && (
              <div className="mt-8 md:mt-12 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px overflow-hidden">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 md:px-4 md:py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    aria-label="Previous page"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Calculate page numbers to show (show current page in the middle if possible)
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`relative inline-flex items-center px-3 py-2 md:px-4 md:py-2 border border-gray-300 bg-white text-sm font-medium ${
                          pageNum === currentPage
                            ? "text-blue-600 bg-blue-50 border-blue-500 z-10"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 md:px-4 md:py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    aria-label="Next page"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
