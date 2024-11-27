export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Find Your Dream Job &</span>
              <span className="block text-blue-600">Advance Your Skills</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover thousands of job opportunities and courses to accelerate
              your career growth.
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
              icon: "👔",
            },
            {
              title: "Course Learner",
              description: "Enhance your skills with expert-led courses",
              icon: "📚",
            },
            {
              title: "Recruiter/Tutor",
              description: "Post jobs or create courses to reach talent",
              icon: "🎯",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <button className="mt-4 w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Sections */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Featured Jobs */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Featured Jobs</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((job) => (
                  <div key={job} className="border-b pb-4">
                    <h3 className="font-semibold">Software Engineer</h3>
                    <p className="text-gray-600">Company Name • London</p>
                    <p className="text-gray-500">£45,000 - £65,000</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-blue-600 font-medium">
                View all jobs →
              </button>
            </div>

            {/* Featured Courses */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Popular Courses</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((course) => (
                  <div key={course} className="border-b pb-4">
                    <h3 className="font-semibold">Web Development Bootcamp</h3>
                    <p className="text-gray-600">By Expert Instructor</p>
                    <p className="text-gray-500">⭐️ 4.8 (2.4k reviews)</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-blue-600 font-medium">
                View all courses →
              </button>
            </div>
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
    </div>
  );
}
