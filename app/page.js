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

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Love
                <br />
                <span className="flex items-center">
                  M
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12 mx-1 text-white"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  ndays
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 mb-8">
                Find a job you'll love
              </p>

              {/* Search Form */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      What
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="e.g. 'data engineer'"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Where
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="town or postcode"
                    />
                    <button className="absolute right-3 top-9 text-gray-400 hover:text-pink-500">
                      <svg
                        className="w-5 h-5"
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
                    </button>
                  </div>
                </div>
                <button className="w-full mt-4 bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors">
                  Search jobs
                </button>
              </div>

              {/* Job Stats */}
              <div className="mt-6 text-white/90">
                <p className="text-lg">
                  Search 139,056 new jobs - 1,598 added in the last 24 hours
                </p>
                <button className="mt-4 text-white font-medium hover:text-white/80 flex items-center">
                  Browse jobs
                  <svg
                    className="w-5 h-5 ml-2"
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
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden md:block relative">
              <img
                src="/happy-worker.png" // Make sure to add this image to your public folder
                alt="Happy Worker"
                className="w-full max-w-md mx-auto transform translate-y-4 hover:-translate-y-2 transition-transform duration-300"
              />
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
            Your next skill, from just £12. Browse thousands of courses now
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
            {[
              {
                title: "Senior Software Engineer",
                company: "Tech Innovators Ltd",
                type: "Full-time",
                location: "London, UK",
                salary: "£65,000 - £85,000",
                tags: ["React", "Node.js", "AWS"],
                color: "blue",
              },
              {
                title: "UX/UI Designer",
                company: "Creative Studios",
                type: "Remote",
                location: "Manchester, UK",
                salary: "£45,000 - £60,000",
                tags: ["Figma", "Adobe XD", "User Research"],
                color: "purple",
              },
              {
                title: "Data Scientist",
                company: "Analytics Pro",
                type: "Hybrid",
                location: "Edinburgh, UK",
                salary: "£55,000 - £75,000",
                tags: ["Python", "Machine Learning", "SQL"],
                color: "green",
              },
              {
                title: "Marketing Manager",
                company: "Global Brands Inc",
                type: "Full-time",
                location: "Birmingham, UK",
                salary: "£40,000 - £50,000",
                tags: ["Digital Marketing", "SEO", "Content Strategy"],
                color: "pink",
              },
              {
                title: "DevOps Engineer",
                company: "Cloud Solutions",
                type: "Remote",
                location: "Bristol, UK",
                salary: "£60,000 - £80,000",
                tags: ["Docker", "Kubernetes", "CI/CD"],
                color: "indigo",
              },
              {
                title: "Product Manager",
                company: "Innovation Hub",
                type: "Full-time",
                location: "Glasgow, UK",
                salary: "£50,000 - £70,000",
                tags: ["Agile", "Product Strategy", "Scrum"],
                color: "blue",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <span
                    className={`bg-${job.color}-100 text-${job.color}-800 px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {job.type}
                  </span>
                </div>
                <div className="space-y-3 mb-4">
                  <p className="text-gray-600 flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {job.location}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <CurrencyPoundIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {job.salary}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`bg-${job.color}-50 text-${job.color}-700 text-sm px-3 py-1 rounded-full`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className={`w-full bg-${job.color}-600 text-white rounded-lg px-4 py-2 hover:bg-${job.color}-700 transition-colors flex items-center justify-center group`}
                >
                  Apply Now
                  <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors group">
              View all jobs
              <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </button>
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
            {[
              {
                id: 1025,
                title: "Complete Web Development Bootcamp",
                instructor: "Sarah Johnson",
                rating: 4.8,
                reviews: 2431,
                price: 89.99,
                level: "Beginner",
                duration: "12 weeks",
                category: "Development",
              },
              {
                id: 1026,
                title: "Advanced Data Science & AI",
                instructor: "Dr. Michael Chen",
                rating: 4.9,
                reviews: 1876,
                price: 129.99,
                level: "Advanced",
                duration: "16 weeks",
                category: "Data Science",
              },
              {
                id: 1027,
                title: "Digital Marketing Masterclass",
                instructor: "Emma Thompson",
                rating: 4.7,
                reviews: 3254,
                price: 69.99,
                level: "Intermediate",
                duration: "8 weeks",
                category: "Marketing",
              },
              {
                id: 1028,
                title: "UI/UX Design Fundamentals",
                instructor: "Alex Rodriguez",
                rating: 4.8,
                reviews: 1543,
                price: 79.99,
                level: "Beginner",
                duration: "10 weeks",
                category: "Design",
              },
              {
                id: 1029,
                title: "Cloud Architecture on AWS",
                instructor: "James Wilson",
                rating: 4.9,
                reviews: 987,
                price: 149.99,
                level: "Advanced",
                duration: "14 weeks",
                category: "Cloud Computing",
              },
              {
                id: 1030,
                title: "Project Management Professional",
                instructor: "Lisa Anderson",
                rating: 4.7,
                reviews: 2198,
                price: 99.99,
                level: "Intermediate",
                duration: "12 weeks",
                category: "Management",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={`https://picsum.photos/id/${course.id}/800/600`}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.level}
                    </span>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.duration}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <UserCircleIcon className="h-5 w-5 mr-2" />
                    {course.instructor}
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-400">
                      <StarIcon className="h-5 w-5" />
                      <span className="ml-1 font-medium">{course.rating}</span>
                    </div>
                    <span className="text-gray-500 ml-2">
                      ({course.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-2xl">£{course.price}</span>
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
            <button className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors group">
              View all courses
              <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
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
                <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group">
                  Explore Courses
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
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
                <button className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center group">
                  Get Career Advice
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
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
                <button className="mt-6 w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center justify-center group">
                  Explore Resources
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
