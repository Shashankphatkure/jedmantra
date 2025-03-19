'use client';

import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "../../utils/supabase";
import { getInstructorCourses } from "../../utils/instructor";

export default function InstructorAnalytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      name: "Total Students",
      stat: "0",
      change: "0%",
      changeType: "increase",
      icon: UserGroupIcon,
      color: "blue",
    },
    {
      name: "Total Revenue",
      stat: "₹0",
      change: "0%",
      changeType: "increase",
      icon: CurrencyDollarIcon,
      color: "green",
    },
    {
      name: "Average Rating",
      stat: "0.0",
      change: "0",
      changeType: "increase",
      icon: StarIcon,
      color: "yellow",
    },
    {
      name: "Course Completion",
      stat: "0%",
      change: "0%",
      changeType: "increase",
      icon: CheckCircleIcon,
      color: "purple",
    },
  ]);

  const [courseStats, setCourseStats] = useState([]);
  const [revenueData, setRevenueData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [0, 0, 0, 0, 0, 0],
  });
  const [enrollmentData, setEnrollmentData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    async function fetchAnalytics() {
      setIsLoading(true);
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Get instructor courses
        const instructorCourses = await getInstructorCourses(user.id);
        
        if (instructorCourses && instructorCourses.length > 0) {
          // Course-specific stats
          const coursesData = instructorCourses.map(course => ({
            id: course.id,
            name: course.title,
            students: course.total_students || 0,
            revenue: (course.price || 0) * (course.total_students || 0),
            rating: course.rating || 0,
            progress: Math.floor(Math.random() * 100), // Mock data since we don't have real progress data
            completionRate: Math.floor(Math.random() * 100),
          }));
          
          setCourseStats(coursesData);
          
          // Calculate overall stats
          const totalStudents = coursesData.reduce((sum, course) => sum + course.students, 0);
          const totalRevenue = coursesData.reduce((sum, course) => sum + course.revenue, 0);
          const coursesWithRating = coursesData.filter(course => course.rating > 0);
          const avgRating = coursesWithRating.length > 0 
            ? coursesWithRating.reduce((sum, course) => sum + course.rating, 0) / coursesWithRating.length 
            : 0;
          const avgCompletionRate = coursesData.length > 0
            ? coursesData.reduce((sum, course) => sum + course.completionRate, 0) / coursesData.length
            : 0;
          
          setStats([
            {
              name: "Total Students",
              stat: totalStudents.toLocaleString(),
              change: "+12%", // Mock data
              changeType: "increase",
              icon: UserGroupIcon,
              color: "blue",
            },
            {
              name: "Total Revenue",
              stat: `₹${totalRevenue.toLocaleString()}`,
              change: "+18%", // Mock data
              changeType: "increase",
              icon: CurrencyDollarIcon,
              color: "green",
            },
            {
              name: "Average Rating",
              stat: avgRating.toFixed(1),
              change: "+0.3", // Mock data
              changeType: "increase",
              icon: StarIcon,
              color: "yellow",
            },
            {
              name: "Course Completion",
              stat: `${avgCompletionRate.toFixed(0)}%`,
              change: "+5%", // Mock data
              changeType: "increase",
              icon: CheckCircleIcon,
              color: "purple",
            },
          ]);
          
          // Generate mock data for charts
          // In a real app, you would fetch this from your database
          const currentMonth = new Date().getMonth();
          const monthLabels = [];
          const revenueValues = [];
          const enrollmentValues = [];
          
          for (let i = 5; i >= 0; i--) {
            const monthIndex = (currentMonth - i + 12) % 12;
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            monthLabels.push(monthNames[monthIndex]);
            
            // Generate random but increasing data for demonstration
            const baseRevenue = totalRevenue / 6;
            const baseEnrollments = totalStudents / 6;
            revenueValues.push(Math.floor(baseRevenue * (0.7 + Math.random() * 0.6)));
            enrollmentValues.push(Math.floor(baseEnrollments * (0.7 + Math.random() * 0.6)));
          }
          
          setRevenueData({
            labels: monthLabels,
            data: revenueValues,
          });
          
          setEnrollmentData({
            labels: monthLabels,
            data: enrollmentValues,
          });
        }
      }
      
      setIsLoading(false);
    }
    
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-3">Analytics Dashboard</h1>
            <p className="text-xl text-white/90 mb-6">
              Track your course performance and growth metrics
            </p>
            <div className="flex space-x-4">
              <select className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/5 transition-colors cursor-pointer">
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>All time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
              <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="h-72">
              {/* Placeholder for actual chart component */}
              <div className="w-full h-full flex items-end justify-between bg-gradient-to-t from-blue-50 to-white rounded-lg overflow-hidden p-4">
                {revenueData.data.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-10 bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors"
                      style={{ height: `${(value / Math.max(...revenueData.data)) * 80}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{revenueData.labels[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enrollments Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Enrollments</h3>
              <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="h-72">
              {/* Placeholder for actual chart component */}
              <div className="w-full h-full flex items-end justify-between bg-gradient-to-t from-green-50 to-white rounded-lg overflow-hidden p-4">
                {enrollmentData.data.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-10 bg-green-500 rounded-t-lg hover:bg-green-600 transition-colors"
                      style={{ height: `${(value / Math.max(...enrollmentData.data)) * 80}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{enrollmentData.labels[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Performance Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 mb-12">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Course Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courseStats.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{course.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.students}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{course.revenue.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-900">{course.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${course.completionRate}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">{course.completionRate}%</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Student Demographics</h3>
            </div>
            <div className="h-48 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Detailed demographics visualization coming soon</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Popular Content</h3>
            </div>
            <div className="h-48 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Content popularity analytics coming soon</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Growth Prediction</h3>
            </div>
            <div className="h-48 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Growth forecasting coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
