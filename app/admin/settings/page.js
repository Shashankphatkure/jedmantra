'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import {
  Cog6ToothIcon,
  ArrowPathIcon,
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CheckIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'JedMantra',
      siteDescription: 'Find jobs, courses, and internships',
      contactEmail: 'support@jedmantra.com',
      logoUrl: '/logo.png',
      faviconUrl: '/favicon.ico',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      notifyOnNewUser: true,
      notifyOnNewCourse: true,
      notifyOnNewJob: false,
      digestFrequency: 'daily',
    },
    security: {
      twoFactorAuth: false,
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      passwordRequireNumbers: true,
      sessionTimeout: 60,
    },
    localization: {
      defaultLanguage: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      currency: 'USD',
    },
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);

        // Check if settings table exists
        const { error: tableError } = await supabase
          .from('admin_settings')
          .select('id')
          .limit(1);

        if (tableError && tableError.code === '42P01') {
          // Table doesn't exist, create it
          await createSettingsTable();
          await saveSettings(settings);
        } else {
          // Table exists, fetch settings
          const { data, error } = await supabase
            .from('admin_settings')
            .select('*')
            .order('id', { ascending: false })
            .limit(1);

          if (error) throw error;

          if (data && data.length > 0) {
            setSettings(data[0].settings);
          } else {
            // Table exists but no data
            await saveSettings(settings);
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, [supabase]);

  const createSettingsTable = async () => {
    try {
      // Create the settings table using SQL
      const { error } = await supabase.rpc('create_settings_table');

      if (error) {
        // If RPC doesn't exist, create the table using a different approach
        // This is a simplified approach - in a real app, you'd use migrations
        await supabase.auth.getSession();

        // For demo purposes, we'll just show a toast and use mock data
        toast.error('Could not create settings table. Using default settings.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error creating settings table:', error);
      return false;
    }
  };

  const saveSettings = async (settingsData) => {
    try {
      setLoading(true);

      // Save to database
      const { error } = await supabase
        .from('admin_settings')
        .insert({
          settings: settingsData,
          created_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error saving settings:', error);
        toast.error('Failed to save settings');
        return false;
      }

      toast.success('Settings saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    const success = await saveSettings(settings);
    if (success) {
      toast.success('Settings saved successfully');
    }
  };

  const resetSettings = () => {
    // Reset to default settings
    setSettings({
      general: {
        siteName: 'JedMantra',
        siteDescription: 'Find jobs, courses, and internships',
        contactEmail: 'support@jedmantra.com',
        logoUrl: '/logo.png',
        faviconUrl: '/favicon.ico',
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: false,
        notifyOnNewUser: true,
        notifyOnNewCourse: true,
        notifyOnNewJob: false,
        digestFrequency: 'daily',
      },
      security: {
        twoFactorAuth: false,
        passwordMinLength: 8,
        passwordRequireSpecial: true,
        passwordRequireNumbers: true,
        sessionTimeout: 60,
      },
      localization: {
        defaultLanguage: 'en',
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        currency: 'USD',
      },
    });
    toast.success('Settings reset to defaults');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="mt-2 text-blue-100">
                Configure system settings and preferences
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSaveSettings}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                <CheckIcon className="w-5 h-5 mr-2" />
                Save Changes
              </button>
              <button
                onClick={resetSettings}
                className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Reset Defaults
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!loading && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="flex border-b border-gray-200">
              <nav className="flex-none w-64 bg-gray-50 p-4 border-r border-gray-200">
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'general'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Cog6ToothIcon className="mr-3 h-5 w-5" />
                    General
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'notifications'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <BellIcon className="mr-3 h-5 w-5" />
                    Notifications
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'security'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ShieldCheckIcon className="mr-3 h-5 w-5" />
                    Security
                  </button>
                  <button
                    onClick={() => setActiveTab('localization')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'localization'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <GlobeAltIcon className="mr-3 h-5 w-5" />
                    Localization
                  </button>
                </div>
              </nav>

              <div className="flex-1 p-6">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                          Site Name
                        </label>
                        <input
                          type="text"
                          id="siteName"
                          value={settings.general.siteName}
                          onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                          Site Description
                        </label>
                        <textarea
                          id="siteDescription"
                          rows={3}
                          value={settings.general.siteDescription}
                          onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                          Contact Email
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="contactEmail"
                            value={settings.general.contactEmail}
                            onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                            className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
                          Logo URL
                        </label>
                        <input
                          type="text"
                          id="logoUrl"
                          value={settings.general.logoUrl}
                          onChange={(e) => handleInputChange('general', 'logoUrl', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="faviconUrl" className="block text-sm font-medium text-gray-700">
                          Favicon URL
                        </label>
                        <input
                          type="text"
                          id="faviconUrl"
                          value={settings.general.faviconUrl}
                          onChange={(e) => handleInputChange('general', 'faviconUrl', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <input
                          id="emailNotifications"
                          type="checkbox"
                          checked={settings.notifications.emailNotifications}
                          onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="emailNotifications" className="ml-3 block text-sm font-medium text-gray-700">
                          Enable Email Notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="pushNotifications"
                          type="checkbox"
                          checked={settings.notifications.pushNotifications}
                          onChange={(e) => handleInputChange('notifications', 'pushNotifications', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="pushNotifications" className="ml-3 block text-sm font-medium text-gray-700">
                          Enable Push Notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="notifyOnNewUser"
                          type="checkbox"
                          checked={settings.notifications.notifyOnNewUser}
                          onChange={(e) => handleInputChange('notifications', 'notifyOnNewUser', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="notifyOnNewUser" className="ml-3 block text-sm font-medium text-gray-700">
                          Notify on New User Registration
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="notifyOnNewCourse"
                          type="checkbox"
                          checked={settings.notifications.notifyOnNewCourse}
                          onChange={(e) => handleInputChange('notifications', 'notifyOnNewCourse', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="notifyOnNewCourse" className="ml-3 block text-sm font-medium text-gray-700">
                          Notify on New Course Publication
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="notifyOnNewJob"
                          type="checkbox"
                          checked={settings.notifications.notifyOnNewJob}
                          onChange={(e) => handleInputChange('notifications', 'notifyOnNewJob', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="notifyOnNewJob" className="ml-3 block text-sm font-medium text-gray-700">
                          Notify on New Job Posting
                        </label>
                      </div>
                      <div>
                        <label htmlFor="digestFrequency" className="block text-sm font-medium text-gray-700">
                          Digest Email Frequency
                        </label>
                        <select
                          id="digestFrequency"
                          value={settings.notifications.digestFrequency}
                          onChange={(e) => handleInputChange('notifications', 'digestFrequency', e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="never">Never</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h2>
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <input
                          id="twoFactorAuth"
                          type="checkbox"
                          checked={settings.security.twoFactorAuth}
                          onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="twoFactorAuth" className="ml-3 block text-sm font-medium text-gray-700">
                          Enable Two-Factor Authentication
                        </label>
                      </div>
                      <div>
                        <label htmlFor="passwordMinLength" className="block text-sm font-medium text-gray-700">
                          Minimum Password Length
                        </label>
                        <input
                          type="number"
                          id="passwordMinLength"
                          min="6"
                          max="32"
                          value={settings.security.passwordMinLength}
                          onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value))}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          id="passwordRequireSpecial"
                          type="checkbox"
                          checked={settings.security.passwordRequireSpecial}
                          onChange={(e) => handleInputChange('security', 'passwordRequireSpecial', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="passwordRequireSpecial" className="ml-3 block text-sm font-medium text-gray-700">
                          Require Special Characters in Password
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="passwordRequireNumbers"
                          type="checkbox"
                          checked={settings.security.passwordRequireNumbers}
                          onChange={(e) => handleInputChange('security', 'passwordRequireNumbers', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="passwordRequireNumbers" className="ml-3 block text-sm font-medium text-gray-700">
                          Require Numbers in Password
                        </label>
                      </div>
                      <div>
                        <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">
                          Session Timeout (minutes)
                        </label>
                        <input
                          type="number"
                          id="sessionTimeout"
                          min="5"
                          max="1440"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Localization Settings */}
                {activeTab === 'localization' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Localization Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700">
                          Default Language
                        </label>
                        <select
                          id="defaultLanguage"
                          value={settings.localization.defaultLanguage}
                          onChange={(e) => handleInputChange('localization', 'defaultLanguage', e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="hi">Hindi</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                          Timezone
                        </label>
                        <select
                          id="timezone"
                          value={settings.localization.timezone}
                          onChange={(e) => handleInputChange('localization', 'timezone', e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="Asia/Kolkata">India Standard Time (IST)</option>
                          <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
                          Date Format
                        </label>
                        <select
                          id="dateFormat"
                          value={settings.localization.dateFormat}
                          onChange={(e) => handleInputChange('localization', 'dateFormat', e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timeFormat" className="block text-sm font-medium text-gray-700">
                          Time Format
                        </label>
                        <select
                          id="timeFormat"
                          value={settings.localization.timeFormat}
                          onChange={(e) => handleInputChange('localization', 'timeFormat', e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="12h">12-hour (AM/PM)</option>
                          <option value="24h">24-hour</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                          Default Currency
                        </label>
                        <select
                          id="currency"
                          value={settings.localization.currency}
                          onChange={(e) => handleInputChange('localization', 'currency', e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="USD">US Dollar (USD)</option>
                          <option value="EUR">Euro (EUR)</option>
                          <option value="GBP">British Pound (GBP)</option>
                          <option value="INR">Indian Rupee (INR)</option>
                          <option value="JPY">Japanese Yen (JPY)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
