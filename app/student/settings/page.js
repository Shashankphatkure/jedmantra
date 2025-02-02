"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  BellIcon, 
  ShieldCheckIcon, 
  UserCircleIcon,
  CameraIcon,
  KeyIcon,
  GlobeAltIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    courseUpdates: true,
    newCourses: true,
    jobAlerts: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-50" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '20px 20px'
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Account Settings
            </h1>
            <p className="text-xl text-gray-600">
              Manage your profile and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
            <button className="group flex items-center text-purple-600 hover:text-purple-700 transition-colors">
              View Public Profile
              <ArrowRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative group">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:opacity-75 transition-opacity"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2.5 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                <CameraIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow duration-200 hover:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    defaultValue="Smith"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow duration-200 hover:border-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  defaultValue="john.smith@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow duration-200 hover:border-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Notification Settings
          </h2>
          <div className="grid gap-4">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center">
                  <BellIcon className="h-6 w-6 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {key.split(/(?=[A-Z])/).join(" ").replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <p className="text-sm text-gray-500">
                      Receive notifications about {key.toLowerCase()} updates
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Privacy Settings
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <GlobeAltIcon className="h-6 w-6 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Public Profile</p>
                  <p className="text-sm text-gray-500">
                    Make your profile visible to other students and employers
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pb-8">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all duration-200 flex items-center disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                Save Changes
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
