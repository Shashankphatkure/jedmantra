import {
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  UserCircleIcon,
  StarIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .order('posted_at', { ascending: false })
    .limit(6)

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="min-h-[50vh] sm:min-h-[200px] bg-gray-50 relative overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 flex flex-col md:flex-row items-center justify-between w-full">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join us & Explore Thousands of Jobs
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find Jobs, Employment & Career Opportunities
            </p>

            {/* Search Form */}
            <div className="w-full bg-white p-4 rounded-2xl shadow-xl backdrop-blur-sm bg-white/90 border border-gray-100 hover:shadow-2xl transition-shadow duration-200">
              <form action="/jobs" method="get" className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    What
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="search"
                      placeholder="Job title, keywords..."
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white placeholder:text-gray-400 text-gray-600"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Where
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      placeholder="City or postcode"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white placeholder:text-gray-400 text-gray-600"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
                  >
                    Find Jobs
                  </button>
                </div>
              </form>

              <div className="mt-4">
                <p className="text-sm text-gray-600">Popular Searches : </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Designer', 'Developer', 'Web', 'IOS', 'PHP', 'Senior', 'Engineer'].map((tag) => (
                    <a 
                      key={tag}
                      href={`/jobs?search=${tag}`}
                      className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
                    >
                      {tag}{tag !== 'Engineer' && ','}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block w-full max-w-3xl">
            <Image
              src="/herosection.png"
              alt="Job Search Illustration"
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Course Banner */}
      <div className="bg-gray-100 py-3 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <a
            href="/courses"
            className="text-sm text-gray-900 hover:text-blue-600 flex items-center justify-center gap-2 group"
          >
            Your next skill, from just ₹999. Browse thousands of courses now
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          </a>
        </div>
      </div>

      {/* User Type Selection */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select your journey and unlock opportunities tailored just for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Job Seeker",
                description:
                  "Find your dream job and advance your career with thousands of opportunities",
                icon: BriefcaseIcon,
                gradient: "from-blue-500 to-indigo-600",
                features: [
                  "Smart job matching",
                  "Application tracking",
                  "Salary insights",
                ],
                cta: "Find Jobs",
                href: "/jobs"
              },
              {
                title: "Course Learner",
                description:
                  "Enhance your skills with expert-led courses and get certified",
                icon: AcademicCapIcon,
                gradient: "from-purple-500 to-pink-600",
                features: [
                  "Self-paced learning",
                  "Industry certificates",
                  "Expert mentorship",
                ],
                cta: "Start Learning",
                href: "/courses"
              },
              {
                title: "Recruiter/Tutor",
                description:
                  "Post jobs or create courses to reach talented individuals",
                icon: UserGroupIcon,
                gradient: "from-pink-500 to-rose-600",
                features: [
                  "Smart candidate matching",
                  "Analytics dashboard",
                  "Applicant tracking",
                ],
                cta: "Get Started",
                href: "/recruiter"
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
                    >
                      <item.icon className="h-8 w-8" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-center mb-8">
                    {item.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {item.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <svg
                          className={`w-5 h-5 ${
                            index === 0
                              ? "text-blue-500"
                              : index === 1
                              ? "text-purple-500"
                              : "text-pink-500"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={item.href}
                    className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center group/btn ${
                      index === 0
                        ? "bg-blue-500 hover:bg-blue-600"
                        : index === 1
                        ? "bg-purple-500 hover:bg-purple-600"
                        : "bg-pink-500 hover:bg-pink-600"
                    }`}
                  >
                    {item.cta}
                    <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Trending jobs</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: "Work from home jobs", query: "remote" },
            { name: "Immediate start jobs", query: "immediate" },
            { name: "Manager jobs", query: "manager" },
            { name: "Finance jobs", query: "finance" },
            { name: "Warehouse jobs", query: "warehouse" },
            { name: "Accountant jobs", query: "accountant" },
            { name: "Administrator jobs", query: "administrator" },
            { name: "Part time jobs", query: "part-time" },
            { name: "Receptionist jobs", query: "receptionist" },
            { name: "Customer service jobs", query: "customer-service" },
            { name: "Data entry jobs", query: "data-entry" },
            { name: "Graduate jobs", query: "graduate" },
          ].map((job, index) => (
            <Link
              key={index}
              href={`/jobs?search=${job.query}`}
              className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              {job.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="bg-gradient-to-b from-purple-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Jobs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover opportunities that match your skills and aspirations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {jobs?.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block"
              >
                <div
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-gray-600">{job.company_name}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {job.job_type}
                    </span>
                  </div>
                  <div className="space-y-3 mb-4">
                    <p className="text-gray-600 flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                      {job.location} {job.is_remote && '(Remote)'}
                    </p>
                    {(job.salary_min || job.salary_max) && (
                      <p className="text-gray-600 flex items-center">
                        <CurrencyPoundIcon className="h-5 w-5 mr-2 text-gray-400" />
                        {job.salary_min && `₹${Math.round(job.salary_min * 105).toLocaleString('en-IN')}`}
                        {job.salary_min && job.salary_max && ' - '}
                        {job.salary_max && `₹${Math.round(job.salary_max * 105).toLocaleString('en-IN')}`}
                        {' INR'}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.skills?.slice(0, 3).map((skill, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors flex items-center justify-center group">
                    View Details
                    <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/jobs"
              className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors group"
            >
              View all jobs
              <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Level up your skills with industry-leading courses
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {courses?.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="block"
              >
                <div
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={course.course_image || `https://picsum.photos/800/600`}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {course.skill_level && (
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {course.skill_level}
                        </span>
                      )}
                      {course.video_hours && (
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {course.video_hours}h
                        </span>
                      )}
                    </div>
                    {course.bestseller && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Bestseller
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <UserCircleIcon className="h-5 w-5 mr-2" />
                      {course.instructor_name}
                      {course.instructor_title && ` - ${course.instructor_title}`}
                    </p>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center text-yellow-400">
                        <StarIcon className="h-5 w-5" />
                        <span className="ml-1 font-medium">{course.rating}</span>
                      </div>
                      <span className="text-gray-500 ml-2">
                        ({course.review_count?.toLocaleString() || 0} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-2xl">₹{course.price}</span>
                        {course.original_price && (
                          <span className="text-gray-500 line-through ml-2">
                            ₹{course.original_price}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-blue-600 font-medium hover:text-blue-800 group">
                        View Course
                        <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/courses"
              className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors group"
            >
              View all courses
              <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Active Jobs" },
              { number: "500+", label: "Courses" },
              { number: "1M+", label: "Users" },
              { number: "200+", label: "Partner Companies" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-blue-600">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support for you Section */}
      <div className="bg-gradient-to-b from-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Support for Your Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're starting your career or looking to level up, we've
              got the resources to help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Learning Resources */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
                  alt="Online Learning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-blue-600/20 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      Learning Resources
                    </h3>
                    <p className="text-blue-100">
                      Access thousands of courses to build your skills
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    "Professional Certifications",
                    "Industry-specific Training",
                    "Soft Skills Development",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/courses"
                  className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group"
                >
                  Explore Courses
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Career Guidance */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800"
                  alt="Career Guidance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/90 to-purple-600/20 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Career Guidance</h3>
                    <p className="text-purple-100">
                      Expert advice to advance your career
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    "Resume Building",
                    "Interview Preparation",
                    "Career Path Planning",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/career-advice"
                  className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center group"
                >
                  Get Career Advice
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Personal Development */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
                  alt="Personal Development"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-600/90 to-pink-600/20 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Personal Growth</h3>
                    <p className="text-pink-100">
                      Resources for holistic development
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    "Mental Health Support",
                    "Work-Life Balance",
                    "Networking Tips",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-pink-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/career-advice"
                  className="mt-6 w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center justify-center group"
                >
                  Explore Resources
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
