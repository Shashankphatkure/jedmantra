'use client';

import { useState } from 'react';
import {
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function AdminNotifications() {
  const [notifications] = useState([
    {
      id: 1,
      title: "New Course Published",
      message: "React Fundamentals course has been published by Mike Chen",
      type: "course",
      status: "unread",
      time: "2 hours ago",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      title: "User Report",
      message: "Multiple users reported issues with video playback",
      type: "issue",
      status: "read",
      time: "4 hours ago",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      title: "Payment Failed",
      message: "Payment processing failed for subscription renewal",
      type: "payment",
      status: "unread",
      time: "5 hours ago",
      avatar: "https://via.placeholder.com/40",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Notifications</h1>
              <p className="mt-2 text-purple-100">
                Manage and monitor all system notifications
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors">
                <BellIcon className="w-5 h-5 mr-2" />
                Mark All as Read
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notifications..."
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
              <option>All Types</option>
              <option>Course</option>
              <option>Issue</option>
              <option>Payment</option>
            </select>
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>All Status</option>
              <option>Read</option>
              <option>Unread</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-6 hover:bg-gray-50 ${
                  notification.status === "unread" ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={notification.avatar}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h2 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h2>
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            notification.type === "course"
                              ? "bg-green-100 text-green-800"
                              : notification.type === "issue"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {notification.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-gray-500">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">45</span> notifications
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

        {/* Notification Settings */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Notification Settings
            </h2>
            <div className="mt-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email_notifications"
                      name="email_notifications"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="email_notifications"
                      className="font-medium text-gray-700"
                    >
                      Email Notifications
                    </label>
                    <p className="text-sm text-gray-500">
                      Receive email notifications for important updates and
                      alerts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="browser_notifications"
                      name="browser_notifications"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="browser_notifications"
                      className="font-medium text-gray-700"
                    >
                      Browser Notifications
                    </label>
                    <p className="text-sm text-gray-500">
                      Show browser notifications when new events occur.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="notification_sound"
                      name="notification_sound"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="notification_sound"
                      className="font-medium text-gray-700"
                    >
                      Notification Sound
                    </label>
                    <p className="text-sm text-gray-500">
                      Play a sound when new notifications arrive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
