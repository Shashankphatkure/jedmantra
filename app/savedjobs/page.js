'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          router.push('/login')
          return
        }

        const { data, error } = await supabase
          .from('saved_jobs')
          .select(`
            job_id,
            jobs:job_id (
              id,
              title,
              company_name,
              location,
              department,
              job_type,
              experience_level,
              is_remote,
              salary_min,
              salary_max,
              salary_currency,
              posted_at,
              description
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        setSavedJobs(data.map(item => item.jobs))
      } catch (error) {
        console.error('Error fetching saved jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedJobs()
  }, [supabase, router])

  const handleUnsaveJob = async (jobId) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        router.push('/login')
        return
      }

      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .match({ 
          job_id: jobId,
          user_id: user.id 
        })

      if (error) throw error

      // Update local state to remove the unsaved job
      setSavedJobs(savedJobs.filter(job => job.id !== jobId))

    } catch (error) {
      console.error('Error unsaving job:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading saved jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Saved Jobs
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Keep track of the positions you're interested in
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {savedJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">You haven't saved any jobs yet.</p>
            <Link 
              href="/jobs" 
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {savedJobs.map((job) => (
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
                    onClick={() => handleUnsaveJob(job.id)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    title="Remove from saved jobs"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
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
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleUnsaveJob(job.id)}
                      className="inline-flex items-center px-3 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
                    >
                      Unsave
                    </button>
                    <Link 
                      href={`/jobs/${job.id}`}
                      className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
