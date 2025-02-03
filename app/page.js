import {
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  UserCircleIcon,
  StarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

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
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12">
              Search through thousands of job listings and courses to advance
              your career
            </p>

            {/* Search Form */}
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    What
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Job title, skill or company"
                  />
                </div>
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Where
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="City or postcode"
                  />
                  <button className="absolute right-3 top-9 text-gray-400 hover:text-pink-500">
                    <MapPinIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <Link
                href="/jobs"
                className="w-full mt-4 bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center justify-center group"
              >
                Search Jobs
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Job Stats */}
            <div className="mt-8 text-white/90">
              <p className="text-lg mb-4">
                <span className="font-semibold">139,056</span> new jobs -
                <span className="font-semibold"> 1,598</span> added today
              </p>
              <button className="inline-flex items-center text-white font-medium hover:text-white/80 group">
                Browse All Jobs
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Course Banner */}
      <div className="bg-gray-100 py-4 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <a
            href="/courses"
            className="text-lg text-gray-900 hover:text-pink-600 flex items-center justify-center gap-2 group"
          >
            Your next skill, from just ₹999. Browse thousands of courses now
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
            "Work from home jobs",
            "Immediate start jobs",
            "Manager jobs",
            "Finance jobs",
            "Warehouse jobs",
            "Accountant jobs",
            "Administrator jobs",
            "Part time jobs",
            "Receptionist jobs",
            "Customer service jobs",
            "Data entry jobs",
            "Graduate jobs",
          ].map((job, index) => (
            <button
              key={index}
              className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              {job}
            </button>
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
              <div
                key={job.id}
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
                      {job.salary_min && `${job.salary_min.toLocaleString()}`}
                      {job.salary_min && job.salary_max && ' - '}
                      {job.salary_max && `${job.salary_max.toLocaleString()}`}
                      {' ' + job.salary_currency}
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
                  Apply Now
                  <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
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
              <div
                key={course.id}
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
                    <button className="flex items-center text-blue-600 font-medium hover:text-blue-800 group">
                      Learn More
                      <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
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
