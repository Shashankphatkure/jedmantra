'use client'

import Image from "next/image";
import Link from "next/link";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  MapPinIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  ClockIcon,
  UserGroupIcon,
  CalendarIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  LinkIcon,
  StarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  CheckIcon,
  HeartIcon,
  BookmarkIcon
} from "@heroicons/react/24/outline";

export default function CompanyProfile() {
  const params = useParams()
  const supabase = createClientComponentClient()
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('about')

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) throw error

        setCompany(data)
      } catch (error) {
        console.error('Error:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-xl font-medium text-gray-700">Loading company profile...</p>
          <p className="mt-2 text-gray-500">Please wait while we fetch the company details.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-xl font-medium text-gray-700">Error Loading Company</p>
          <p className="mt-2 text-red-600">{error}</p>
          <Link href="/companies" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Companies
          </Link>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
            <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-xl font-medium text-gray-700">Company Not Found</p>
          <p className="mt-2 text-gray-500">The company you're looking for doesn't exist or has been removed.</p>
          <Link href="/companies" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Companies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Section */}
      <div className="relative h-36 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 800">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/30"></div>
      </div>
      
      {/* Company Info Section - Positioned to overlap the cover */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-xl bg-white p-2 shadow-md border-2 border-gray-100 self-center md:self-start flex-shrink-0">
                <Image
                src={company.logo_url || "https://via.placeholder.com/150"}
                  alt={company.name}
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
            
            {/* Company Details */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {company.name}
                  </h1>
                  {company.verified && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                      Verified
                    </span>
                  )}
                </div>
              
              <div className="mt-2 flex flex-wrap items-center text-gray-600 gap-3">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 mr-1.5 text-gray-500" />
                  <span>{company.industry}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-1.5 text-gray-500" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 mr-1.5 text-gray-500" />
                  <span>{company.company_size}</span>
                </div>
                {company.founded_year && (
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-1.5 text-gray-500" />
                    <span>Founded {company.founded_year}</span>
                  </div>
                )}
              </div>
              
              {/* Rating */}
              <div className="mt-3 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(company.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {company.rating} ({company.review_count || 0} reviews)
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 md:self-start mt-4 md:mt-0 flex-shrink-0">
              <div className="flex flex-wrap gap-2">
                <a 
                  href={company.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
                  Website
                </a>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <BookmarkIcon className="h-4 w-4 mr-2 text-gray-500" />
                  Save
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {[
              { id: 'about', label: 'About', icon: <BuildingOfficeIcon className="h-5 w-5" /> },
              { id: 'jobs', label: 'Open Positions', icon: <BriefcaseIcon className="h-5 w-5" /> },
              { id: 'reviews', label: 'Reviews', icon: <StarIcon className="h-5 w-5" /> },
              { id: 'benefits', label: 'Benefits', icon: <HeartIcon className="h-5 w-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.id === 'jobs' && company.open_positions > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {company.open_positions}
                  </span>
                )}
                {tab.id === 'reviews' && company.review_count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {company.review_count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'about' && (
              <>
                {/* About Section */}
                <section className="bg-white shadow-sm rounded-xl p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <BuildingOfficeIcon className="h-6 w-6 text-blue-500 mr-2" />
                    About {company.name}
                  </h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p className="whitespace-pre-wrap">
                    {company.description}
                  </p>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                        Company Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Founded</h4>
                          <p className="mt-1 text-base text-gray-900">{company.founded_year || 'Not specified'}</p>
                        </div>
                    <div>
                          <h4 className="text-sm font-medium text-gray-500">Industry</h4>
                          <p className="mt-1 text-base text-gray-900">{company.industry}</p>
                    </div>
                    <div>
                          <h4 className="text-sm font-medium text-gray-500">Company size</h4>
                          <p className="mt-1 text-base text-gray-900">{company.company_size}</p>
                    </div>
                    <div>
                          <h4 className="text-sm font-medium text-gray-500">Headquarters</h4>
                          <p className="mt-1 text-base text-gray-900">{company.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <LinkIcon className="h-5 w-5 text-blue-500 mr-2" />
                        Connect with {company.name}
                      </h3>
                      <div className="space-y-4">
                    <div>
                          <h4 className="text-sm font-medium text-gray-500">Website</h4>
                      <a
                        href={company.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                            className="mt-1 text-base text-blue-600 hover:text-blue-500 flex items-center"
                      >
                        {company.website_url}
                            <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                        {company.linkedin_url && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">LinkedIn</h4>
                            <a
                              href={company.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 text-base text-blue-600 hover:text-blue-500 flex items-center"
                            >
                              LinkedIn Profile
                              <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        )}
                        {company.twitter_url && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Twitter</h4>
                            <a
                              href={company.twitter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 text-base text-blue-600 hover:text-blue-500 flex items-center"
                            >
                              Twitter Profile
                              <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Email</h4>
                          <a
                            href={`mailto:${company.email || 'contact@' + company.name.toLowerCase().replace(/\s+/g, '') + '.com'}`}
                            className="mt-1 text-base text-blue-600 hover:text-blue-500 flex items-center"
                          >
                            {company.email || 'Contact via website'}
                            {company.email && (
                              <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Culture & Values */}
                {company.culture_values && company.culture_values.length > 0 && (
                  <section className="bg-white shadow-sm rounded-xl p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <HeartIcon className="h-6 w-6 text-blue-500 mr-2" />
                      Culture & Values
                    </h2>
                    <p className="text-gray-600 mb-6">
                      At {company.name}, we believe in fostering a workplace environment that reflects our core values:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {company.culture_values.map((value, index) => (
                        <div
                          key={index}
                          className="flex items-start p-5 bg-blue-50 rounded-lg border border-blue-100 transition-all hover:shadow-md"
                        >
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                            <CheckIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <p className="text-lg font-medium text-gray-900">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {activeTab === 'jobs' && (
              <section className="bg-white shadow-sm rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <BriefcaseIcon className="h-6 w-6 text-blue-500 mr-2" />
                    Open Positions
                  </h2>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {company.open_positions || 0} positions
                  </span>
                </div>
                
                {company.open_positions > 0 ? (
                  <div className="space-y-4">
                    {/* This is a placeholder for job listings. In a real app, you would fetch and map through actual job listings */}
                    {[...Array(Math.min(company.open_positions || 1, 3))].map((_, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {['Software Engineer', 'Product Manager', 'UX Designer', 'Marketing Specialist', 'Data Analyst'][index % 5]}
                            </h3>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                              <div className="flex items-center">
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                <span>{company.location}</span>
                              </div>
                              <div className="flex items-center">
                                <BriefcaseIcon className="h-4 w-4 mr-1" />
                                <span>Full-time</span>
                              </div>
                              <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                <span>Posted {(index + 1) * 3} days ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                              <BookmarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS'].slice(0, 3 + index).map((skill) => (
                            <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="h-5 w-5 text-green-500 mr-1" />
                            <span className="text-green-600 font-medium">
                              {['₹15L - ₹25L', '₹20L - ₹30L', '₹18L - ₹28L'][index % 3]} per year
                            </span>
                          </div>
                          <Link 
                            href={`/jobs/${index + 1}`} 
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6 text-center">
                      <Link 
                        href={`/companies/${company.id}/jobs`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View All Positions
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No open positions</h3>
                    <p className="mt-1 text-gray-500">
                      {company.name} doesn't have any open positions at the moment.
                    </p>
                  </div>
                )}
              </section>
            )}

            {activeTab === 'reviews' && (
              <section className="bg-white shadow-sm rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <StarIcon className="h-6 w-6 text-blue-500 mr-2" />
                    Employee Reviews
                  </h2>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(company.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {company.rating} out of 5 ({company.review_count} reviews)
                    </span>
                  </div>
                </div>
                
                {company.review_count > 0 ? (
                  <div className="space-y-6">
                    {/* Rating breakdown */}
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Breakdown</h3>
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          // Calculate a random percentage for each rating level
                          const percentage = rating === 5 ? 65 : 
                                            rating === 4 ? 20 : 
                                            rating === 3 ? 10 : 
                                            rating === 2 ? 3 : 2;
                          
                          return (
                            <div key={rating} className="flex items-center">
                              <div className="w-24 flex items-center">
                                <span className="text-sm font-medium text-gray-600">{rating} stars</span>
                              </div>
                              <div className="flex-1 h-4 mx-4 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-400 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <div className="w-16 text-right">
                                <span className="text-sm font-medium text-gray-600">{percentage}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Review list */}
                    <div className="space-y-6">
                      {/* This is a placeholder for reviews. In a real app, you would fetch and map through actual reviews */}
                      {[...Array(Math.min(company.review_count, 3))].map((_, index) => {
                        const rating = 5 - (index % 3);
                        const date = new Date();
                        date.setMonth(date.getMonth() - index * 2);
                        
                        return (
                          <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                  {['JD', 'SK', 'AR', 'MP', 'BT'][index % 5]}
                                </div>
                                <div className="ml-4">
                                  <h4 className="text-lg font-medium text-gray-900">
                                    {['Former Employee', 'Current Employee', 'Former Intern'][index % 3]}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {['Software Engineer', 'Product Manager', 'UX Designer', 'Marketing Specialist', 'Data Analyst'][index % 5]} • {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={`h-5 w-5 ${
                                      i < rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h5 className="text-lg font-medium text-gray-900 mb-2">
                                {[
                                  "Great company culture and work-life balance",
                                  "Excellent learning opportunities but high pressure",
                                  "Amazing benefits and growth potential"
                                ][index % 3]}
                              </h5>
                              <p className="text-gray-600">
                                {[
                                  "I've been working at this company for over 2 years and I'm impressed with the culture. Management is supportive and there's a good work-life balance. The projects are challenging and interesting.",
                                  "The company provides excellent learning opportunities and the team is very collaborative. However, the workload can be intense at times with tight deadlines.",
                                  "The benefits package is one of the best in the industry. There's also great potential for career growth if you're willing to put in the effort."
                                ][index % 3]}
                              </p>
                            </div>
                            
                            <div className="mt-4 flex flex-wrap gap-4">
                              <div className="bg-green-50 rounded-lg px-4 py-2">
                                <h6 className="text-sm font-medium text-green-800">Pros</h6>
                                <ul className="mt-1 text-sm text-green-700 list-disc list-inside">
                                  <li>Great work-life balance</li>
                                  <li>Supportive management</li>
                                  <li>Good compensation</li>
                                </ul>
                              </div>
                              
                              <div className="bg-red-50 rounded-lg px-4 py-2">
                                <h6 className="text-sm font-medium text-red-800">Cons</h6>
                                <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                                  <li>Limited remote work options</li>
                                  <li>Slow promotion process</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Link 
                        href={`/companies/${company.id}/reviews`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View All Reviews
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No reviews yet</h3>
                    <p className="mt-1 text-gray-500">
                      Be the first to review {company.name}.
                    </p>
                  </div>
                )}
              </section>
            )}

            {activeTab === 'benefits' && (
              <section className="bg-white shadow-sm rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <HeartIcon className="h-6 w-6 text-blue-500 mr-2" />
                  Benefits & Perks
                </h2>
                
                {company.benefits && company.benefits.length > 0 ? (
                  <>
                    <p className="text-gray-600 mb-8">
                      {company.name} offers a comprehensive benefits package designed to support employees' well-being and professional growth.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                          Health & Wellness
                        </h3>
                        <ul className="space-y-3">
                          {['Health insurance', 'Dental coverage', 'Vision insurance', 'Mental health support', 'Gym membership'].map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Time Off
                        </h3>
                        <ul className="space-y-3">
                          {['Paid time off', 'Sick leave', 'Parental leave', 'Sabbatical opportunities', 'Flexible work hours'].map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Professional Development
                        </h3>
                        <ul className="space-y-3">
                          {['Learning stipend', 'Conference budget', 'Mentorship program', 'Career advancement', 'Training workshops'].map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <svg className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Financial Benefits
                        </h3>
                        <ul className="space-y-3">
                          {['Competitive salary', 'Performance bonuses', 'Stock options', 'Retirement plans', 'Financial planning'].map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Perks</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {company.benefits.map((benefit, index) => (
                    <div
                      key={index}
                            className="flex items-center p-3 bg-white rounded-lg border border-gray-200"
                          >
                            <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No benefits information</h3>
                    <p className="mt-1 text-gray-500">
                      Information about benefits at {company.name} is not available at the moment.
                    </p>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Stats */}
            <section className="bg-white shadow-sm rounded-xl p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <ChartBarIcon className="h-5 w-5 text-blue-500 mr-2" />
                Company Overview
              </h2>
              <dl className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                    Founded
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {company.founded_year || 'N/A'}
                  </dd>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <UserGroupIcon className="h-4 w-4 text-gray-400 mr-1" />
                    Employees
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {company.company_size}
                  </dd>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <StarIcon className="h-4 w-4 text-gray-400 mr-1" />
                    Rating
                  </dt>
                  <dd className="mt-1 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(company.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({company.review_count || 0} reviews)
                    </span>
                  </dd>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <BriefcaseIcon className="h-4 w-4 text-gray-400 mr-1" />
                    Open Positions
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {company.open_positions || 0}
                  </dd>
                </div>
              </dl>
            </section>

            {/* Social Links & Actions */}
            <section className="bg-white shadow-sm rounded-xl p-6">
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <BookmarkIcon className="h-5 w-5 mr-2" />
                Follow Company
              </button>
                <button className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  Contact Company
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Connect with {company.name}</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href={company.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href={company.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <span className="sr-only">Website</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </a>
                  {company.twitter_url && (
                    <a
                      href={company.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </section>
            
            {/* Similar Companies */}
            <section className="bg-white shadow-sm rounded-xl p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <BuildingOfficeIcon className="h-5 w-5 text-blue-500 mr-2" />
                Similar Companies
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <Link 
                    key={index}
                    href={`/companies/${index}`}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="h-10 w-10 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <Image
                        src={`https://picsum.photos/seed/company${index}/200/200`}
                        alt={`Similar Company ${index}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {['Acme Inc', 'TechCorp', 'Innovate Labs'][index - 1]}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {['Software', 'Technology', 'Research'][index - 1]}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
