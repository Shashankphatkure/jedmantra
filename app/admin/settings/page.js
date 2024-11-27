import Image from "next/image";

export default function AdminSettings() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

        <div className="mt-8 max-w-3xl">
          {/* Site Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Site Settings
              </h2>
              <div className="mt-6">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="site_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Site Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="site_name"
                        id="site_name"
                        defaultValue="Learning Portal"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="site_description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Site Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="site_description"
                        name="site_description"
                        rows={3}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue="A comprehensive learning platform for students and professionals."
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact_email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="contact_email"
                        id="contact_email"
                        defaultValue="support@example.com"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Security Settings
              </h2>
              <div className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="two_factor"
                        name="two_factor"
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="two_factor"
                        className="font-medium text-gray-700"
                      >
                        Two-Factor Authentication
                      </label>
                      <p className="text-sm text-gray-500">
                        Require two-factor authentication for all admin
                        accounts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="session_timeout"
                        name="session_timeout"
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="session_timeout"
                        className="font-medium text-gray-700"
                      >
                        Session Timeout
                      </label>
                      <p className="text-sm text-gray-500">
                        Automatically log out inactive users after 30 minutes.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password_policy"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password Policy
                    </label>
                    <select
                      id="password_policy"
                      name="password_policy"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option>Strong (12+ characters, special chars)</option>
                      <option>Medium (8+ characters)</option>
                      <option>Basic (6+ characters)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Email Settings
              </h2>
              <div className="mt-6">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="smtp_host"
                      className="block text-sm font-medium text-gray-700"
                    >
                      SMTP Host
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="smtp_host"
                        id="smtp_host"
                        defaultValue="smtp.example.com"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="smtp_port"
                      className="block text-sm font-medium text-gray-700"
                    >
                      SMTP Port
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="smtp_port"
                        id="smtp_port"
                        defaultValue="587"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="smtp_encryption"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Encryption
                    </label>
                    <select
                      id="smtp_encryption"
                      name="smtp_encryption"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option>TLS</option>
                      <option>SSL</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* API Settings */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                API Settings
              </h2>
              <div className="mt-6">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="api_key"
                      className="block text-sm font-medium text-gray-700"
                    >
                      API Key
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="api_key"
                        id="api_key"
                        defaultValue="sk_test_123456789"
                        readOnly
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                      />
                      <button className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm">
                        Regenerate
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="webhook_url"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Webhook URL
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="webhook_url"
                        id="webhook_url"
                        defaultValue="https://example.com/webhook"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="api_logging"
                        name="api_logging"
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="api_logging"
                        className="font-medium text-gray-700"
                      >
                        Enable API Logging
                      </label>
                      <p className="text-sm text-gray-500">
                        Log all API requests for debugging and monitoring.
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
