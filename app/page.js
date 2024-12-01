import {
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Find Your Dream Job</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Explore unlimited Jobs "Connecting You to the Right Opportunities"
            </p>
            <div className="mt-10 max-w-xl mx-auto">
              <div className="flex shadow-sm rounded-md">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 rounded-l-md border border-r-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Job title, skill, or company"
                />
                <input
                  type="text"
                  className="flex-1 px-4 py-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City or postcode"
                />
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Type Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Path
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Job Seeker",
              description: "Find your dream job and advance your career",
              icon: BriefcaseIcon,
              gradient: "from-blue-500 to-purple-500",
            },
            {
              title: "Course Learner",
              description: "Enhance your skills with expert-led courses",
              icon: AcademicCapIcon,
              gradient: "from-purple-500 to-pink-500",
            },
            {
              title: "Recruiter/Tutor",
              description: "Post jobs or create courses to reach talent",
              icon: UserGroupIcon,
              gradient: "from-pink-500 to-red-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="p-3 rounded-full bg-gray-50 group-hover:bg-white transition-colors duration-300">
                    <item.icon className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">{item.description}</p>
                <button className="w-full bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 transform transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 group">
                  <span>Get Started</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Jobs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((job) => (
            <div
              key={job}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-xl">Software Engineer</h3>
                  <p className="text-gray-600">Tech Company Ltd</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Full-time
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-gray-600 flex items-center">
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
                  London, UK
                </p>
                <p className="text-gray-600 flex items-center">
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  £45,000 - £65,000
                </p>
              </div>
              <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
            View all jobs <span className="ml-2">→</span>
          </button>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Courses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 1025, title: "Complete Web Development Bootcamp" },
              { id: 1040, title: "Data Science Fundamentals" },
              { id: 1051, title: "UI/UX Design Masterclass" },
              { id: 1069, title: "AI & Machine Learning" },
              { id: 1074, title: "Digital Marketing Strategy" },
              { id: 1084, title: "Business Management & Leadership" },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={`https://picsum.photos/id/${course.id}/800/600`}
                    alt={`${course.title} thumbnail`}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    Best Seller
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">By John Smith</p>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-400">⭐️ 4.8</span>
                    <span className="text-gray-500 ml-2">(2.4k reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">£89.99</span>
                    <button className="text-blue-600 font-medium hover:text-blue-800">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
              View all courses <span className="ml-2">→</span>
            </button>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-16">
          Support for you
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Upskill with courses */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Upskill with courses</h3>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop"
                  alt="Person working on laptop"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white">
                  <h4 className="text-xl font-semibold text-blue-600">
                    CV Building Masterclass
                  </h4>
                  <p className="text-gray-600">Reed Courses</p>
                  <p className="text-lg font-bold mt-2">Free</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Self paced</span>
                    </div>
                  </div>
                  <button className="mt-4 text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2 group">
                    View Course
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-6 text-gray-600">
              Invest in your future with thousands of courses to help you learn
              and develop.
            </p>
            <button className="mt-4 px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
              Browse courses
            </button>
          </div>

          {/* Career advice */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Career advice</h3>
            <div className="space-y-6">
              <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop"
                    alt="CV Template"
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-4">
                      Free CV template
                    </h4>
                    <button className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors flex items-center gap-2">
                      Get Started
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop"
                    alt="Mental Health Support"
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-4">
                      How to: Manage your mental health whilst jobseeking
                    </h4>
                    <button className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors flex items-center gap-2">
                      Get Started
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-gray-600">
              Take your job search to the next level with our expert tips and
              career advice.
            </p>
            <button className="mt-4 px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
              Browse career advice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
