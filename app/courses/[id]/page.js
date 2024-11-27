import Image from "next/image";
import Link from "next/link";

export default function CourseDetail() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}

      {/* Course Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Complete Web Development Bootcamp 2024
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Master web development from scratch with HTML, CSS, JavaScript,
                React, Node.js, and more
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm text-gray-600">
                    4.8 (2.5k reviews)
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-600">
                  15,000+ students enrolled
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-600">
                  Last updated 01/2024
                </span>
              </div>
              <div className="mt-4 flex items-center">
                <Image
                  src="https://picsum.photos/seed/instructor/40/40"
                  alt="Instructor"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-900">
                    John Smith
                  </p>
                  <p className="text-sm text-gray-500">
                    Senior Web Developer & Instructor
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="relative aspect-video mb-4">
                  <Image
                    src="https://picsum.photos/seed/course-preview/800/450"
                    alt="Course preview"
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-60">
                    <svg
                      className="h-16 w-16 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">£89.99</p>
                  <p className="mt-1 text-sm text-gray-500">
                    <span className="line-through">£199.99</span>
                    <span className="ml-2 text-green-600">55% off</span>
                  </p>
                </div>
                <div className="mt-6 space-y-4">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Enroll Now
                  </button>
                  <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors">
                    Add to Wishlist
                  </button>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    This course includes:
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {[
                      { text: "40 hours of video content", icon: "video" },
                      { text: "75 coding exercises", icon: "code" },
                      { text: "15 downloadable resources", icon: "download" },
                      { text: "Full lifetime access", icon: "access" },
                      {
                        text: "Certificate of completion",
                        icon: "certificate",
                      },
                    ].map((item) => (
                      <li
                        key={item.text}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <svg
                          className="h-5 w-5 text-gray-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Build 25+ web development projects",
                  "Master HTML5, CSS3, and modern JavaScript",
                  "Learn React.js and Node.js from scratch",
                  "Implement authentication and databases",
                  "Deploy your applications to the cloud",
                  "Write clean, maintainable code",
                  "Work with REST APIs and GraphQL",
                  "Understand web development best practices",
                ].map((item) => (
                  <div key={item} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Course Content
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Introduction to Web Development",
                    lectures: 5,
                    duration: "2h 30m",
                    items: [
                      "Welcome to the Course",
                      "Web Development Overview",
                      "Setting Up Your Development Environment",
                    ],
                  },
                  {
                    title: "HTML Fundamentals",
                    lectures: 8,
                    duration: "4h 15m",
                    items: [
                      "HTML Document Structure",
                      "Working with Text Elements",
                      "Links and Images",
                    ],
                  },
                ].map((section) => (
                  <div key={section.title} className="border rounded-lg">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {section.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {section.lectures} lectures • {section.duration}
                        </p>
                      </div>
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="px-4 pb-4">
                      {section.items.map((item) => (
                        <div key={item} className="flex items-center py-2">
                          <svg
                            className="h-5 w-5 text-gray-400 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Requirements
              </h2>
              <ul className="space-y-2">
                {[
                  "Basic computer knowledge",
                  "No prior programming experience needed",
                  "A computer with internet access",
                  "Willingness to learn and practice",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gray-400 mt-1 mr-2"
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
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Student Reviews
              </h2>
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div
                    key={review}
                    className="border-b pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start">
                      <Image
                        src={`https://picsum.photos/seed/student-${review}/40/40`}
                        alt="Student"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium text-gray-900">
                            Sarah Johnson
                          </h4>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            2 weeks ago
                          </span>
                        </div>
                        <div className="mt-1 flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="h-4 w-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="mt-2 text-gray-600">
                          This course is amazing! I went from knowing nothing
                          about web development to building full-stack
                          applications. The instructor explains everything
                          clearly and the projects are very practical.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructor */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-8 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Your Instructor
              </h2>
              <div className="flex items-center mb-4">
                <Image
                  src="https://picsum.photos/seed/instructor-large/64/64"
                  alt="Instructor"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    John Smith
                  </h3>
                  <p className="text-sm text-gray-500">
                    Senior Web Developer & Instructor
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    50,000+ students
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">15 courses</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    4.8 instructor rating
                  </span>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                John is a full-stack developer with over 10 years of experience
                in web development. He has worked with companies like Google and
                Amazon, and now focuses on teaching others how to code. His
                courses have helped thousands of students start their career in
                web development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
