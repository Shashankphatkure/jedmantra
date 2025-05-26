'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function InstructorLanding() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-slate-50 to-blue-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50 to-white -z-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-blue-50 -z-10 opacity-70 rounded-bl-full"></div>
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-50 rounded-full -z-10 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full -z-10 opacity-30 blur-3xl"></div>
      <div className="container mx-auto px-4 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8 animate-fadeIn">
            <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
              Teach. Lead
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
              Teach, Inspire, Lead
              <br />
              <span className="text-blue-600">Become part of something greater. </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-500 max-w-2xl">
              Share your knowledge, expertise, and passion with millions of eager students worldwide. Our platform provides all the tools you need to create engaging courses and build your teaching business.
            </p>
            <div className="flex flex-wrap gap-4 pt-5">
              <Link href="/instructor/become">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Get started
                </button>
              </Link>
              <Link href="/instructor/resources">
                <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Learn more
                </button>
              </Link>
            </div>
          </div>
          
          {/* Main Hero Image */}
          <div className="relative h-[600px]">
            <Image 
              src="/landing.png" 
              alt="Instructor teaching online" 
              fill 
              className="object-cover object-center" 
              priority
            />
            
          </div>
        </div>
      </div>
      
{/* Statistics Banner */}
<div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -ml-6 -mt-6"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full -mr-12 -mb-12"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 text-center">
            <div className="flex flex-col items-center transform transition-transform duration-500 hover:scale-110">
              <div className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">80M</div>
              <div className="text-base md:text-lg font-medium text-blue-100">Students</div>
            </div>
            <div className="flex flex-col items-center transform transition-transform duration-500 hover:scale-110">
              <div className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">75+</div>
              <div className="text-base md:text-lg font-medium text-blue-100">Languages</div>
            </div>
            <div className="flex flex-col items-center transform transition-transform duration-500 hover:scale-110">
              <div className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">1.1B</div>
              <div className="text-base md:text-lg font-medium text-blue-100">Enrollments</div>
            </div>
            <div className="flex flex-col items-center transform transition-transform duration-500 hover:scale-110">
              <div className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">180+</div>
              <div className="text-base md:text-lg font-medium text-blue-100">Countries</div>
            </div>
            <div className="flex flex-col items-center transform transition-transform duration-500 hover:scale-110">
              <div className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">17,200+</div>
              <div className="text-base md:text-lg font-medium text-blue-100">Enterprise customers</div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Divider */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-70"></div>
        </div>
      </div>
      


      {/* Reasons to start section */}
      <div className="container mx-auto px-4 py-20 md:py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Why Join Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              So many reasons to start
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Join thousands of instructors who are already sharing their knowledge and earning income through our platform.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 mb-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Reason 1 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-8 bg-blue-100 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Teach your way</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Publish the course you want, in the way you want, and always have control of your own content.
                </p>
                <ul className="space-y-3 text-left w-full">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">Create video lectures, quizzes, and assignments</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">Set your own pricing and promotional strategies</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">Maintain ownership of your intellectual property</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 py-4 bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-100">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center">
                  <span>Learn more about course creation</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Reason 2 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-8 bg-blue-100 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Inspire learners</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Teach what you know and help learners explore their interests, gain new skills, and advance their careers.
                </p>
                <ul className="space-y-3 text-left w-full">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">Reach students in 180+ countries worldwide</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">Connect with passionate learners in your field</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">Make a real impact on students' lives and careers</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 py-4 bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-100">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center ne">
                  <span>See instructor success stories</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Reason 3 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-8 bg-green-100 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-green-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Get rewarded</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Expand your professional network, build your expertise, and earn money on each paid enrollment.
                </p>
                <ul className="space-y-3 text-left w-full">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">Earn 70% revenue share on course sales</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">Build your personal brand and authority</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">Create passive income streams for years to come</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 py-4 bg-gradient-to-r from-green-50 to-green-100 border-t border-green-100">
                <a href="#" className="text-green-600 hover:text-green-800 font-medium flex items-center justify-center ">
                  <span>Learn about instructor earnings</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature Highlights Section */}
      <div className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Platform Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our platform provides all the tools and resources you need to create, market, and sell your courses effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Analytics Dashboard</h3>
              <p className="text-slate-600 mb-4">
                Track your course performance with detailed analytics on student engagement, revenue, and feedback.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Student engagement metrics</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Revenue tracking</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Student feedback analysis</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Marketing Tools</h3>
              <p className="text-slate-600 mb-4">
                Powerful marketing tools to help you promote your courses and reach more students worldwide.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Promotional coupons</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Email campaign integration</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Social media sharing</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Student Engagement</h3>
              <p className="text-slate-600 mb-4">
                Tools to interact with your students, answer questions, and build a loyal following.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Q&A discussion boards</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Direct messaging</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Automated announcements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* How to begin section */}
      <div className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Getting Started
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              How to begin
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 mb-4 rounded-full"></div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <HowToBeginTabs />
          </div>
        </div>
      </div>
      
      
      {/* Instructor Testimonial Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20 md:py-28 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Instructor Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Hear from our instructors
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>
          
          {/* Testimonial Carousel */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent z-10"></div>
                  <Image 
                    src="/instructor-testimonial.jpg" 
                    alt="Frank Kane" 
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-lg text-slate-800 font-medium leading-relaxed flex-grow">
                    "I'm proud to wake up knowing my work is helping people around the world improve their careers and build great things. While being a full-time instructor is hard work, it lets you work when, where, and how you want."
                  </blockquote>
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <h3 className="font-bold text-lg text-slate-800">Frank Kane</h3>
                    <p className="text-blue-600 font-medium">Data Science & IT Certifications</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent z-10"></div>
                  <Image 
                    src="/instructor-testimonial.jpg" 
                    alt="Sarah Johnson" 
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-lg text-slate-800 font-medium leading-relaxed flex-grow">
                    "Teaching on this platform has transformed my career. I've connected with students from over 65 countries and built a sustainable income stream doing what I love. The support from both the platform and the instructor community has been invaluable."
                  </blockquote>
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <h3 className="font-bold text-lg text-slate-800">Sarah Johnson</h3>
                    <p className="text-blue-600 font-medium">UX/UI Design & Creative Skills</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent z-10"></div>
                  <Image 
                    src="/instructor-testimonial.jpg" 
                    alt="Michael Chen" 
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-lg text-slate-800 font-medium leading-relaxed flex-grow">
                    "After 15 years in software development, sharing my knowledge has been the most rewarding part of my career. The platform's tools make it easy to create professional courses, and the analytics help me continuously improve my content based on student feedback."
                  </blockquote>
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <h3 className="font-bold text-lg text-slate-800">Michael Chen</h3>
                    <p className="text-blue-600 font-medium">Web Development & Programming</p>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
      
      {/* Support Section */}
      <div className="bg-slate-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-blubg-slate-50 py-20 md:py-32e-50 rounded-3xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Content */}
              <div className="p-8 md:p-16 space-y-8">
                <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-2">
                  Community & Support
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                  You won't have to do it alone
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our <span className="font-semibold text-blue-700">Instructor Support Team</span> is here to answer your questions and review your test video, while our <span className="font-semibold text-blue-700">Teaching Center</span> gives you plenty of resources to help you through the process. Plus, get the support of experienced instructors in our <span className="font-semibold text-blue-700">online community</span>.
                </p>
                <div className="pt-4">
                  <Link href="/instructor/resources" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors group">
                    <span>Need more details before you start? Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Illustration */}
              <div className="relative h-[350px] md:h-auto bg-white/50">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent z-0"></div>
                <Image 
                  src="/landing.png" 
                  alt="Instructor support illustration" 
                  fill
                  className="object-contain p-8 z-10 transform transition-transform duration-700 hover:scale-105" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Common Questions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to know about becoming an instructor on our platform.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-semibold text-slate-800">What qualifications do I need to become an instructor?</h3>
                    <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600">
                      You don't need formal teaching qualifications to become an instructor. What matters most is your expertise in your field and your ability to communicate that knowledge effectively. Our platform welcomes experts from all backgrounds – whether you're a professional, academic, entrepreneur, or hobbyist with valuable skills to share.
                    </p>
                  </div>
                </details>
              </div>
              
              {/* FAQ Item 2 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-semibold text-slate-800">How much money can I make as an instructor?</h3>
                    <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600">
                      Earnings vary widely based on factors like your course topic, quality, marketing efforts, and audience size. Some instructors earn a few hundred dollars per month, while top performers can generate six-figure annual incomes. You'll earn revenue from course sales, with our standard revenue share giving you 70% of each sale. We also provide promotional opportunities and marketing tools to help maximize your earnings.
                    </p>
                  </div>
                </details>
              </div>
              
              {/* FAQ Item 3 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-semibold text-slate-800">How long does it take to create a course?</h3>
                    <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600">
                      The time investment varies depending on your course's scope and complexity. On average, instructors spend 1-3 months creating their first course, including planning, recording, editing, and finalizing. Shorter courses might take a few weeks, while comprehensive courses could take several months. Our platform provides tools and resources to streamline the process, and you can work at your own pace.
                    </p>
                  </div>
                </details>
              </div>
              
              {/* FAQ Item 4 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-semibold text-slate-800">What equipment do I need to get started?</h3>
                    <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600">
                      You can start with basic equipment: a computer, a decent microphone (USB microphones start around $50), and simple video recording capabilities (even a smartphone can work for many courses). As you grow, you might invest in better audio equipment, lighting, or a more professional camera setup. We provide guidelines on creating quality content with equipment at various budget levels.
                    </p>
                  </div>
                </details>
              </div>
              
              {/* FAQ Item 5 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-xl font-semibold text-slate-800">How do I market my course?</h3>
                    <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600">
                      Your course will be listed in our marketplace, exposing it to millions of potential students. Additionally, we provide marketing tools like promotional coupons, email campaign templates, and social media integration. We also offer guidance on building your personal brand, leveraging your existing network, and optimizing your course for search engines. Many successful instructors combine our platform's built-in marketing with their own promotional efforts.
                    </p>
                  </div>
                </details>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-slate-600">Still have questions?</p>
              <Link href="/instructor/contact" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 mt-2">
                <span>Contact our instructor support team</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Final Call to Action */}
      <div className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl py-16 px-8 md:px-16 relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full -ml-16 -mt-16"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mb-16"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="inline-block bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-sm font-medium mb-2">
                  Ready to Start?
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
                  Become an instructor today
                </h2>
                <p className="text-xl text-slate-600 max-w-xl mx-auto">
                  Join one of the world's largest online learning marketplaces and start changing lives — including your own.
                </p>
                <div className="mt-10">
                  <Link href="/instructor/become">
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Get started today
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// How to Begin Tabs Component
function HowToBeginTabs() {
  const [activeTab, setActiveTab] = useState('plan');
  const [prevTab, setPrevTab] = useState(null);
  
  useEffect(() => {
    if (activeTab !== prevTab) {
      setPrevTab(activeTab);
    }
  }, [activeTab, prevTab]);
  
  const tabs = [
    { id: 'plan', label: 'Plan your curriculum', icon: '📝' },
    { id: 'record', label: 'Record your video', icon: '🎥' },
    { id: 'launch', label: 'Launch your course', icon: '🚀' },
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-5 px-8 font-medium text-lg flex-1 transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === tab.id 
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="h-full flex flex-col animate-fadeIn">
            {activeTab === 'plan' && (
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-6 flex-grow">
                  <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-2">
                    Step 1
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    The way that you teach — what you bring to it — is up to you.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mt-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">How we help you</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'record' && (
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-6 flex-grow">
                  <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-2">
                    Step 2
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Use basic equipment like a smartphone, microphone, and simple editing software to record your video lectures.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our platform supports various video formats and provides guidelines to ensure your content meets quality standards.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mt-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">How we help you</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    We provide video production tips, technical requirements, and best practices to help you create engaging video content that resonates with learners.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'launch' && (
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-6 flex-grow">
                  <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-2">
                    Step 3
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Set your course price, publish when you're ready, and start engaging with students from around the world.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Promote your course through our marketplace and your own networks to maximize your reach.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mt-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">How we help you</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our platform handles payments, provides marketing tools, and offers analytics to track your course performance and student engagement.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Image */}
          <div className="relative h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg transform transition-all duration-500">
            <Image 
              src="/intrcutor2.webp" 
              alt="Instructor creating course" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
