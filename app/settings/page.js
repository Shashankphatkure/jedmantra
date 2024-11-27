import Image from "next/image";
import Link from "next/link";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/logo.svg"
                  alt="JedMantra Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center">
              <button className="ml-4 relative flex-shrink-0 p-1 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="ml-4 relative flex items-center">
                <Image
                  src="/avatar.jpg"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="ml-2 text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            {/* Sidebar */}
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                {[
                  { name: "Profile", href: "#profile", current: true },
                  { name: "Account", href: "#account", current: false },
                  { name: "Password", href: "#password", current: false },
                  {
                    name: "Notifications",
                    href: "#notifications",
                    current: false,
                  },
                  { name: "Privacy", href: "#privacy", current: false },
                  { name: "Billing", href: "#billing", current: false },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium ${
                      item.current
                        ? "bg-gray-50 text-blue-600 hover:bg-white"
                        : "text-gray-900 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main Settings Area */}
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              {/* Profile Section */}
              <section aria-labelledby="profile-overview-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="profile-overview-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      Profile
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your personal information and how others see you on
                      the platform.
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div className="space-y-8">
                      {/* Profile Photo */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Photo
                        </label>
                        <div className="mt-2 flex items-center space-x-5">
                          <Image
                            src="/avatar.jpg"
                            alt="User avatar"
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Change
                          </button>
                        </div>
                      </div>

                      {/* Basic Info */}
                      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
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
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
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
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
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
                          <label
                            htmlFor="bio"
                            className="block text-sm font-medium text-gray-700"
                          >
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

              {/* Notification Settings */}
              <section aria-labelledby="notification-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="notification-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      Notifications
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage how you receive notifications and updates.
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Job Alerts",
                          description:
                            "Get notified when new jobs match your preferences",
                        },
                        {
                          title: "Course Updates",
                          description:
                            "Receive updates about your enrolled courses",
                        },
                        {
                          title: "Messages",
                          description:
                            "Get notified when you receive new messages",
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
                            <label className="font-medium text-gray-700">
                              {item.title}
                            </label>
                            <p className="text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Privacy Settings */}
              <section aria-labelledby="privacy-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="privacy-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      Privacy
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Control your privacy settings and what information is
                      visible to others.
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Profile Visibility",
                          description:
                            "Make your profile visible to other users",
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
                            <label className="font-medium text-gray-700">
                              {item.title}
                            </label>
                            <p className="text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
