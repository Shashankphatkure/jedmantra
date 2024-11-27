import Image from "next/image";

export default function InstructorSettings() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

        <div className="mt-8 max-w-3xl">
          {/* Profile Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Profile Settings
              </h2>
              <div className="mt-6">
                <div className="flex items-center">
                  <Image
                    className="h-24 w-24 rounded-full"
                    src="https://via.placeholder.com/96"
                    alt="Profile"
                    width={96}
                    height={96}
                  />
                  <div className="ml-6">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                      Change Photo
                    </button>
                    <p className="mt-2 text-sm text-gray-500">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        defaultValue="John"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        defaultValue="Smith"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue="john.smith@example.com"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bio
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue="Experienced web developer and instructor with a passion for teaching."
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile.
                    </p>
                  </div>
                </div>
              </div>
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
                        Receive email notifications when students enroll, leave
                        reviews, or complete your courses.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketing_emails"
                        name="marketing_emails"
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="marketing_emails"
                        className="font-medium text-gray-700"
                      >
                        Marketing Emails
                      </label>
                      <p className="text-sm text-gray-500">
                        Receive updates about new features, teaching tips, and
                        promotional opportunities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="course_updates"
                        name="course_updates"
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="course_updates"
                        className="font-medium text-gray-700"
                      >
                        Course Updates
                      </label>
                      <p className="text-sm text-gray-500">
                        Get notified when you need to update your course content
                        or when new teaching tools are available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Payment Settings
              </h2>
              <div className="mt-6">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="payment_method"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Default Payment Method
                    </label>
                    <select
                      id="payment_method"
                      name="payment_method"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option>PayPal</option>
                      <option>Bank Transfer</option>
                      <option>Stripe</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="payout_threshold"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Payout Threshold
                    </label>
                    <select
                      id="payout_threshold"
                      name="payout_threshold"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option>$50</option>
                      <option>$100</option>
                      <option>$250</option>
                      <option>$500</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="tax_info"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tax Information
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="tax_info"
                        id="tax_info"
                        placeholder="Enter your tax ID"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Privacy Settings
              </h2>
              <div className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="profile_visibility"
                        name="profile_visibility"
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="profile_visibility"
                        className="font-medium text-gray-700"
                      >
                        Public Profile
                      </label>
                      <p className="text-sm text-gray-500">
                        Make your profile visible to all students and potential
                        learners.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="course_stats"
                        name="course_stats"
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="course_stats"
                        className="font-medium text-gray-700"
                      >
                        Course Statistics
                      </label>
                      <p className="text-sm text-gray-500">
                        Show course statistics publicly on your profile and
                        course pages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
