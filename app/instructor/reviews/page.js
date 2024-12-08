import {
  StarIcon,
  ChatBubbleLeftIcon,
  UserCircleIcon,
  ArrowUpIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function InstructorReviews() {
  const stats = [
    {
      name: "Total Reviews",
      stat: "1,234",
      change: "+12%",
      changeType: "increase",
      icon: ChatBubbleLeftIcon,
      color: "blue",
    },
    {
      name: "Average Rating",
      stat: "4.8/5.0",
      change: "+0.3",
      changeType: "increase",
      icon: StarIcon,
      color: "yellow",
    },
    {
      name: "Response Rate",
      stat: "95%",
      change: "+2.3%",
      changeType: "increase",
      icon: CheckCircleIcon,
      color: "green",
    },
    {
      name: "Pending Reviews",
      stat: "12",
      change: "-3",
      changeType: "decrease",
      icon: ClockIcon,
      color: "purple",
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-4">Course Reviews</h1>
            <p className="text-xl text-white/90 mb-8">
              Manage student feedback and maintain course quality
            </p>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 w-fit">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search reviews..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <select className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50">
                <option value="">All Courses</option>
                <option value="react">React Fundamentals</option>
                <option value="javascript">Advanced JavaScript</option>
                <option value="webdev">Web Development</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 bg-white text-orange-600 rounded-lg font-medium hover:bg-white/90 transition-colors">
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${item.color}-100`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <div className={`flex items-center text-sm ${
                  item.changeType === "increase" ? "text-green-600" : "text-red-600"
                }`}>
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  {item.change}
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{item.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{item.stat}</p>
            </div>
          ))}
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`p-6 ${
                index !== reviews.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{review.author}</h3>
                    <div className="flex items-center mt-1">
                      <p className="text-sm text-gray-500 mr-2">{review.course}</p>
                      <span className="text-gray-300">•</span>
                      <p className="text-sm text-gray-500 ml-2">{review.date}</p>
                    </div>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    review.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {review.status === "pending" ? "Pending Response" : "Responded"}
                </span>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-600 mb-4">{review.content}</p>

              {review.response && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <UserCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="font-medium text-gray-900">Your Response</p>
                  </div>
                  <p className="text-gray-600">{review.response}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <button className="flex items-center hover:text-gray-700">
                    <HandThumbUpIcon className="h-5 w-5 mr-1" />
                    {review.helpful} helpful
                  </button>
                </div>
                {review.status === "pending" && (
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                    Reply to Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> reviews
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
