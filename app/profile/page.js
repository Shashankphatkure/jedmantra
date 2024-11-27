import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/logo.svg"
                  alt="JedMantra Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-600">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <Image
                    src="/avatar.jpg"
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-gray-700">John Doe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-32 bg-blue-600">
                <button className="absolute top-4 right-4 text-white hover:text-gray-200">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-6 py-4">
                <div className="relative -mt-16 mb-4">
                  <Image
                    src="/avatar.jpg"
                    alt="User avatar"
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-white"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                <p className="text-sm text-gray-500">Full Stack Developer</p>
                <div className="mt-4 flex items-center text-gray-500">
                  <svg
                    className="h-5 w-5 mr-2"
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
                  London, United Kingdom
                </div>
              </div>
              <div className="border-t px-6 py-4">
                <div className="grid grid-cols-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-500">Applications</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">4</p>
                    <p className="text-xs text-gray-500">Courses</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">89%</p>
                    <p className="text-xs text-gray-500">Profile</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h3>
                <button className="text-gray-400 hover:text-gray-500">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-500">
                  <svg
                    className="h-5 w-5 mr-3"
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
                  john.doe@example.com
                </div>
                <div className="flex items-center text-gray-500">
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +44 123 456 7890
                </div>
                <div className="flex items-center text-gray-500">
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  portfolio-website.com
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">About</h3>
                <button className="text-gray-400 hover:text-gray-500">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600">
                Full Stack Developer with 5+ years of experience building
                scalable web applications. Passionate about clean code, user
                experience, and continuous learning. Currently focused on React,
                Node.js, and cloud technologies.
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                <button className="text-gray-400 hover:text-gray-500">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Node.js",
                  "Python",
                  "AWS",
                  "Docker",
                  "GraphQL",
                  "MongoDB",
                  "PostgreSQL",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Experience
                </h3>
                <button className="text-gray-400 hover:text-gray-500">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-6">
                {[1, 2].map((job) => (
                  <div
                    key={job}
                    className="border-b pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">
                          Senior Software Engineer
                        </h4>
                        <p className="text-sm text-gray-600">
                          Tech Company Ltd
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        2020 - Present
                      </div>
                    </div>
                    <ul className="mt-4 text-gray-600 list-disc list-inside space-y-2">
                      <li>
                        Led the development of a microservices architecture
                      </li>
                      <li>
                        Mentored junior developers and conducted code reviews
                      </li>
                      <li>Implemented CI/CD pipelines using GitHub Actions</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Education
                </h3>
                <button className="text-gray-400 hover:text-gray-500">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">
                        BSc Computer Science
                      </h4>
                      <p className="text-sm text-gray-600">
                        University of London
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">2015 - 2019</div>
                  </div>
                  <p className="mt-2 text-gray-600">First Class Honours</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Certifications
                </h3>
                <button className="text-gray-400 hover:text-gray-500">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: "AWS Certified Solutions Architect",
                    issuer: "Amazon Web Services",
                    date: "2023",
                  },
                  {
                    name: "Professional Scrum Master I",
                    issuer: "Scrum.org",
                    date: "2022",
                  },
                ].map((cert) => (
                  <div
                    key={cert.name}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-base font-medium text-gray-900">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                    </div>
                    <div className="text-sm text-gray-500">{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
