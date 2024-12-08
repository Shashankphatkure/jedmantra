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
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";

export default function JobDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              

              {/* Job Title and Tags */}
              <h1 className="text-4xl font-bold text-white mb-6">
                Senior Software Engineer
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <BriefcaseIcon className="h-5 w-5 text-white/90 mr-2" />
                  <span className="text-white/90">Full-time</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <GlobeAltIcon className="h-5 w-5 text-white/90 mr-2" />
                  <span className="text-white/90">Remote Available</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <AcademicCapIcon className="h-5 w-5 text-white/90 mr-2" />
                  <span className="text-white/90">Senior Level</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <ClockIcon className="h-5 w-5 text-white/90 mr-2" />
                  <span className="text-white/90">Posted 2 days ago</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-1">Experience</div>
                  <div className="text-white font-semibold">5+ years</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-1">Salary Range</div>
                  <div className="text-white font-semibold">£65K - £85K</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-1">Department</div>
                  <div className="text-white font-semibold">Engineering</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-1">Team Size</div>
                  <div className="text-white font-semibold">15-20 people</div>
                </div>
              </div>

              

              {/* Recruiter Details */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Your Recruiter</h3>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src="https://randomuser.me/api/portraits/women/45.jpg"
                      alt="Sarah Wilson"
                      className="h-12 w-12 rounded-full border-2 border-white/20"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-white font-medium">Sarah Wilson</h4>
                      <span className="bg-green-500/20 text-green-100 text-xs px-2 py-0.5 rounded-full">
                        Online
                      </span>
                    </div>
                    <p className="text-white/70 text-sm">Senior Tech Recruiter at Tech Company Ltd</p>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-white/60 text-xs mb-1">Response Rate</div>
                        <div className="text-white font-medium">95%</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-white/60 text-xs mb-1">Avg. Response</div>
                        <div className="text-white font-medium"> 24 hours</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center space-x-4">
                      <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-2 text-white">
                        <EnvelopeIcon className="h-4 w-4" />
                        <span className="text-sm">Message</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-2 text-white">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-sm">Schedule Call</span>
                      </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-2 text-white/70 text-sm">
                        <UserGroupIcon className="h-4 w-4" />
                        <span>Currently hiring for 12 positions</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/70 text-sm mt-2">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        <span>Based in London Office</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">£65,000</span>
                    <span className="text-xl text-gray-500">- £85,000</span>
                  </div>
                  <p className="text-gray-600">Annual Salary</p>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center">
                    <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                    Apply Now
                  </button>
                  <button className="w-full bg-white text-blue-600 px-6 py-4 rounded-xl font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center">
                    <BookmarkIcon className="h-5 w-5 mr-2" />
                    Save Job
                  </button>
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
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
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

            {/* Job Description */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">About the role</h2>
              <div className="prose max-w-none">
                <p className="mb-4">
                  We are looking for a Senior Software Engineer to join our
                  growing team. You will be working on cutting-edge technology
                  solutions and helping to shape the future of our products.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-2">
                  Responsibilities:
                </h3>
                <ul className="list-disc pl-5 mb-4">
                  <li>Design and implement scalable software solutions</li>
                  <li>Lead technical projects and mentor junior developers</li>
                  <li>
                    Collaborate with cross-functional teams to define and
                    implement new features
                  </li>
                  <li>Write clean, maintainable, and efficient code</li>
                  <li>
                    Participate in code reviews and provide constructive
                    feedback
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-2">
                  Requirements:
                </h3>
                <ul className="list-disc pl-5 mb-4">
                  <li>
                    5+ years of professional software development experience
                  </li>
                  <li>Strong proficiency in JavaScript/TypeScript and React</li>
                  <li>Experience with Node.js and REST APIs</li>
                  <li>
                    Knowledge of software design patterns and architecture
                  </li>
                  <li>Excellent problem-solving and communication skills</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-2">Benefits:</h3>
                <ul className="list-disc pl-5">
                  <li>Competitive salary (£65,000 - £85,000)</li>
                  <li>Remote work options</li>
                  <li>25 days annual leave</li>
                  <li>Health insurance</li>
                  <li>Professional development budget</li>
                </ul>
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Recommended Courses
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2].map((course) => (
                  <div key={course} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-blue-600">
                        Advanced React Development
                      </h3>
                      <span className="text-sm text-gray-500">£49.99</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Master advanced React concepts and patterns used in modern
                      web applications.
                    </p>
                    <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      View Course
                    </button>
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
                        £65,000 - £85,000 a year
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
