import Image from "next/image";
import Link from "next/link";

export default function CourseLearn() {
  const course = {
    title: "Advanced Web Development",
    instructor: "John Smith",
    currentModule: "React Hooks Deep Dive",
    progress: 75,
    currentLesson: {
      title: "Understanding useEffect",
      duration: "15:30",
      type: "video",
      description:
        "Learn how to use the useEffect hook effectively in React applications. We'll cover dependency arrays, cleanup functions, and common use cases.",
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/courses"
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </Link>
              <div className="ml-4">
                <h1 className="text-lg font-medium text-gray-900">
                  {course.title}
                </h1>
                <p className="text-sm text-gray-500">{course.currentModule}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Progress: {course.progress}%
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <section className="bg-white shadow rounded-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                <div className="flex items-center justify-center">
                  <Image
                    src="https://via.placeholder.com/1280x720"
                    alt="Video thumbnail"
                    width={1280}
                    height={720}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-medium text-gray-900">
                  {course.currentLesson.title}
                </h2>
                <p className="mt-2 text-gray-600">
                  {course.currentLesson.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Duration: {course.currentLesson.duration}
                </div>
              </div>
            </section>

            {/* Course Materials */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Course Materials
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Lesson Slides",
                    type: "pdf",
                    size: "2.4 MB",
                  },
                  {
                    title: "Code Examples",
                    type: "zip",
                    size: "1.8 MB",
                  },
                  {
                    title: "Additional Resources",
                    type: "link",
                    url: "#",
                  },
                ].map((material) => (
                  <div
                    key={material.title}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center">
                      {material.type === "pdf" && (
                        <svg
                          className="h-6 w-6 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                      {material.type === "zip" && (
                        <svg
                          className="h-6 w-6 text-yellow-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H20a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                          />
                        </svg>
                      )}
                      {material.type === "link" && (
                        <svg
                          className="h-6 w-6 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      )}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {material.title}
                        </p>
                        {material.size && (
                          <p className="text-sm text-gray-500">
                            {material.size}
                          </p>
                        )}
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-500 font-medium text-sm">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Quiz */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Knowledge Check
              </h2>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-900 mb-4">
                    What is the main purpose of the useEffect cleanup function?
                  </p>
                  <div className="space-y-2">
                    {[
                      "To prevent memory leaks",
                      "To optimize rendering performance",
                      "To handle API errors",
                      "To update component state",
                    ].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="quiz"
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Submit Answer
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Course Progress */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Course Content
              </h2>
              <div className="space-y-4">
                {[
                  {
                    module: "Getting Started",
                    lessons: [
                      {
                        title: "Course Introduction",
                        duration: "5:00",
                        completed: true,
                      },
                      {
                        title: "Setting Up Your Environment",
                        duration: "10:00",
                        completed: true,
                      },
                    ],
                  },
                  {
                    module: "React Hooks Deep Dive",
                    lessons: [
                      {
                        title: "Introduction to Hooks",
                        duration: "12:00",
                        completed: true,
                      },
                      {
                        title: "Understanding useEffect",
                        duration: "15:30",
                        current: true,
                      },
                      {
                        title: "Custom Hooks",
                        duration: "20:00",
                        completed: false,
                      },
                    ],
                  },
                ].map((module) => (
                  <div key={module.module}>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      {module.module}
                    </h3>
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.title}
                          className={`flex items-center justify-between p-2 rounded ${
                            lesson.current ? "bg-blue-50" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center">
                            {lesson.completed ? (
                              <svg
                                className="h-5 w-5 text-green-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : lesson.current ? (
                              <svg
                                className="h-5 w-5 text-blue-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
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
                            ) : (
                              <svg
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                            )}
                            <span
                              className={`ml-3 text-sm ${
                                lesson.current ? "font-medium" : ""
                              }`}
                            >
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Discussion */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Discussion
              </h2>
              <div className="space-y-4">
                {[
                  {
                    author: "Alice Chen",
                    avatar: "https://via.placeholder.com/32",
                    message:
                      "Great explanation of cleanup functions! Could you elaborate on the timing of when they run?",
                    time: "5 minutes ago",
                  },
                  {
                    author: "Bob Wilson",
                    avatar: "https://via.placeholder.com/32",
                    message:
                      "I found this really helpful for understanding dependency arrays.",
                    time: "10 minutes ago",
                  },
                ].map((comment, index) => (
                  <div key={index} className="flex space-x-3">
                    <Image
                      src={comment.avatar}
                      alt={comment.author}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">
                          {comment.author}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        {comment.message}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {comment.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <textarea
                    rows={3}
                    className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Add to the discussion..."
                  />
                  <div className="mt-3 flex justify-end">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
