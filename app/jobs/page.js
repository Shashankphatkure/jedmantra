'use client'

import Image from "next/image";
import Link from "next/link";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [filters, setFilters] = useState({
    datePosted: '',
    jobType: [],
    salaryRange: [],
    experienceLevel: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 5
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [savedJobIds, setSavedJobIds] = useState(new Set())
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)
  const [sortOption, setSortOption] = useState('relevance')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select(`
            *,
            job_recruiters (
              recruiters (
                first_name,
                last_name,
                avatar_url,
                response_rate
              )
            )
          `)
          .order('posted_at', { ascending: false })
        
        if (error) {
          console.error('Error fetching jobs:', error)
          setError('Failed to load jobs. Please try again later.')
          setLoading(false)
          return
        }

        console.log('Fetched jobs:', data)
        setJobs(data || [])
        setFilteredJobs(data || [])
        setLoading(false)
      } catch (error) {
        console.error('Error:', error)
        setError('An unexpected error occurred. Please try again later.')
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  useEffect(() => {
    console.log('Current filters:', filters)
    console.log('Search query:', searchQuery)
    console.log('Location query:', locationQuery)
    console.log('Total jobs before filtering:', jobs.length)

    let result = [...jobs]

    if (searchQuery || locationQuery) {
      result = result.filter(job => {
        const matchesSearch = !searchQuery || 
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesLocation = !locationQuery ||
          job.location.toLowerCase().includes(locationQuery.toLowerCase())

        return matchesSearch && matchesLocation
      })
      console.log('Jobs after search/location filter:', result.length)
    }

    if (filters.datePosted) {
      const now = new Date()
      const days = {
        "Last 24 hours": 1,
        "Last 3 days": 3,
        "Last 7 days": 7,
        "Last 14 days": 14,
        "Last 30 days": 30,
      }
      const daysAgo = days[filters.datePosted]
      if (daysAgo) {
        result = result.filter(job => {
          const jobDate = new Date(job.posted_at)
          const diffTime = Math.abs(now - jobDate)
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          return diffDays <= daysAgo
        })
        console.log('Jobs after date filter:', result.length)
      }
    }

    if (filters.jobType.length > 0) {
      result = result.filter(job => 
        filters.jobType.includes(job.job_type)
      )
      console.log('Jobs after job type filter:', result.length)
    }

    if (filters.experienceLevel.length > 0) {
      result = result.filter(job => 
        filters.experienceLevel.includes(job.experience_level)
      )
      console.log('Jobs after experience level filter:', result.length)
    }

    if (filters.salaryRange.length > 0) {
      result = result.filter(job => {
        return filters.salaryRange.some(range => {
          const [min, max] = range.split(' - ').map(str => 
            parseInt(str.replace(/[₹,+]/g, ''))
          )
          return (
            (job.salary_min >= min || !min) && 
            (job.salary_max <= max || range.includes('+'))
          )
        })
      })
      console.log('Jobs after salary filter:', result.length)
    }

    // Apply sorting
    if (sortOption === 'newest') {
      result.sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at))
    } else if (sortOption === 'salary-high') {
      result.sort((a, b) => (b.salary_max || 0) - (a.salary_max || 0))
    } else if (sortOption === 'salary-low') {
      result.sort((a, b) => (a.salary_min || 0) - (b.salary_min || 0))
    }
    // 'relevance' is the default and doesn't need additional sorting

    console.log('Final filtered jobs:', result.length)
    setFilteredJobs(result)
  }, [jobs, searchQuery, locationQuery, filters, sortOption])

  useEffect(() => {
    console.log('Loading state:', loading)
    console.log('Jobs length:', jobs.length)
    console.log('Filtered jobs length:', filteredJobs.length)
  }, [loading, jobs, filteredJobs])

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          return // Don't redirect, just return as saving is optional
        }

        const { data, error } = await supabase
          .from('saved_jobs')
          .select('job_id')
          .eq('user_id', user.id)

        if (error) throw error
        
        setSavedJobIds(new Set(data.map(item => item.job_id)))
      } catch (error) {
        console.error('Error fetching saved jobs:', error)
      }
    }

    fetchSavedJobs()
  }, [supabase])

  const handleSaveJob = async (jobId) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        router.push('/login')
        return
      }

      if (savedJobIds.has(jobId)) {
        // Unsave the job
        const { error } = await supabase
          .from('saved_jobs')
          .delete()
          .match({ 
            job_id: jobId,
            user_id: user.id 
          })

        if (error) throw error
        
        setSavedJobIds(prev => {
          const next = new Set(prev)
          next.delete(jobId)
          return next
        })
      } else {
        // Save the job
        const { error } = await supabase
          .from('saved_jobs')
          .insert({ 
            job_id: jobId,
            user_id: user.id 
          })

        if (error) throw error

        setSavedJobIds(prev => new Set([...prev, jobId]))
      }
    } catch (error) {
      console.error('Error saving/unsaving job:', error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
  }

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (type === 'datePosted') {
        return { ...prev, datePosted: value }
      }
      
      const updatedValues = prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
      
      return { ...prev, [type]: updatedValues }
    })
  }

  const clearFilters = () => {
    setFilters({
      datePosted: '',
      jobType: [],
      salaryRange: [],
      experienceLevel: [],
    })
    setSearchQuery('')
    setLocationQuery('')
  }

  const toggleFiltersMobile = () => {
    setShowFiltersMobile(!showFiltersMobile)
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  const searchFormJSX = (
    <div className="bg-white p-6 rounded-xl shadow-xl">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Job title, keyword, or company"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="City, state, or remote"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search Jobs
        </button>
      </form>
    </div>
  )

  const datePostedFilterJSX = (
    <div className="space-y-3">
      {[
        { name: "Last 24 hours", count: 156 },
        { name: "Last 3 days", count: 284 },
        { name: "Last 7 days", count: 542 },
        { name: "Last 14 days", count: 864 },
        { name: "Last 30 days", count: 1205 },
      ].map((option) => (
        <label
          key={option.name}
          className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="date"
              checked={filters.datePosted === option.name}
              onChange={() => handleFilterChange('datePosted', option.name)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
              {option.name}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {option.count}
          </span>
        </label>
      ))}
    </div>
  )

  const jobTypeFilterJSX = (
    <div className="space-y-2">
      {[
        "Full-time",
        "Part-time",
        "Contract",
        "Freelance",
      ].map((type) => (
        <label key={type} className="flex items-center">
          <input
            type="checkbox"
            checked={filters.jobType.includes(type)}
            onChange={() => handleFilterChange('jobType', type)}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">
            {type}
          </span>
        </label>
      ))}
    </div>
  )

  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header skeleton */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="h-8 w-64 bg-white/20 rounded-lg mb-4"></div>
            <div className="flex gap-4 mb-6">
              <div className="h-4 w-20 bg-white/20 rounded"></div>
              <div className="h-4 w-20 bg-white/20 rounded"></div>
              <div className="h-4 w-20 bg-white/20 rounded"></div>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="h-10 bg-white/20 rounded-lg flex-1"></div>
                <div className="h-10 bg-white/20 rounded-lg flex-1"></div>
                <div className="h-10 w-24 bg-white/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar skeleton */}
            <div className="hidden md:block w-64 lg:w-72">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-4">
                      <div className="h-5 w-24 bg-gray-200 rounded"></div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className="flex items-center">
                            <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
                <div className="h-10 w-32 bg-gray-200 rounded"></div>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="hidden sm:block w-12 h-12 bg-gray-200 rounded-lg"></div>
                        <div>
                          <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
                          <div className="h-4 w-40 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="mt-4">
                      <div className="flex gap-2 mb-3">
                        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                      <div className="h-10 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Find Your Dream Job</h1>
              <div className="flex items-center mt-2 space-x-4">
                <Link href="/jobs" className="text-white font-medium">
                  All Jobs
                </Link>
                <Link href="/jobs/saved" className="text-white/80 hover:text-white transition-colors">
                  Saved Jobs
                </Link>
                <Link href="/jobs/applied" className="text-white/80 hover:text-white transition-colors">
                  Applied Jobs
                </Link>
              </div>
            </div>
            <p className="text-sm md:text-base text-white/80 md:hidden">
              Discover thousands of job opportunities
            </p>
          </div>

          {/* Integrated Search Form */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, keyword, or company"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search for jobs"
                />
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City, state, or remote"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Location"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={toggleFiltersMobile}
            className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <span className="font-medium text-gray-700">Filters</span>
            <div className="flex items-center">
              {Object.values(filters).flat().filter(Boolean).length > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  {Object.values(filters).flat().filter(Boolean).length}
                </span>
              )}
              <svg
                className={`h-5 w-5 text-gray-500 transform transition-transform ${showFiltersMobile ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Enhanced for mobile */}
          <div 
            className={`${
              showFiltersMobile ? 'block' : 'hidden'
            } md:block w-full md:w-64 lg:w-72 flex-shrink-0`}
          >
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {Object.values(filters).flat().filter(Boolean).length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="space-y-8">
                <div className="mb-8">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Date Posted
                  </h4>
                  {datePostedFilterJSX}
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-2">Job Type</h4>
                  {jobTypeFilterJSX}
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-2">Salary Range</h4>
                  <div className="space-y-2">
                    {[
                      "₹0 - ₹20,000",
                      "₹20,000 - ₹30,000",
                      "₹30,000 - ₹50,000",
                      "₹50,000 - ₹70,000",
                      "₹70,000+",
                    ].map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Experience Level</h4>
                  <div className="space-y-2">
                    {[
                      "Entry Level",
                      "Mid Level",
                      "Senior Level",
                      "Director",
                      "Executive",
                    ].map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings - Updated to use real data */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredJobs.length}</span> jobs
              </p>
              <select 
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={sortOption}
                onChange={handleSortChange}
                aria-label="Sort jobs by"
              >
                <option value="relevance">Most relevant</option>
                <option value="newest">Newest first</option>
                <option value="salary-high">Highest salary</option>
                <option value="salary-low">Lowest salary</option>
              </select>
            </div>

            {/* Empty State */}
            {currentJobs.length === 0 && (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="mx-auto w-24 h-24 mb-4">
                  <svg className="w-full h-full text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <button 
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Updated Job Cards */}
            {currentJobs.length > 0 && (
              <div className="space-y-6">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {/* Company Logo */}
                        <div className="hidden sm:block flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                          {job.company_logo ? (
                            <Image 
                              src={job.company_logo} 
                              alt={`${job.company_name} logo`}
                              width={48}
                              height={48}
                              className="object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder-logo.png";
                              }}
                            />
                          ) : (
                            <span className="text-xl font-bold text-gray-400">
                              {job.company_name?.charAt(0) || "C"}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 group">
                            <Link href={`/jobs/${job.id}`} className="group-hover:underline">
                              {job.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mt-1 flex items-center">
                            <span className="font-medium">{job.company_name}</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center">
                              <svg className="h-4 w-4 text-gray-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {job.location}
                            </span>
                          </p>
                          <div className="mt-2 space-y-2">
                            {(job.salary_min || job.salary_max) && (
                              <p className="text-gray-700 flex items-center">
                                <svg className="h-4 w-4 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                                ₹{job.salary_min?.toLocaleString() || '—'} - ₹{job.salary_max?.toLocaleString() || '—'} a year
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSaveJob(job.id)}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        title={savedJobIds.has(job.id) ? "Remove from saved jobs" : "Save job"}
                        aria-label={savedJobIds.has(job.id) ? "Remove from saved jobs" : "Save job"}
                      >
                        <svg
                          className="h-6 w-6"
                          fill={savedJobIds.has(job.id) ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.job_type}
                        </span>
                        {job.is_remote && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Remote
                          </span>
                        )}
                        {job.experience_level && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {job.experience_level}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 line-clamp-2 text-sm">
                        {job.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>Posted {new Date(job.posted_at).toLocaleDateString()}</span>
                      </div>
                      <Link href={`/jobs/${job.id}`} className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                        Apply Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Enhanced Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === index + 1
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500">
          Total Jobs: {jobs.length} | Filtered Jobs: {filteredJobs.length}
        </p>
      </div>
    </div>
  );
}
