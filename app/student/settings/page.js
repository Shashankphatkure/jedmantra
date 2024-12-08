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

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Account Settings
            </h1>
            <p className="text-lg text-gray-600">
              Manage your profile and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Settings Navigation */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
          {[
            { name: "Profile", icon: UserCircleIcon, active: true },
            { name: "Notifications", icon: BellIcon, active: false },
            { name: "Privacy", icon: ShieldCheckIcon, active: false },
          ].map((item) => (
            <button
              key={item.name}
              className={`flex items-center p-4 rounded-xl ${
                item.active 
                  ? "bg-white shadow-lg border-2 border-purple-500" 
                  : "bg-white/50 hover:bg-white hover:shadow-md"
              } transition-all duration-300`}
            >
              <item.icon className={`h-6 w-6 ${item.active ? "text-purple-500" : "text-gray-400"}`} />
              <span className={`ml-3 font-medium ${item.active ? "text-purple-500" : "text-gray-600"}`}>
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
            <button className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
              View Public Profile
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative group">
              <Image
                src="https://via.placeholder.com/150"
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors">
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
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    defaultValue="Smith"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Notification Settings
          </h2>
          <div className="grid gap-6">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
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
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Privacy Settings
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
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
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center">
            Save Changes
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
