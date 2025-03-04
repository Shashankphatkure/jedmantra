'use client'

import Image from "next/image";
import Link from "next/link";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'

export default function Companies() {
  const supabase = createClientComponentClient()
  const [companies, setCompanies] = useState([])
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [filters, setFilters] = useState({
    industries: [],
    companySize: [],
    rating: [],
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Featured');

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('companies')
          .select(`
            id,
            name,
            logo_url,
            industry,
            location,
            description,
            company_size,
            founded_year,
            website_url,
            linkedin_url,
            open_positions,
            rating,
            review_count,
            benefits,
            culture_values,
            featured,
            verified,
            created_at,
            updated_at,
            recruiter_id
          `)
          .order('featured', { ascending: false })
        
        if (error) {
          console.error('Error fetching companies:', error)
          return
        }

        // Process the data to ensure all fields are properly formatted
        const processedData = data.map(company => ({
          ...company,
          company_size: company.company_size || '',
          rating: company.rating || 0,
          open_positions: company.open_positions || 0,
          review_count: company.review_count || 0,
          benefits: company.benefits || [],
          culture_values: company.culture_values || [],
          size: company.company_size // Add size alias for backward compatibility
        }))

        setCompanies(processedData)
        setFilteredCompanies(processedData)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  useEffect(() => {
    let result = [...companies]

    // Apply search filters
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(company => 
        (company.name && company.name.toLowerCase().includes(query)) ||
        (company.description && company.description.toLowerCase().includes(query)) ||
        (company.industry && company.industry.toLowerCase().includes(query))
      )
    }

    if (locationQuery) {
      const query = locationQuery.toLowerCase()
      result = result.filter(company => 
        company.location && company.location.toLowerCase().includes(query)
      )
    }

    // Apply category filters
    if (filters.industries.length > 0) {
      result = result.filter(company => 
        filters.industries.includes(company.industry)
      )
    }

    if (filters.companySize.length > 0) {
      result = result.filter(company => 
        filters.companySize.includes(company.company_size)
      )
    }

    if (filters.rating.length > 0) {
      result = result.filter(company => {
        return filters.rating.some(minRating => 
          company.rating >= minRating
        )
      })
    }

    // Apply sorting
    switch (sortOption) {
      case 'Featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'Highest Rated':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'Most Jobs':
        result.sort((a, b) => (b.open_positions || 0) - (a.open_positions || 0));
        break;
      case 'Alphabetical':
        result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      default:
        // Default to featured sorting
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredCompanies(result)
  }, [companies, searchQuery, locationQuery, filters, sortOption])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const updatedFilters = { ...prev }
      
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value)
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value]
      }
      
      return updatedFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      industries: [],
      companySize: [],
      rating: [],
    })
    setSearchQuery('')
    setLocationQuery('')
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // You could add analytics tracking here
    console.log('Search submitted:', { searchQuery, locationQuery });
  }

  const toggleFilterSidebar = () => {
    setIsFilterOpen(prev => !prev);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading companies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Redesigned Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="max-w-xl">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Top Companies Hiring Now
              </h1>
              <p className="text-sm md:text-base text-white/80 mt-1">
                Discover and connect with leading companies across various industries
              </p>
            </div>
          </div>

          {/* Integrated Search Form */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-12">
              <div className="md:col-span-5 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search companies..."
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search companies"
                />
              </div>
              <div className="md:col-span-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Location"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Location"
                />
              </div>
              <div className="md:col-span-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                  <select 
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    aria-label="Select industry"
                    onChange={(e) => {
                      if (e.target.value !== "All Industries") {
                        handleFilterChange('industries', e.target.value);
                      } else {
                        // Clear industry filters if "All Industries" is selected
                        setFilters(prev => ({
                          ...prev,
                          industries: []
                        }));
                      }
                    }}
                    value={filters.industries.length === 1 ? filters.industries[0] : "All Industries"}
                  >
                    <option>All Industries</option>
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Education</option>
                    <option>Manufacturing</option>
                    <option>Retail</option>
                    <option>Media</option>
                    <option>Hospitality</option>
                    <option>Transportation</option>
                    <option>Construction</option>
                    <option>Energy</option>
                    <option>Agriculture</option>
                    <option>Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label="Search companies"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Subtle wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleFilterSidebar}
            className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-expanded={isFilterOpen}
            aria-controls="filter-section"
          >
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </div>
            {Object.values(filters).flat().length > 0 && (
              <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full text-xs font-medium">
                {Object.values(filters).flat().length}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div 
            id="filter-section"
            className={`${isFilterOpen ? 'block' : 'hidden'} lg:block lg:w-72 space-y-6`}
            aria-label="Filter options"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-5">
                {/* Industry Filter */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">Industry</h4>
                  <div className="space-y-1.5">
                    {[
                      { name: "Technology", count: 156 },
                      { name: "Healthcare", count: 89 },
                      { name: "Finance", count: 78 },
                      { name: "Education", count: 45 },
                      { name: "Manufacturing", count: 34 },
                    ].map((industry) => (
                      <label
                        key={industry.name}
                        className="flex items-center justify-between group cursor-pointer py-1 px-1.5 hover:bg-gray-50 rounded text-sm"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            checked={filters.industries.includes(industry.name)}
                            onChange={() => handleFilterChange('industries', industry.name)}
                          />
                          <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                            {industry.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                          {industry.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Company Size Filter */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">Company Size</h4>
                  <div className="space-y-1.5">
                    {[
                      "1-10 employees",
                      "11-50 employees",
                      "51-200 employees",
                      "201-500 employees",
                      "501-1000 employees",
                      "1001-5000 employees",
                      "5001+ employees"
                    ].map((size) => (
                      <label key={size} className="flex items-center group cursor-pointer py-1 px-1.5 hover:bg-gray-50 rounded text-sm">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            checked={filters.companySize.includes(size)}
                            onChange={() => handleFilterChange('companySize', size)}
                          />
                          <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                            {size}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">Rating</h4>
                  <div className="space-y-1.5">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center justify-between group cursor-pointer py-1 px-1.5 hover:bg-gray-50 rounded text-sm"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            checked={filters.rating.includes(rating)}
                            onChange={() => handleFilterChange('rating', rating)}
                          />
                          <div className="ml-2 flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(rating)
                                    ? "text-yellow-400"
                                    : i === Math.floor(rating) && rating % 1 > 0
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-1 text-xs text-gray-700">& up</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.industries.length > 0 || filters.companySize.length > 0 || filters.rating.length > 0 || searchQuery || locationQuery) && (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Active Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <div className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 text-xs">
                      <span className="mr-1">Search: {searchQuery}</span>
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {locationQuery && (
                    <div className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 text-xs">
                      <span className="mr-1">Location: {locationQuery}</span>
                      <button 
                        onClick={() => setLocationQuery('')}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {filters.industries.map(industry => (
                    <div key={industry} className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 text-xs">
                      <span className="mr-1">{industry}</span>
                      <button 
                        onClick={() => handleFilterChange('industries', industry)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {filters.companySize.map(size => (
                    <div key={size} className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 text-xs">
                      <span className="mr-1">{size}</span>
                      <button 
                        onClick={() => handleFilterChange('companySize', size)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {filters.rating.map(rating => (
                    <div key={rating} className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 text-xs">
                      <span className="mr-1">{rating}+ Stars</span>
                      <button 
                        onClick={() => handleFilterChange('rating', rating)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Company Listings */}
          <div className="flex-1">
            {/* Featured Companies */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Featured Companies
                </h2>
                
                <div className="mt-3 sm:mt-0 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                    </svg>
                  </div>
                  <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="pl-9 pr-8 py-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md appearance-none bg-white"
                    aria-label="Sort companies"
                  >
                    <option>Featured</option>
                    <option>Highest Rated</option>
                    <option>Most Jobs</option>
                    <option>Alphabetical</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {filteredCompanies.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCompanies.map((company) => {
                    // Ensure company data has all required fields with fallbacks
                    const safeCompany = {
                      ...company,
                      name: company.name || 'Unnamed Company',
                      logo_url: company.logo_url || null,
                      industry: company.industry || 'Uncategorized',
                      location: company.location || 'Location not specified',
                      description: company.description || 'No description available',
                      benefits: Array.isArray(company.benefits) ? company.benefits : [],
                      rating: company.rating || 0,
                      review_count: company.review_count || 0,
                      open_positions: company.open_positions || 0,
                      featured: !!company.featured,
                      verified: !!company.verified
                    };
                    
                    return (
                      <Link
                        href={`/companies/${company.id}`}
                        key={company.id}
                        className="group block h-full"
                      >
                        <div className="bg-white h-full border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-300 flex flex-col">
                          {/* Company Header with Logo and Badges */}
                          <div className="relative">
                            {/* Company Cover Image */}
                            <div className="h-24 w-full bg-gradient-to-r from-blue-50 to-indigo-50"></div>
                            
                            {/* Logo and Badges */}
                            <div className="px-6 pb-4 flex justify-between">
                              <div className="relative -mt-10">
                                <div className="h-16 w-16 rounded-lg border-4 border-white bg-white shadow-sm overflow-hidden">
                                  <Image
                                    src={safeCompany.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(safeCompany.name)}&background=random&color=fff&size=80`}
                                    alt={`${safeCompany.name} logo`}
                                    width={80}
                                    height={80}
                                    className="object-cover h-full w-full"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(safeCompany.name)}&background=random&color=fff&size=80`;
                                    }}
                                  />
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mt-2">
                                {safeCompany.featured && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Featured
                                  </span>
                                )}
                                {safeCompany.verified && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Verified
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Company Info */}
                          <div className="px-6 py-4 flex-grow">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {safeCompany.name}
                            </h3>
                            
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <svg
                                className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
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
                              {safeCompany.industry}
                            </div>
                            
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <svg
                                className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
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
                              {safeCompany.location}
                            </div>
                            
                            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                              {safeCompany.description}
                            </p>
                            
                            {/* Benefits Tags */}
                            {safeCompany.benefits && safeCompany.benefits.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-1.5">
                                {safeCompany.benefits.slice(0, 3).map((benefit, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                  >
                                    {benefit}
                                  </span>
                                ))}
                                {safeCompany.benefits.length > 3 && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-blue-600">
                                    +{safeCompany.benefits.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {/* Card Footer */}
                          <div className="px-6 py-4 border-t border-gray-100 mt-auto">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(safeCompany.rating)
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
                                <span className="ml-1.5 text-xs text-gray-600">
                                  {safeCompany.rating.toFixed(1)} ({safeCompany.review_count})
                                </span>
                              </div>
                              <span className="text-sm font-medium text-blue-600">
                                {safeCompany.open_positions} open jobs
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                // Empty state when no companies match filters
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No companies found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria or filters.</p>
                  <div className="mt-6">
                    <button 
                      onClick={clearFilters} 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
