import {
  UserCircleIcon,
  BellIcon,
  CreditCardIcon,
  LockClosedIcon,
  CameraIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function InstructorSettings() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-4">Settings</h1>
            <p className="text-xl text-white/90">
              Manage your account preferences and profile settings
            </p>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Settings Navigation */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <nav className="space-y-1">
                {[
                  { name: "Profile", icon: UserCircleIcon, current: true },
                  { name: "Notifications", icon: BellIcon, current: false },
                  { name: "Payment", icon: CreditCardIcon, current: false },
                  { name: "Security", icon: LockClosedIcon, current: false },
                ].map((item) => (
                  <button
                    key={item.name}
                    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${
                      item.current
                        ? "bg-violet-50 text-violet-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 mr-3 ${
                        item.current ? "text-violet-500" : "text-gray-400"
                      }`}
                    />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="col-span-12 md:col-span-9 space-y-8">
            {/* Profile Settings */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                
                {/* Profile Photo */}
                <div className="flex items-center mb-8">
                  <div className="relative">
                    <Image
                      src="https://via.placeholder.com/96"
                      alt="Profile"
                      width={96}
                      height={96}
                      className="rounded-full"
                    />
                    <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
                      <CameraIcon className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="ml-6">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700">
                      <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                      Change Photo
                    </button>
                    <p className="mt-2 text-sm text-gray-500">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Smith"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john.smith@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Experienced web developer and instructor with a passion for teaching."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-end space-x-4">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Email Notifications",
                    description: "Receive email notifications when students enroll or leave reviews",
                  },
                  {
                    title: "Course Updates",
                    description: "Get notified when you need to update your course content",
                  },
                  {
                    title: "Marketing Emails",
                    description: "Receive updates about new features and promotional opportunities",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
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
        </div>
      </div>
    </div>
  );
}
