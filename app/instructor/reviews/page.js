import Image from "next/image";

export default function InstructorReviews() {
  const stats = [
    {
      name: "Total Reviews",
      stat: "1,234",
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Average Rating",
      stat: "4.8/5.0",
      change: "+0.3",
      changeType: "increase",
    },
    {
      name: "Response Rate",
      stat: "95%",
      change: "+2.3%",
      changeType: "increase",
    },
    {
      name: "Pending Reviews",
      stat: "12",
      change: "-3",
      changeType: "decrease",
    },
  ];

  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://via.placeholder.com/40",
      course: "React Fundamentals",
      rating: 5,
      date: "2 days ago",
      content:
        "This course is amazing! The instructor explains complex concepts in a very clear and understandable way. The practical examples are very helpful.",
      status: "pending",
      helpful: 24,
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "https://via.placeholder.com/40",
      course: "Advanced JavaScript",
      rating: 4,
      date: "3 days ago",
      content:
        "Great course overall. Would love to see more advanced topics covered in future updates.",
      status: "responded",
      helpful: 18,
      response:
        "Thank you for your feedback! We are planning to add more advanced topics in the next update.",
    },
    {
      id: 3,
      author: "Emma Wilson",
      avatar: "https://via.placeholder.com/40",
      course: "Web Development Bootcamp",
      rating: 5,
      date: "1 week ago",
      content:
        "Comprehensive course that covers everything you need to know. The projects are challenging but very rewarding.",
      status: "responded",
      helpful: 32,
      response: "Glad you found the projects helpful! Keep up the great work!",
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Reviews</h1>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reviews..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>All Courses</option>
              <option>React Fundamentals</option>
              <option>Advanced JavaScript</option>
              <option>Web Development Bootcamp</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="rounded-md bg-blue-500 p-3">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {item.stat}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            item.changeType === "increase"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews List */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {reviews.map((review) => (
                <li key={review.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={review.avatar}
                        alt=""
                        width={40}
                        height={40}
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium text-gray-900">
                            {review.author}
                          </h3>
                          <span className="ml-2 text-sm text-gray-500">
                            &middot;
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          review.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {review.status === "pending"
                          ? "Pending Response"
                          : "Responded"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">{review.content}</p>
                    {review.response && (
                      <div className="mt-4 bg-gray-50 rounded-lg p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <Image
                              className="h-10 w-10 rounded-full"
                              src="https://via.placeholder.com/40"
                              alt="Instructor"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Your Response
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              {review.response}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <svg
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        {review.helpful} people found this helpful
                      </button>
                    </div>
                    {review.status === "pending" && (
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                        Respond
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">97</span> reviews
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
