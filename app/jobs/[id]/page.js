import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPinIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ClockIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  CalendarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ClipboardIcon,
  GiftIcon
} from "@heroicons/react/24/outline";
import JobActionButtons from './JobActionButtons';

async function getJobDetails(jobId) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch job details and courses in parallel
  const [jobResult, coursesResult] = await Promise.all([
    supabase
      .from('jobs')
      .select(`
        *,
        job_recruiters (
          recruiters (
            *
          )
        ),
        job_skill_requirements (
          job_skills (
            name
          )
        )
      `)
      .eq('id', jobId)
      .single(),

    supabase
      .from('courses')
      .select(`
        id,
        title,
        description,
        price,
        video_hours,
        skill_level,
        total_students,
        course_image,
        rating,
        instructor_name
      `)
      .limit(2) // Adjust as needed
  ]);

  if (jobResult.error) {
    console.error('Error fetching job:', jobResult.error);
    return null;
  }

  return {
    job: jobResult.data,
    courses: coursesResult.data || []
  };
}

export default async function JobDetail({ params }) {
  const data = await getJobDetails(params.id);

  if (!data) {
    notFound();
  }

  const { job, courses } = data;
  const recruiter = job.job_recruiters?.[0]?.recruiters || null;
  const skills = job.job_skill_requirements?.map(skill => skill.job_skills.name) || [];

  // Format salary for display in Indian format (INR)
  const formatSalary = (amount) => {
    if (!amount) return '—';

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate time since posting
  const getTimeAgo = (timestamp) => {
    const days = Math.floor((new Date() - new Date(timestamp)) / (1000 * 60 * 60 * 24));
    return `Posted ${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                {job.status !== 'Open' && (
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                    {job.status}
                  </span>
                )}
                {job.is_remote && (
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    Remote Available
                  </span>
                )}
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {job.job_type}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {job.title}
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                {job.short_description}
              </p>

              <div className="flex items-center space-x-4 text-gray-600 mb-6">
                <div className="flex items-center">
                  <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                  <span className="ml-1">{job.experience_level} Level</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <span className="ml-1">{getTimeAgo(job.posted_at)}</span>
                </div>
                <span>•</span>
                <span>{job.application_count?.toLocaleString() || 0} applications</span>
              </div>

              <div className="mt-8 bg-gray-50 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Experience</div>
                    <div className="text-gray-900 font-semibold">{job.required_experience_years}+ years</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Salary Range</div>
                    <div className="text-gray-900 font-semibold">
                      {formatSalary(job.salary_min)} - {formatSalary(job.salary_max)}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Department</div>
                    <div className="text-gray-900 font-semibold">{job.department}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Team Size</div>
                    <div className="text-gray-900 font-semibold">{job.team_size}</div>
                  </div>
                </div>

                {recruiter && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Your Recruiter</h4>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={recruiter.avatar_url || "https://randomuser.me/api/portraits/women/45.jpg"}
                          alt={`${recruiter.first_name} ${recruiter.last_name}`}
                          className="h-12 w-12 rounded-full border-2 border-gray-100"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-gray-900 font-medium">
                            {recruiter.first_name} {recruiter.last_name}
                          </h4>
                          <span className={`${recruiter.is_online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-xs px-2 py-0.5 rounded-full`}>
                            {recruiter.is_online ? 'Online' : 'Offline'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{recruiter.title} at {recruiter.company}</p>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-gray-500 text-xs mb-1">Response Rate</div>
                            <div className="text-gray-900 font-medium">{recruiter.response_rate}%</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-gray-500 text-xs mb-1">Avg. Response</div>
                            <div className="text-gray-900 font-medium">{recruiter.avg_response_time} hours</div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center space-x-4">
                          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg px-4 py-2 text-gray-800">
                            <EnvelopeIcon className="h-4 w-4" />
                            <span className="text-sm">Message</span>
                          </button>
                          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg px-4 py-2 text-gray-800">
                            <CalendarIcon className="h-4 w-4" />
                            <span className="text-sm">Schedule Call</span>
                          </button>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-2 text-gray-600 text-sm">
                            <UserGroupIcon className="h-4 w-4" />
                            <span>Currently hiring for {recruiter.current_hiring_count} positions</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 text-sm mt-2">
                            <BuildingOfficeIcon className="h-4 w-4" />
                            <span>Based in {recruiter.office_location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Application Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">{formatSalary(job.salary_min)}</span>
                    <span className="text-xl text-gray-500">- {formatSalary(job.salary_max)}</span>
                  </div>
                  <p className="text-gray-600">Monthly Salary</p>
                </div>

                <div className="space-y-4">
                  <JobActionButtons jobId={job.id} />
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">How to Apply</h3>
                    <span className="text-sm text-gray-500">Takes 5 mins</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span>Quick online application</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span>Direct to hiring manager</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span>Response within 48 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Job Header */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Senior Software Engineer
                  </h1>
                  <div className="mt-2">
                    <p className="text-lg text-gray-600">
                      Tech Company Ltd • London
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Full-time
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Remote
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Senior Level
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <svg
                    className="h-6 w-6"
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
                </button>
              </div>
            </div>

            {/* Job Description - Updated Layout */}
            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">About the role</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-8">
                  We are looking for a Senior Software Engineer to join our
                  growing team. You will be working on cutting-edge technology
                  solutions and helping to shape the future of our products.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-blue-100 p-2 rounded-lg mr-3">
                          <ClipboardIcon className="h-5 w-5 text-blue-600" />
                        </span>
                        Responsibilities
                      </h3>
                      <ul className="space-y-3">
                        {job.responsibilities?.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-purple-100 p-2 rounded-lg mr-3">
                          <AcademicCapIcon className="h-5 w-5 text-purple-600" />
                        </span>
                        Requirements
                      </h3>
                      <ul className="space-y-3">
                        {job.requirements?.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-green-100 p-2 rounded-lg mr-3">
                      <GiftIcon className="h-5 w-5 text-green-600" />
                    </span>
                    Benefits
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {job.benefits?.map((benefit, index) => (
                      <div key={index} className="flex items-center bg-white p-3 rounded-lg">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Courses - Updated Layout */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Recommended Courses</h2>
                <Link href="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Courses →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 relative">
                      <Image
                        src={course.course_image || '/default-course-image.jpg'}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <span className="text-blue-600 font-medium">
                          {new Intl.NumberFormat('en-GB', {
                            style: 'currency',
                            currency: 'GBP'
                          }).format(course.price)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {course.video_hours} hours
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <AcademicCapIcon className="h-4 w-4 mr-1" />
                          {course.skill_level}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                          {new Intl.NumberFormat('en-GB', {
                            notation: 'compact',
                            maximumFractionDigits: 1
                          }).format(course.total_students)} students
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${
                                star <= Math.round(course.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{course.rating.toFixed(1)}</span>
                      </div>
                      <Link
                        href={`/courses/${course.id}`}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-96">
            <div className="bg-white p-6 rounded-lg shadow sticky top-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Job Overview</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-gray-400 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Job Type
                      </p>
                      <p className="text-sm text-gray-500">Full-time</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-gray-400 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Location
                      </p>
                      <p className="text-sm text-gray-500">
                        London (Remote Available)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-gray-400 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Salary
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatSalary(job.salary_min)} - {formatSalary(job.salary_max)} Monthly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-gray-400 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Experience
                      </p>
                      <p className="text-sm text-gray-500">5+ years</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
                <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors">
                  Save Job
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium text-gray-900">
                  Share this job
                </h3>
                <div className="mt-4 flex space-x-4">
                  <button className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Share on LinkedIn</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Share on Twitter</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Share via Email</span>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
