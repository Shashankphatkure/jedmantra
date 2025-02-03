"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  UserIcon, 
  CreditCardIcon, 
  KeyIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  UserCircleIcon 
} from "@heroicons/react/24/outline";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);

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
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden" role="banner">
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
            <nav className="space-y-1" aria-label="Settings navigation">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.href)}
                  className={`w-full group rounded-xl px-4 py-3 flex items-center text-sm font-medium transition-colors ${
                    activeTab === tab.href
                      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                  aria-current={activeTab === tab.href ? "page" : undefined}
                >
                  <tab.icon 
                    className={`mr-3 h-5 w-5 ${
                      activeTab === tab.href ? "text-blue-600" : "text-gray-400"
                    }`} 
                    aria-hidden="true"
                  />
                  <span className="truncate">{tab.name}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Settings Area */}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9" role="region" aria-label={`${tabs.find(tab => tab.href === activeTab)?.name} settings`}>
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

// Tab Components
const ProfileSection = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
    headline: '',
    avatar_url: null,
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error:', error);
        return;
      }
      setUser(user);
      if (user) {
        fetchProfile(user.id);
      }
    };

    getUser();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('first_name, last_name, email, bio, headline, avatar_url')
        .eq('id', userId)
        .single();

      if (error) throw error;
      if (data) {
        setProfileData(data);
      }
    } catch (error) {
      toast.error('Error loading profile');
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('users')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          bio: profileData.bio,
          headline: profileData.headline,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: filePath })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setProfileData(prev => ({ ...prev, avatar_url: filePath }));
      toast.success('Avatar updated successfully');
    } catch (error) {
      toast.error('Error updating avatar');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Common input class with more visible border
  const commonInputClasses = "mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors duration-200";

  return (
    <section aria-labelledby="profile-heading">
      <div className="bg-white shadow-lg rounded-xl">
        <div className="px-6 py-5">
          <h2 id="profile-heading" className="text-2xl font-bold text-gray-900">Profile</h2>
          <p className="mt-1 text-lg text-gray-500">
            Update your personal information and how others see you on the platform.
          </p>
        </div>
        <div className="border-t border-gray-200 px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <div className="mt-2 flex items-center space-x-5">
                <Image
                  src={profileData.avatar_url || '/default-avatar.png'}
                  alt="Profile photo"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  Change photo
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
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
                  id="first-name"
                  value={profileData.first_name || ''}
                  onChange={(e) => setProfileData(prev => ({ ...prev, first_name: e.target.value }))}
                  className={commonInputClasses}
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  id="last-name"
                  value={profileData.last_name || ''}
                  onChange={(e) => setProfileData(prev => ({ ...prev, last_name: e.target.value }))}
                  className={commonInputClasses}
                  placeholder="Enter your last name"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="headline" className="block text-sm font-medium text-gray-700">
                  Headline
                </label>
                <input
                  type="text"
                  id="headline"
                  maxLength={160}
                  value={profileData.headline || ''}
                  onChange={(e) => setProfileData(prev => ({ ...prev, headline: e.target.value }))}
                  className={commonInputClasses}
                  placeholder="Enter your headline"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  value={profileData.bio || ''}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className={commonInputClasses}
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

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
            <select className={commonInputClasses}>
              <option value="">Select language</option>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Zone
            </label>
            <select className={commonInputClasses}>
              <option value="">Select time zone</option>
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

const PasswordSection = () => {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords don't match");
      setLoading(false);
      return;
    }

    // Validate password strength (minimum 6 characters)
    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword
      });

      if (error) throw error;

      // Clear form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  // Common input class with more visible border
  const commonInputClasses = "mt-1 block w-full rounded-md border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors duration-200";

  return (
    <section aria-labelledby="password-heading">
      <div className="bg-white shadow-lg rounded-xl">
        <div className="px-6 py-5">
          <h2 id="password-heading" className="text-2xl font-bold text-gray-900">Change Password</h2>
          <p className="mt-1 text-lg text-gray-500">
            Update your password to keep your account secure
          </p>
        </div>
        <div className="border-t border-gray-200 px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  required
                  className={commonInputClasses}
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                  minLength={6}
                  className={commonInputClasses}
                  placeholder="Enter new password"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Password must be at least 6 characters long
                </p>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  className={commonInputClasses}
                  placeholder="Enter confirm password"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

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
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0"
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
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0"
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
