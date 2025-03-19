'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  StarIcon,
  ArrowRightIcon,
  VideoCameraIcon,
  ClockIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "../utils/supabase";
import { getInstructorProfile, getInstructorCourses } from "../utils/instructor";

export default function InstructorDashboard() {
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([
    { name: "Active Courses", stat: "0", icon: VideoCameraIcon },
    { name: "Total Students", stat: "0", icon: UserGroupIcon },
    { name: "Course Rating", stat: "0", icon: StarIcon },
    { name: "Total Revenue", stat: "₹0", icon: CurrencyDollarIcon },
  ]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Get instructor profile
        const profile = await getInstructorProfile(user.id);
        
        if (profile) {
          setInstructor({
            id: profile.id,
            first_name: profile.first_name || "",
            last_name: profile.last_name || "",
            title: profile.job_title || "Instructor",
            specialization: profile.field_of_expertise || "Education",
            email: profile.email || "",
            avatar_url: profile.avatar_url || "/avatars/default.jpg",
            is_online: true,
            response_rate: 98.5,
            avg_response_time: 60,
            location: profile.location || "Remote",
            performance_metrics: {
              student_satisfaction: profile.rating || 0,
              total_students: 0,
              completion_rate: 0,
              total_revenue: 0
            }
          });
          
          // Get instructor courses
          const instructorCourses = await getInstructorCourses(user.id);
          setCourses(instructorCourses || []);
          
          // Calculate total students from courses
          const totalStudents = instructorCourses.reduce((sum, course) => sum + (course.total_students || 0), 0);
          
          // Calculate average rating from courses
          const coursesWithRating = instructorCourses.filter(course => course.rating);
          const avgRating = coursesWithRating.length > 0 
            ? coursesWithRating.reduce((sum, course) => sum + course.rating, 0) / coursesWithRating.length 
            : 0;
            
          // Calculate total revenue (sum of price * students)
          const totalRevenue = instructorCourses.reduce((sum, course) => {
            return sum + (course.price || 0) * (course.total_students || 0);
          }, 0);
          
          // Update stats
          setStats([
            { name: "Active Courses", stat: instructorCourses.length.toString(), icon: VideoCameraIcon },
            { name: "Total Students", stat: totalStudents.toLocaleString(), icon: UserGroupIcon },
            { name: "Course Rating", stat: avgRating.toFixed(1), icon: StarIcon },
            { name: "Total Revenue", stat: `₹${totalRevenue.toLocaleString()}`, icon: CurrencyDollarIcon },
          ]);
        }
      }
      
      setIsLoading(false);
    }
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading instructor dashboard...</p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Instructor Profile Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find your instructor profile. Please complete your profile setup to access the instructor dashboard.
          </p>
          <Link
            href="/settings"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            Complete Profile Setup
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:60px_60px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Welcome back, {instructor.first_name}! 👋
              </h1>
              <p className="mt-2 text-xl text-white/90">
                Track your course performance and engage with your students
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-4">
              <Link
                href="/instructor/courses/create"
                className="inline-flex items-center px-6 py-3 border-2 border-white rounded-lg text-white hover:bg-white/10 transition-colors font-medium group"
              >
                Create New Course
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Enhanced Instructor Profile Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-xl">
          <div className="p-8">
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="relative group">
                  <Image
                    src={instructor.avatar_url}
                    alt={`${instructor.first_name} ${instructor.last_name}`}
                    width={120}
                    height={120}
                    className="rounded-xl object-cover ring-4 ring-white shadow-lg"
                  />
                  <div className={`absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white ${instructor.is_online ? 'bg-green-400' : 'bg-gray-300'}`} />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {instructor.first_name} {instructor.last_name}
                    </h3>
                    <div className="mt-1 flex items-center space-x-4">
                      <p className="text-gray-600">{instructor.title}</p>
                      <span className="text-gray-300">•</span>
                      <p className="text-gray-600">{instructor.specialization}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Link href="/profile" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      View Profile
                    </Link>
                    <Link href="/settings" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors">
                      Edit Profile
                    </Link>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <StarIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats[2].stat}</p>
                        <p className="text-sm text-gray-500">Rating</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <UserGroupIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats[1].stat}</p>
                        <p className="text-sm text-gray-500">Students</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <ChartBarIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats[0].stat}</p>
                        <p className="text-sm text-gray-500">Courses</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats[3].stat}</p>
                        <p className="text-sm text-gray-500">Revenue</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {instructor.email}
                  </div>
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {instructor.location}
                  </div>
                  <div className="flex items-center">
                    <VideoCameraIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {stats[0].stat} Active Courses
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Available for Withdrawal</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">{stats[3].stat}</p>
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors mb-4">
              Request Withdrawal
            </button>
            <p className="text-gray-500 text-sm">
              Note: Minimum withdrawal amount is ₹1,000
            </p>
          </div>
        </div>

        {/* Recent Courses Section */}
        {courses.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Recent Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src={course.course_image || "https://via.placeholder.com/400x250"}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    {course.bestseller && (
                      <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                        Bestseller
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-500 mb-3">
                      {course.total_students || 0} students • {course.rating ? `${course.rating.toFixed(1)} ★` : "No ratings"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">₹{course.price}</span>
                      <Link
                        href={`/instructor/courses/${course.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {courses.length > 3 && (
              <div className="mt-6 text-center">
                <Link
                  href="/instructor/courses"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all courses
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
