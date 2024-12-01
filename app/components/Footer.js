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
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <span>Job search</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                    Remote
                  </span>
                  <span>Work from home</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Browse jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Career advice
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Browse locations
                </a>
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
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Recruiter site
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="bg-green-500 text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                  <span>Post a job</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  CV Search
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Recruitment agencies
                </a>
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
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Find a course
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Online courses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="bg-yellow-500 text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                  <span>Free courses</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Career guides
                </a>
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
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Contact us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Press office
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Help
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
