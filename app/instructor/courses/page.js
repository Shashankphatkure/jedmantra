"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserGroupIcon,
  StarIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "../../utils/supabase";
import { getInstructorCourses, deleteCourse } from "../../utils/instructor";

export default function InstructorCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categories, setCategories] = useState([]);
  
  // Fetch courses on component mount
  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Get instructor courses
        const instructorCourses = await getInstructorCourses(user.id);
        setCourses(instructorCourses || []);
        setFilteredCourses(instructorCourses || []);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(instructorCourses.map(course => course.skill_level || "Uncategorized"))
        );
        setCategories(uniqueCategories);
      }
      
      setIsLoading(false);
    }
    
    fetchCourses();
  }, []);
  
  // Apply filters when search term or filters change
  useEffect(() => {
    let result = [...courses];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "All Categories") {
      result = result.filter(course => course.skill_level === categoryFilter);
    }
    
    // Apply status filter (using bestseller as example for published status)
    if (statusFilter !== "All Status") {
      const isPublished = statusFilter === "Published";
      result = result.filter(course => 
        isPublished ? course.bestseller === true : course.bestseller !== true
      );
    }
    
    setFilteredCourses(result);
  }, [searchTerm, categoryFilter, statusFilter, courses]);
  
  // Handle course deletion
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      // Get current user ID from state or fetch it again
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("User not authenticated");
        return;
      }
      
      const deleted = await deleteCourse(courseId, user.id);
      
      if (deleted) {
        // Remove course from state
        setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
        setFilteredCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
      } else {
        alert("Failed to delete course. You may not have permission or there was a server error.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">My Courses</h1>
              <p className="text-xl text-white/90">
                Manage and track all your courses in one place
              </p>
            </div>
            <Link
              href="/instructor/courses/create"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-medium shadow-lg hover:bg-blue-50 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create New Course
            </Link>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <select 
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option>All Categories</option>
                {categories.map(category => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <select 
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <AcademicCapIcon className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {courses.length === 0 
                ? "You haven't created any courses yet. Create your first course to get started!"
                : "No courses match your current filters. Try adjusting your search criteria."
              }
            </p>
            <Link
              href="/instructor/courses/create"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create New Course
            </Link>
          </div>
        )}

        {/* Courses Grid */}
        {filteredCourses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={course.course_image || "https://via.placeholder.com/400x250"}
                    alt={course.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        course.bestseller 
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {course.bestseller ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 text-gray-400 mr-1" />
                        <span className="text-gray-600">{course.total_students || 0}</span>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="text-gray-600">{course.rating || '0.0'}</span>
                      </div>
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-1" />
                        <span className="text-gray-600">{course.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Last updated: {new Date(course.updated_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link 
                        href={`/courses/${course.id}`}
                        className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Link>
                      <Link 
                        href={`/instructor/courses/edit/${course.id}`}
                        className="p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-green-50"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button 
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
