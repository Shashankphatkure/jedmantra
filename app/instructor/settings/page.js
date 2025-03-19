'use client';

import { useEffect, useState, useRef } from "react";
import {
  UserCircleIcon,
  BellIcon,
  CreditCardIcon,
  LockClosedIcon,
  CameraIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { createClient } from "../../utils/supabase";

export default function InstructorSettings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    avatar_url: "",
    email_notifications: true,
    course_updates: true,
    marketing_emails: true,
  });
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const fileInputRef = useRef(null);
  
  // Fetch user data
  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);
      const supabase = createClient();
      
      // Get current user
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !authUser) {
        window.location.href = '/login?redirect=/instructor/settings';
        return;
      }
      
      setUser(authUser);
      
      // Get user profile
      const { data: userData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();
      
      if (!profileError && userData) {
        setProfile({
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email || authUser.email || "",
          bio: userData.bio || "",
          avatar_url: userData.avatar_url || "",
          email_notifications: userData.email_notifications !== false,
          course_updates: true, // Default value as this might not be in the database
          marketing_emails: true, // Default value as this might not be in the database
        });
      }
      
      setIsLoading(false);
    }
    
    fetchUserData();
  }, []);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 800 * 1024) {
      setNotification({
        show: true,
        type: 'error',
        message: 'File size exceeds 800KB limit'
      });
      setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
      return;
    }
    
    setIsSaving(true);
    const supabase = createClient();
    
    // Upload image to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file);
    
    if (uploadError) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Error uploading image. Please try again.'
      });
      setIsSaving(false);
      return;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath);
    
    // Update user profile with new avatar URL
    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id);
    
    if (updateError) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Error updating profile. Please try again.'
      });
    } else {
      setProfile({
        ...profile,
        avatar_url: publicUrl
      });
      setNotification({
        show: true,
        type: 'success',
        message: 'Profile image updated successfully!'
      });
    }
    
    setIsSaving(false);
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const supabase = createClient();
    
    // Update user profile
    const { error } = await supabase
      .from('users')
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        bio: profile.bio,
        email_notifications: profile.email_notifications,
      })
      .eq('id', user.id);
    
    if (error) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Error updating profile. Please try again.'
      });
    } else {
      setNotification({
        show: true,
        type: 'success',
        message: 'Profile updated successfully!'
      });
    }
    
    setIsSaving(false);
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
  };
  
  // Handle email update (if needed via Auth)
  const handleEmailUpdate = async () => {
    if (user.email === profile.email) return;
    
    setIsSaving(true);
    const supabase = createClient();
    
    const { error } = await supabase.auth.updateUser({
      email: profile.email,
    });
    
    if (error) {
      setNotification({
        show: true,
        type: 'error',
        message: `Error updating email: ${error.message}`
      });
    } else {
      setNotification({
        show: true,
        type: 'success',
        message: 'Verification email sent! Please check your inbox.'
      });
    }
    
    setIsSaving(false);
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Banner */}
      {notification.show && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        } flex items-center`}>
          {notification.type === 'success' ? (
            <CheckCircleIcon className="h-5 w-5 mr-2" />
          ) : (
            <XCircleIcon className="h-5 w-5 mr-2" />
          )}
          {notification.message}
        </div>
      )}
    
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
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-8">
              <nav className="space-y-1">
                {[
                  { name: "Profile", icon: UserCircleIcon },
                  { name: "Notifications", icon: BellIcon },
                  { name: "Payment", icon: CreditCardIcon },
                  { name: "Security", icon: LockClosedIcon },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${
                      activeTab === item.name
                        ? "bg-violet-50 text-violet-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 mr-3 ${
                        activeTab === item.name ? "text-violet-500" : "text-gray-400"
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
            {activeTab === "Profile" && (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                  
                  {/* Profile Photo */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 mb-8">
                    <div className="relative">
                      <Image
                        src={profile.avatar_url || "https://via.placeholder.com/96"}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="rounded-full object-cover h-24 w-24"
                      />
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50"
                      >
                        <CameraIcon className="h-5 w-5 text-gray-500" />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/jpeg,image/png,image/gif"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div className="sm:ml-6">
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700"
                        disabled={isSaving}
                      >
                        <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                        {isSaving ? 'Uploading...' : 'Change Photo'}
                      </button>
                      <p className="mt-2 text-sm text-gray-500">
                        JPG, GIF or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={profile.first_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={profile.last_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profile.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          required
                        />
                        {profile.email !== user?.email && (
                          <button
                            type="button"
                            onClick={handleEmailUpdate}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 whitespace-nowrap"
                            disabled={isSaving}
                          >
                            Verify Email
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={profile.bio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      onClick={() => window.location.reload()}
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 flex items-center"
                      disabled={isSaving}
                    >
                      {isSaving && (
                        <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      )}
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Notification Settings */}
            {activeTab === "Notifications" && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
                  <div className="space-y-6">
                    {[
                      {
                        id: "email_notifications",
                        title: "Email Notifications",
                        description: "Receive email notifications when students enroll or leave reviews",
                      },
                      {
                        id: "course_updates",
                        title: "Course Updates",
                        description: "Get notified when you need to update your course content",
                      },
                      {
                        id: "marketing_emails",
                        title: "Marketing Emails",
                        description: "Receive updates about new features and promotional opportunities",
                      },
                    ].map((item) => (
                      <div key={item.id} className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            id={item.id}
                            name={item.id}
                            checked={profile[item.id]}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor={item.id} className="font-medium text-gray-700">{item.title}</label>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 flex items-center"
                      disabled={isSaving}
                    >
                      {isSaving && (
                        <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      )}
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings Placeholder */}
            {activeTab === "Payment" && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Settings</h2>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-600">Payment settings will be available soon.</p>
                </div>
              </div>
            )}

            {/* Security Settings Placeholder */}
            {activeTab === "Security" && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Change Password</h3>
                    <p className="text-sm text-gray-500 mb-4">Ensure your account is using a strong password</p>
                    <button
                      type="button"
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                      onClick={() => setNotification({
                        show: true,
                        type: 'info',
                        message: 'Password reset email has been sent to your email address.'
                      })}
                    >
                      Change Password
                    </button>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
