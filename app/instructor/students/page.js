'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  UserCircleIcon,
  AcademicCapIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "../../utils/supabase";
import { getInstructorCourses } from "../../utils/instructor";

export default function InstructorStudents() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [courses, setCourses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    async function fetchStudents() {
      setIsLoading(true);
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Get instructor courses
        const instructorCourses = await getInstructorCourses(user.id);
        setCourses(instructorCourses || []);
        
        if (instructorCourses && instructorCourses.length > 0) {
          // Get all enrollments for the instructor's courses
          const courseIds = instructorCourses.map(course => course.id);
          
          const { data: enrollments, error } = await supabase
            .from('enrollments')
            .select(`
              *,
              users:user_id (*),
              courses:course_id (*)
            `)
            .in('course_id', courseIds);
            
          if (error) {
            console.error("Error fetching enrollments:", error);
          } else {
            // Transform the data
            const studentsData = enrollments.map(enrollment => ({
              id: enrollment.id,
              studentId: enrollment.user_id,
              studentName: enrollment.users?.name || "Unknown Student",
              email: enrollment.users?.email || "",
              avatar: enrollment.users?.avatar_url || "/avatars/default.jpg",
              courseId: enrollment.course_id,
              courseName: enrollment.courses?.title || "Unknown Course",
              enrolledAt: new Date(enrollment.enrolled_at).toLocaleDateString(),
              lastAccessed: enrollment.last_accessed ? new Date(enrollment.last_accessed).toLocaleDateString() : "Not accessed yet",
              progress: enrollment.progress ? typeof enrollment.progress === 'object' 
                ? `${Math.round(enrollment.progress.completed * 100 / enrollment.progress.total)}%` 
                : "0%" : "0%",
              status: enrollment.status || "active",
            }));
            
            setStudents(studentsData);
            setFilteredStudents(studentsData);
          }
        }
      }
      
      setIsLoading(false);
    }
    
    fetchStudents();
  }, []);
  
  // Apply filters when search term or filters change
  useEffect(() => {
    let result = [...students];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(student => 
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply course filter
    if (courseFilter) {
      result = result.filter(student => student.courseId === courseFilter);
    }
    
    // Apply status filter
    if (statusFilter !== "All Status") {
      result = result.filter(student => student.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    setFilteredStudents(result);
  }, [searchTerm, courseFilter, statusFilter, students]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 relative overflow-hidden pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-3">Students</h1>
            <p className="text-xl text-white/90 mb-6">
              Manage your course enrollments and student progress
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-white/10 backdrop-blur-lg rounded-xl p-3">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/5 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <select 
                className="w-full sm:w-auto bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/5 transition-colors cursor-pointer"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
              <select 
                className="w-full sm:w-auto bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/5 transition-colors cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Completed</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-12">
        {/* Empty state when no students */}
        {filteredStudents.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <div className="mx-auto w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <UserCircleIcon className="h-10 w-10 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Students Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {students.length === 0 
                ? "You don't have any students enrolled in your courses yet."
                : "No students match your current filters. Try adjusting your search criteria."
              }
            </p>
            <Link
              href="/instructor/courses"
              className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <AcademicCapIcon className="h-5 w-5 mr-2" />
              Manage Your Courses
            </Link>
          </div>
        )}

        {/* Students List */}
        {filteredStudents.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrolled
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <Image
                              src={student.avatar}
                              alt={student.studentName}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.studentName}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.courseName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.enrolledAt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.lastAccessed}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-purple-600 h-2.5 rounded-full" 
                            style={{ width: student.progress }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{student.progress}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.status === 'active' ? 'bg-green-100 text-green-800' :
                          student.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-900" title="View details">
                            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900" title="Send message">
                            <ChatBubbleLeftIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredStudents.length > 10 && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{Math.min(10, filteredStudents.length)}</span> of{" "}
              <span className="font-medium">{filteredStudents.length}</span> students
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
