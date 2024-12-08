'use client';

import { useState } from 'react';
import {
  Cog6ToothIcon,
  ArrowPathIcon,
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="mt-2 text-gray-100">
                Configure system settings and preferences
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors">
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Reset Defaults
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                <Cog6ToothIcon className="w-5 h-5 mr-2" />
                Advanced Settings
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Settings Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { name: 'General', id: 'general', icon: Cog6ToothIcon },
              { name: 'Notifications', id: 'notifications', icon: BellIcon },
              { name: 'Security', id: 'security', icon: ShieldCheckIcon },
              { name: 'Localization', id: 'localization', icon: GlobeAltIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
            {activeTab === 'general' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Site Settings</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Site Name
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        defaultValue="JedMantra Admin"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Support Email
                      </label>
                      <input
                        type="email"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        defaultValue="support@jedmantra.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add similar sections for other tabs */}
          </div>
        </div>
      </div>
    </div>
  );
}
