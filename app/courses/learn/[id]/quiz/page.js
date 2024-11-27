import Image from "next/image";
import Link from "next/link";

export default function CourseQuiz() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/courses/learn/1"
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
                  Module Quiz: React Hooks
                </h1>
                <p className="text-sm text-gray-500">
                  Test your knowledge of React Hooks concepts
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">Time Remaining: 14:32</div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          {/* Progress Bar */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Question 3 of 10</span>
              <span>Progress: 30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Multiple Choice Question */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">
                  What is the primary purpose of the useEffect hook?
                </h2>
                <div className="space-y-2">
                  {[
                    "To handle side effects in functional components",
                    "To manage component state",
                    "To create custom hooks",
                    "To optimize component performance",
                  ].map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="answer"
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Code Question */}
              <div className="space-y-4 mt-8">
                <h2 className="text-lg font-medium text-gray-900">
                  What will be logged to the console in this code?
                </h2>
                <div className="bg-gray-800 rounded-lg p-4 text-white font-mono text-sm">
                  <pre>{`useEffect(() => {
  console.log('Effect ran');
}, []);`}</pre>
                </div>
                <div className="space-y-2">
                  {[
                    "Effect runs on every render",
                    "Effect runs only once after initial render",
                    "Effect never runs",
                    "Effect runs when dependencies change",
                  ].map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="code_answer"
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* True/False Question */}
              <div className="space-y-4 mt-8">
                <h2 className="text-lg font-medium text-gray-900">
                  The useEffect hook can return a cleanup function.
                </h2>
                <div className="space-y-2">
                  {["True", "False"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="tf_answer"
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous Question
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Next Question
              </button>
            </div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Question Navigation
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                className={`h-10 w-full rounded-md text-sm font-medium ${
                  i < 2
                    ? "bg-green-100 text-green-700"
                    : i === 2
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 bg-green-100 rounded-full"></span>
              <span>Answered</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 bg-blue-100 rounded-full"></span>
              <span>Current</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 bg-gray-100 rounded-full"></span>
              <span>Unanswered</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
