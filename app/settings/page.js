"use client";
import { useState } from "react";
import Image from "next/image";
import { 
  UserIcon, 
  CreditCardIcon, 
  KeyIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  UserCircleIcon 
} from "@heroicons/react/24/outline";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { name: "Profile", href: "profile", icon: UserCircleIcon },
    { name: "Account", href: "account", icon: UserIcon },
    { name: "Password", href: "password", icon: KeyIcon },
    { name: "Notifications", href: "notifications", icon: BellIcon },
    { name: "Privacy", href: "privacy", icon: ShieldCheckIcon },
    { name: "Billing", href: "billing", icon: CreditCardIcon },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "account":
        return <AccountSection />;
      case "password":
        return <PasswordSection />;
      case "notifications":
        return <NotificationsSection />;
      case "privacy":
        return <PrivacySection />;
      case "billing":
        return <BillingSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-xl text-white/90">
            Manage your account preferences and personal information
          </p>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          {/* Sidebar */}
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.href)}
                  className={`w-full group rounded-xl px-4 py-3 flex items-center text-sm font-medium transition-colors ${
                    activeTab === tab.href
                      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className={`mr-3 h-5 w-5 ${
                    activeTab === tab.href ? "text-blue-600" : "text-gray-400"
                  }`} />
                  <span className="truncate">{tab.name}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Settings Area */}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

// Tab Components
const ProfileSection = () => (
  <section>
    <div className="bg-white shadow-lg rounded-xl">
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <p className="mt-1 text-lg text-gray-500">
          Update your personal information and how others see you on the platform.
        </p>
      </div>
      <div className="border-t border-gray-200 px-6 py-5">
        <div className="space-y-8">
          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <div className="mt-2 flex items-center space-x-5">
              <Image
                src="/avatar.jpg"
                alt="User avatar"
                width={48}
                height={48}
                className="rounded-full"
              />
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Change
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AccountSection = () => (
  <section>
    <div className="bg-white shadow-lg rounded-xl">
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="mt-1 text-lg text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>
      <div className="border-t border-gray-200 px-6 py-5">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Zone
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option>GMT (UTC+0)</option>
              <option>EST (UTC-5)</option>
              <option>PST (UTC-8)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PasswordSection = () => (
  <section>
    <div className="bg-white shadow-lg rounded-xl">
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
        <p className="mt-1 text-lg text-gray-500">
          Update your password to keep your account secure
        </p>
      </div>
      <div className="border-t border-gray-200 px-6 py-5">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const NotificationsSection = () => (
  <section>
    <div className="bg-white shadow-lg rounded-xl">
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <p className="mt-1 text-lg text-gray-500">
          Manage how you receive notifications and updates
        </p>
      </div>
      <div className="border-t border-gray-200 px-6 py-5">
        <div className="space-y-6">
          {[
            {
              title: "Job Alerts",
              description: "Get notified when new jobs match your preferences",
            },
            {
              title: "Course Updates",
              description: "Receive updates about your enrolled courses",
            },
            {
              title: "Messages",
              description: "Get notified when you receive new messages",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label className="font-medium text-gray-700">{item.title}</label>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const PrivacySection = () => (
  <section>
    <div className="bg-white shadow-lg rounded-xl">
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold text-gray-900">Privacy Settings</h2>
        <p className="mt-1 text-lg text-gray-500">
          Control your privacy settings and what information is visible to others
        </p>
      </div>
      <div className="border-t border-gray-200 px-6 py-5">
        <div className="space-y-6">
          {[
            {
              title: "Profile Visibility",
              description: "Make your profile visible to other users",
            },
            {
              title: "Show Email Address",
              description: "Allow others to see your email address",
            },
            {
              title: "Activity Status",
              description: "Show when you're online or last active",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label className="font-medium text-gray-700">{item.title}</label>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const BillingSection = () => (
  <section>
    <div className="bg-white shadow-lg rounded-xl">
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold text-gray-900">Billing & Payments</h2>
        <p className="mt-1 text-lg text-gray-500">
          Manage your payment methods and billing information
        </p>
      </div>
      <div className="border-t border-gray-200 px-6 py-5">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCardIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/24</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Edit
                </button>
              </div>
            </div>
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              + Add new payment method
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Billing History</h3>
            <div className="space-y-4">
              {[
                { date: "Mar 1, 2024", amount: "₹4,999", status: "Paid" },
                { date: "Feb 1, 2024", amount: "₹4,999", status: "Paid" },
                { date: "Jan 1, 2024", amount: "₹4,999", status: "Paid" },
              ].map((bill, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{bill.date}</p>
                    <p className="text-sm text-gray-500">{bill.amount}</p>
                  </div>
                  <span className="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full">
                    {bill.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
