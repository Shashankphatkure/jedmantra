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
          setLoading(false)
          return
        }

        console.log('Fetched jobs:', data)
        setJobs(data || [])
        setFilteredJobs(data || [])
        setLoading(false)
      } catch (error) {
        console.error('Error:', error)
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

    console.log('Final filtered jobs:', result.length)
    setFilteredJobs(result)
  }, [jobs, searchQuery, locationQuery, filters])

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
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
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Find Your Dream Job
              </h1>
              <div className="flex gap-2">
                <Link 
                  href="/savedjobs"
                  className="inline-flex items-center px-3 py-1 border border-white/30 text-xs font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
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
                  Saved Jobs
                </Link>
                <Link 
                  href="/student/applications"
                  className="inline-flex items-center px-3 py-1 border border-white/30 text-xs font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
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
        
        {/* Subtle wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Updated Filters Sidebar */}
          <div className="lg:w-72 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Clear All
                </button>
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
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Most relevant</option>
                <option>Newest first</option>
                <option>Highest paid</option>
                <option>Closest to you</option>
              </select>
            </div>

            {/* Updated Job Cards */}
            <div className="space-y-6">
              {currentJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                        <Link href={`/jobs/${job.id}`}>
                          {job.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {job.company_name} • {job.location}
                      </p>
                      <div className="mt-2 space-y-2">
                        {(job.salary_min || job.salary_max) && (
                          <p className="text-gray-600">
                            ₹{job.salary_min?.toLocaleString()} - ₹{job.salary_max?.toLocaleString()} a year
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {job.job_type}
                          </span>
                          {job.is_remote && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Remote
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleSaveJob(job.id)}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                      title={savedJobIds.has(job.id) ? "Remove from saved jobs" : "Save job"}
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
                    <p className="text-gray-600 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Posted {new Date(job.posted_at).toLocaleDateString()}</span>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

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
