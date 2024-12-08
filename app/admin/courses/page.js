'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
  UsersIcon,
  CurrencyDollarIcon,
  StarIcon,
  PlusIcon,
  ClockIcon,
  BookOpenIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const supabase = createClientComponentClient();

  // Fetch courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses:', error);
      return;
    }

    setCourses(data);
    setFilteredCourses(data);
  };

  // Handle search
  useEffect(() => {
    const results = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchTerm, courses]);

  // Delete course
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        const { error } = await supabase
          .from('courses')
          .delete()
          .eq('id', courseId);

        if (error) throw error;

        // Update local state
        setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
        setFilteredCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));

        // Show success message
        alert('Course deleted successfully');
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error deleting course. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Calculate stats
  const totalStudents = filteredCourses.reduce((sum, course) => sum + (course.total_students || 0), 0);
  const averageRating = (filteredCourses.reduce((sum, course) => sum + (course.rating || 0), 0) / filteredCourses.length).toFixed(1);
  const totalRevenue = filteredCourses.reduce((sum, course) => sum + (course.price * (course.total_students || 0)), 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar would be handled by the layout component */}
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white">Course Management</h1>
                <p className="mt-2 text-blue-100">
                  Manage and monitor all your courses in one place
                </p>
              </div>
              <div className="flex space-x-4">
                <button className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  Export
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add Course
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[
              {
                name: "Total Courses",
                stat: courses.length,
                change: "+12%",
                icon: AcademicCapIcon,
                color: "blue",
              },
              {
                name: "Total Students",
                stat: totalStudents.toLocaleString(),
                change: "+8.2%",
                icon: UsersIcon,
                color: "green",
              },
              {
                name: "Total Revenue",
                stat: `$${totalRevenue.toLocaleString()}`,
                change: "+15.3%",
                icon: CurrencyDollarIcon,
                color: "purple",
              },
              {
                name: "Average Rating",
                stat: `${averageRating}/5.0`,
                change: "+0.3",
                icon: StarIcon,
                color: "yellow",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className={`rounded-lg bg-${item.color}-100 p-3`}>
                      <item.icon className={`h-6 w-6 text-${item.color}-600`} />
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
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
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

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-4 sm:w-auto">
                  <select className="min-w-[160px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg">
                    <option>All Categories</option>
                    <option>Web Development</option>
                    <option>Design</option>
                    <option>Marketing</option>
                  </select>
                  <select className="min-w-[160px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg">
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Course Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image
                              className="h-10 w-10 rounded-lg object-cover"
                              src={course.course_image || `https://picsum.photos/seed/${course.id}/200/200`}
                              alt=""
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                            <div className="text-sm text-gray-500">{course.instructor_name}</div>
                            <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                              <span className="flex items-center">
                                <ClockIcon className="w-3 h-3 mr-1" />
                                {course.video_hours}h
                              </span>
                              <span className="flex items-center">
                                <BookOpenIcon className="w-3 h-3 mr-1" />
                                {course.lecture_count} lectures
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {course.skill_level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.total_students?.toLocaleString() || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <StarIcon className="h-5 w-5 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">
                            {course.rating} ({course.review_count})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {course.original_price && (
                            <span className="text-gray-500 line-through">
                              ${course.original_price}
                            </span>
                          )}
                          <span className="ml-2 font-medium text-gray-900">
                            ${course.price}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          onClick={() => {/* Handle edit */}}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteCourse(course.id)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* No Results Message */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                No courses found matching your search criteria
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{' '}
                  <span className="font-medium">{filteredCourses.length}</span> of{' '}
                  <span className="font-medium">{courses.length}</span> courses
                </p>
              </div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                {/* Add page numbers here */}
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
