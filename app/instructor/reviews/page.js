'use client';

import { useState, useEffect } from "react";
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
import { createClient } from "../../utils/supabase";
import { getAllReviews } from "../../utils/instructor";

export default function InstructorReviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [stats, setStats] = useState([
    {
      name: "Total Reviews",
      stat: "0",
      change: "0%",
      changeType: "increase",
      icon: ChatBubbleLeftIcon,
      color: "blue",
    },
    {
      name: "Average Rating",
      stat: "0/5.0",
      change: "0",
      changeType: "increase",
      icon: StarIcon,
      color: "yellow",
    },
    {
      name: "Response Rate",
      stat: "0%",
      change: "0%",
      changeType: "increase",
      icon: CheckCircleIcon,
      color: "green",
    },
    {
      name: "Pending Reviews",
      stat: "0",
      change: "0",
      changeType: "decrease",
      icon: ClockIcon,
      color: "purple",
    },
  ]);
  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Get all reviews for the instructor's courses
        const reviewsData = await getAllReviews(user.id);
        
        // Transform the data
        const transformedReviews = reviewsData.map(review => ({
          id: review.id,
          author: review.student_name || "Anonymous Student",
          avatar: review.student_image || "https://via.placeholder.com/40",
          course: review.courses?.title || "Unknown Course",
          courseId: review.course_id,
          rating: review.rating || 0,
          date: new Date(review.created_at).toLocaleDateString(),
          content: review.review_text || "",
          status: "pending", // We'll assume all are pending for now
          helpful: 0,
        }));
        
        setReviews(transformedReviews);
        setFilteredReviews(transformedReviews);
        
        // Extract unique courses
        const uniqueCourses = Array.from(
          new Set(reviewsData.map(review => review.courses?.title))
        ).filter(Boolean);
        setCourses(uniqueCourses);
        
        // Calculate stats
        if (transformedReviews.length > 0) {
          const totalReviews = transformedReviews.length;
          const avgRating = transformedReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
          const pendingReviews = transformedReviews.filter(review => review.status === "pending").length;
          const responseRate = ((totalReviews - pendingReviews) / totalReviews) * 100;
          
          setStats([
            {
              name: "Total Reviews",
              stat: totalReviews.toString(),
              change: "+0%",
              changeType: "increase",
              icon: ChatBubbleLeftIcon,
              color: "blue",
            },
            {
              name: "Average Rating",
              stat: `${avgRating.toFixed(1)}/5.0`,
              change: "+0",
              changeType: "increase",
              icon: StarIcon,
              color: "yellow",
            },
            {
              name: "Response Rate",
              stat: `${responseRate.toFixed(0)}%`,
              change: "0%",
              changeType: "increase",
              icon: CheckCircleIcon,
              color: "green",
            },
            {
              name: "Pending Reviews",
              stat: pendingReviews.toString(),
              change: "0",
              changeType: "decrease",
              icon: ClockIcon,
              color: "purple",
            },
          ]);
        }
      }
      
      setIsLoading(false);
    }
    
    fetchReviews();
  }, []);
  
  // Apply filters when search term or course filter changes
  useEffect(() => {
    let result = [...reviews];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(review => 
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply course filter
    if (courseFilter) {
      result = result.filter(review => review.course === courseFilter);
    }
    
    setFilteredReviews(result);
  }, [searchTerm, courseFilter, reviews]);
  
  const handleReplySubmit = async (reviewId, responseText) => {
    // In a real application, you would save the response to the database
    // For now, we'll just update the local state
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, status: "responded", response: responseText } 
          : review
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - adjusted padding and styling */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 relative overflow-hidden pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-3">Course Reviews</h1>
            <p className="text-xl text-white/90 mb-6">
              Manage student feedback and maintain course quality
            </p>

            {/* Search and Filter - improved spacing and hover states */}
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg rounded-xl p-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search reviews..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 w-64 hover:bg-white/5 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <select 
                className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/5 transition-colors cursor-pointer"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="">All Courses</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>{course}</option>
                ))}
              </select>
              <button className="inline-flex items-center px-4 py-2 bg-white text-orange-600 rounded-lg font-medium hover:bg-white/90 transition-all duration-200 active:scale-95">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-12">
        {/* Stats Grid - improved card styling */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${item.color}-100/50 hover:bg-${item.color}-100 transition-colors`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <div className={`flex items-center text-sm ${
                  item.changeType === "increase" ? "text-green-600" : "text-red-600"
                }`}>
                  <ArrowUpIcon className={`h-4 w-4 mr-1 ${item.changeType === "decrease" && "rotate-180"}`} />
                  {item.change}
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{item.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{item.stat}</p>
            </div>
          ))}
        </div>

        {/* Empty state when no reviews */}
        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <ChatBubbleLeftIcon className="h-10 w-10 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {reviews.length === 0 
                ? "You haven't received any reviews yet. Reviews will appear here when students rate your courses."
                : "No reviews match your current filters. Try adjusting your search criteria."
              }
            </p>
          </div>
        )}

        {/* Reviews List - improved card and interaction styling */}
        {filteredReviews.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 divide-y divide-gray-200">
            {filteredReviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
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
                      <div className="flex items-center mt-1 text-sm text-gray-500 space-x-2">
                        <span>{review.course}</span>
                        <span className="text-gray-300">•</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      review.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {review.status === "pending" ? "Pending Response" : "Responded"}
                  </span>
                </div>

                <div className="flex items-center mb-4 space-x-1">
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
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center mb-2">
                      <UserCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="font-medium text-gray-900">Your Response</p>
                    </div>
                    <p className="text-gray-600">{review.response}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                    <HandThumbUpIcon className="h-5 w-5 mr-1" />
                    <span>{review.helpful} helpful</span>
                  </button>
                  {review.status === "pending" && (
                    <button 
                      onClick={() => handleReplySubmit(review.id, 'Thank you for your feedback!')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 active:scale-95"
                    >
                      Reply to Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination - improved button styling */}
        {filteredReviews.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredReviews.length}</span> of{" "}
              <span className="font-medium">{reviews.length}</span> reviews
            </p>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 active:scale-95">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 active:scale-95">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
