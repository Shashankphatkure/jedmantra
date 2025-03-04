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
    remote: false,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 5
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [savedJobIds, setSavedJobIds] = useState(new Set())

  // Format currency in Indian format (INR)
  const formatIndianCurrency = (amount) => {
    if (!amount) return '—';
    
    // Format number in Indian style (with commas at thousands, lakhs, crores)
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
    
    return formatter.format(amount);
  };

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

    if (filters.remote) {
      result = result.filter(job => job.is_remote === true)
      console.log('Jobs after remote filter:', result.length)
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
      
      if (type === 'remote') {
        return { ...prev, remote: !prev.remote }
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
      remote: false,
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
        "Last 24 hours",
        "Last 3 days",
        "Last 7 days",
        "Last 14 days",
        "Last 30 days",
      ].map((option) => (
        <label
          key={option}
          className="flex items-center group cursor-pointer py-1 px-1.5 hover:bg-gray-50 rounded text-sm"
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="date"
              checked={filters.datePosted === option}
              onChange={() => handleFilterChange('datePosted', option)}
              className="h-3.5 w-3.5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
              {option}
            </span>
          </div>
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
        "Internship",
      ].map((type) => (
        <label key={type} className="flex items-center group cursor-pointer py-1 px-1.5 hover:bg-gray-50 rounded text-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={filters.jobType.includes(type)}
              onChange={() => handleFilterChange('jobType', type)}
              className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
              {type}
            </span>
          </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Find Your Dream Job
              </h1>
              <div className="flex gap-2">
                <Link 
                  href="/savedjobs"
                  className="inline-flex items-center px-2.5 py-1 border border-white/30 text-xs font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-1"
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
                  className="inline-flex items-center px-2.5 py-1 border border-white/30 text-xs font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-1"
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
          </div>

          {/* Improved Search Form */}
          <div className="bg-white p-3 rounded-lg shadow-md">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, keyword, or company"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search for jobs"
                />
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City, state, or remote"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Location"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 text-sm rounded-md hover:bg-blue-700 transition-colors flex-shrink-0 font-medium"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        
        {/* Subtle wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Updated Filters Sidebar */}
          <div className="lg:w-64 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-5">
                {/* Date Posted Filter */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">Date Posted</h4>
                  <div className="space-y-1.5">
                    {[
                      "Last 24 hours",
                      "Last 3 days",
                      "Last 7 days",
                      "Last 14 days",
                      "Last 30 days",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex items-center group cursor-pointer py-1 px-1.5 hover:bg-gray-50 rounded text-sm"
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="date"
                            checked={filters.datePosted === option}
                            onChange={() => handleFilterChange('datePosted', option)}
                            className="h-3.5 w-3.5 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                            {option}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Job Type Filter */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">Job Type</h4>
                  <div className="space-y-1.5">
                    {[
                      "Full-time",
                      "Part-time",
                      "Contract",
                      "Freelance",
                      "Internship",
                    ].map((type) => (
                      <label key={type} className="flex items-center group cursor-pointer py-1 px-1.5 hover:bg-gray-50 rounded text-sm">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.jobType.includes(type)}
                            onChange={() => handleFilterChange('jobType', type)}
                            className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                            {type}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Salary Range Filter */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">Salary Range</h4>
                  <div className="space-y-1.5">
                    {[
                      "₹0 - ₹20,000",
                      "₹20,000 - ₹30,000",
                      "₹30,000 - ₹50,000",
                      "₹50,000 - ₹70,000",
                      "₹70,000+",
                    ].map((range) => (
                      <label key={range} className="flex items-center group cursor-pointer py-1 px-1.5 hover:bg-gray-50 rounded text-sm">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.salaryRange.includes(range)}
                            onChange={() => handleFilterChange('salaryRange', range)}
                            className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                            {range}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Level Filter */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">Experience Level</h4>
                  <div className="space-y-1.5">
                    {[
                      "Entry Level",
                      "Mid Level",
                      "Senior Level",
                      "Director",
                      "Executive",
                    ].map((level) => (
                      <label key={level} className="flex items-center group cursor-pointer py-1 px-1.5 hover:bg-gray-50 rounded text-sm">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.experienceLevel.includes(level)}
                            onChange={() => handleFilterChange('experienceLevel', level)}
                            className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                            {level}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Remote Work Filter */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">Remote Work</h4>
                  <label className="flex items-center group cursor-pointer py-1 px-1.5 hover:bg-gray-50 rounded text-sm">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                        Remote Only
                      </span>
                    </div>
                  </label>
                </div>

                {/* Add Remote Filter */}
                <div className="mt-4">
                  <label className="flex items-center group cursor-pointer py-1 px-1.5 hover:bg-gray-50 rounded text-sm">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.remote}
                        onChange={() => handleFilterChange('remote')}
                        className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                        Remote Jobs Only
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.datePosted || filters.jobType.length > 0 || filters.salaryRange.length > 0 || filters.experienceLevel.length > 0 || searchQuery || locationQuery) && (
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
                  {filters.datePosted && (
                    <div className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 text-xs">
                      <span className="mr-1">{filters.datePosted}</span>
                      <button 
                        onClick={() => setFilters(prev => ({ ...prev, datePosted: '' }))}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {filters.jobType.map(type => (
                    <div key={type} className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 text-xs">
                      <span className="mr-1">{type}</span>
                      <button 
                        onClick={() => handleFilterChange('jobType', type)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {filters.salaryRange.map(range => (
                    <div key={range} className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 text-xs">
                      <span className="mr-1">{range}</span>
                      <button 
                        onClick={() => handleFilterChange('salaryRange', range)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {filters.experienceLevel.map(level => (
                    <div key={level} className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-2.5 py-1 text-xs">
                      <span className="mr-1">{level}</span>
                      <button 
                        onClick={() => handleFilterChange('experienceLevel', level)}
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

          {/* Job Listings - Updated to use real data */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{filteredJobs.length}</span> jobs found
                {searchQuery && <span> for "<span className="italic">{searchQuery}</span>"</span>}
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-600 sr-only">Sort by</label>
                <select 
                  id="sort"
                  className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option>Most relevant</option>
                  <option>Newest first</option>
                  <option>Highest paid</option>
                  <option>Closest to you</option>
                </select>
              </div>
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
              <div className="space-y-4">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 relative overflow-hidden"
                  >
                    {/* Save/Favorite Button - Positioned at top right */}
                    <button 
                      onClick={() => handleSaveJob(job.id)}
                      className={`absolute top-2 right-2 z-10 p-1.5 rounded-full ${
                        savedJobIds.has(job.id) 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      } transition-colors`}
                      title={savedJobIds.has(job.id) ? "Remove from saved jobs" : "Save job"}
                      aria-label={savedJobIds.has(job.id) ? "Remove from saved jobs" : "Save job"}
                    >
                      <svg
                        className="h-5 w-5"
                        fill={savedJobIds.has(job.id) ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={savedJobIds.has(job.id) ? "0" : "2"}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                    
                    <div className="flex items-start gap-3 mt-2">
                      {/* Company Logo */}
                      <div className="hidden sm:flex flex-shrink-0 w-10 h-10 bg-gray-50 rounded-md overflow-hidden items-center justify-center border border-gray-200">
                        {job.company_logo ? (
                          <Image 
                            src={job.company_logo} 
                            alt={`${job.company_name} logo`}
                            width={40}
                            height={40}
                            className="object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder-logo.png";
                            }}
                          />
                        ) : (
                          <span className="text-lg font-bold text-gray-400">
                            {job.company_name?.charAt(0) || "C"}
                          </span>
                        )}
                      </div>
                      
                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 hover:text-blue-600 truncate pr-10">
                              <Link href={`/jobs/${job.id}`}>
                                {job.title}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-600 mt-0.5 flex items-center flex-wrap gap-x-2">
                              <span className="font-medium truncate">{job.company_name}</span>
                              <span className="inline-flex items-center">
                                <svg className="h-3.5 w-3.5 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span className="truncate">{job.location}</span>
                              </span>
                              {job.department && (
                                <span className="truncate text-gray-500">
                                  {job.department}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        
                        {/* Job Tags */}
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                            {job.job_type}
                          </span>
                          {job.is_remote && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700">
                              Remote
                            </span>
                          )}
                          {job.experience_level && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700">
                              {job.experience_level}
                            </span>
                          )}
                          {job.skills && job.skills.length > 0 && job.skills.slice(0, 2).map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                              {skill}
                            </span>
                          ))}
                          {job.skills && job.skills.length > 2 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                              +{job.skills.length - 2} more
                            </span>
                          )}
                        </div>
                        
                        {/* Salary and Posted Date */}
                        <div className="mt-2 flex justify-between items-center text-sm">
                          <div className="flex items-center text-gray-500 gap-3">
                            {(job.salary_min || job.salary_max) && (
                              <span className="flex items-center">
                                <svg className="h-3.5 w-3.5 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                                {formatIndianCurrency(job.salary_min)} - {formatIndianCurrency(job.salary_max)}
                              </span>
                            )}
                            <span className="flex items-center">
                              <svg className="h-3.5 w-3.5 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              {new Date(job.posted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <Link 
                            href={`/jobs/${job.id}`} 
                            className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-1.5 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Show limited page numbers with ellipsis for better UX */}
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Always show first page, last page, current page, and pages around current
                    const showPageNumber = pageNumber === 1 || 
                                          pageNumber === totalPages || 
                                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
                    
                    // Show ellipsis where needed
                    if (!showPageNumber) {
                      // Show ellipsis after first page if there's a gap
                      if (pageNumber === 2 && currentPage > 3) {
                        return (
                          <span key={pageNumber} className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                        );
                      }
                      // Show ellipsis before last page if there's a gap
                      if (pageNumber === totalPages - 1 && currentPage < totalPages - 2) {
                        return (
                          <span key={pageNumber} className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium ${
                          currentPage === pageNumber
                            ? "text-white bg-blue-600 hover:bg-blue-700 z-10"
                            : "text-gray-500 bg-white hover:bg-gray-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-1.5 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
            
            {/* Job Count Summary */}
            <div className="mt-4 text-center text-xs text-gray-500">
              Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
