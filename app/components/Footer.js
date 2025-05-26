import Link from 'next/link';
import { 
  BriefcaseIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm text-gray-600 shadow-lg">
      {/* Newsletter Section */}
      <div className="bg-[#2563eb] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-3xl font-bold mb-2">Stay Updated</h2>
              <p className="text-blue-100">Get the latest jobs, courses, and career advice right in your inbox.</p>
            </div>
            <div className="flex-1 w-full md:w-auto">
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button className="px-6 py-3 bg-white text-[#2563eb] font-bold rounded-lg hover:bg-blue-50 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Jobs Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-6 w-6 text-[#2563eb]" />
              <h3 className="font-bold text-xl text-gray-900">
                Jobs
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <span>Job search</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs?search=remote"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                    Remote
                  </span>
                  <span>Work from home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-[#2563eb] transition-colors duration-300"
                >
                  Browse jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/career-advice"
                  className="hover:text-[#2563eb] transition-colors duration-300"
                >
                  Career advice
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-[#2563eb] transition-colors duration-300"
                >
                  Browse locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Recruiter Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="h-6 w-6 text-[#2563eb]" />
              <h3 className="font-bold text-xl text-gray-900">
                Recruiter
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/recruiter"
                  className="hover:text-[#2563eb] transition-colors duration-300"
                >
                  Recruiter site
                </Link>
              </li>
              <li>
                <Link
                  href="/recruiter/jobs/create"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="bg-green-500 text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                  <span>Post a job</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/recruiter/candidates"
                  className="hover:text-[#2563eb] transition-colors duration-300"
                >
                  CV Search
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="hover:text-[#2563eb] transition-colors duration-300"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/recruiter/become"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                    Join Us
                  </span>
                  <span>Become a recruiter</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <AcademicCapIcon className="h-6 w-6 text-[#2563eb]" />
              <h3 className="font-bold text-xl text-gray-900">
                Courses
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-[#2563eb] transition-colors duration-300"
                >
                  Find a course
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-[#2563eb] transition-colors duration-300"
                >
                  Online courses
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?price=free"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="bg-yellow-500 text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                  <span>Free courses</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/career-advice"
                  className="hover:text-[#2563eb] transition-colors duration-300"
                >
                  Career guides
                </Link>
              </li>
              <li>
                <Link
                  href="/instructor/become"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                    Join Us
                  </span>
                  <span>Become an instructor</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/instructor/landing"
                  className="hover:text-[#2563eb] transition-colors duration-300"
                >
                  Teach with us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Social Column */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <BuildingOfficeIcon className="h-6 w-6 text-[#2563eb]" />
                <h3 className="font-bold text-xl text-gray-900">
                  Company
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#2563eb] transition-colors duration-300"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#2563eb] transition-colors duration-300"
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#2563eb] transition-colors duration-300"
                  >
                    Press office
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-[#2563eb] transition-colors duration-300"
                  >
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
       {/* Footer Copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} JedMantra. All rights reserved.
          </p>
        </div>
    </footer>
  );
}
