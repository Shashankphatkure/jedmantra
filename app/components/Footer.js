import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Jobs Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl text-white tracking-wider">
              JOBS
            </h3>
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
                  className="hover:text-white transition-colors duration-300"
                >
                  Browse jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/career-advice"
                  className="hover:text-white transition-colors duration-300"
                >
                  Career advice
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-white transition-colors duration-300"
                >
                  Browse locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Recruiter Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl text-white tracking-wider">
              RECRUITER
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/recruiter"
                  className="hover:text-white transition-colors duration-300"
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
                  className="hover:text-white transition-colors duration-300"
                >
                  CV Search
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="hover:text-white transition-colors duration-300"
                >
                  Companies
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl text-white tracking-wider">
              COURSES
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-white transition-colors duration-300"
                >
                  Find a course
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-white transition-colors duration-300"
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
                  className="hover:text-white transition-colors duration-300"
                >
                  Career guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Social Column */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-xl text-white tracking-wider">
                COMPANY
              </h3>
              <ul className="mt-6 space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors duration-300"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Press office
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Jedmantra Private Limited. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/policies/privacy"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/policies/terms"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/policies/cookies"
                className="hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
