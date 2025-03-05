'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Dialog } from '@headlessui/react';
import {
  MapPinIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PencilSquareIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    headline: '',
    location: '',
    bio: '',
    phone_number: '',
    website: '',
    linkedin_url: '',
    github_url: '',
    projects: [],
    courses: [],
    major: '',
    minor: '',
    graduation_year: '',
    achievements: [],
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const supabase = createClientComponentClient();

  // Fetch user profile
  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) {
          throw new Error('Not authenticated');
        }

        const { data: profiles, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id);

        if (error) throw error;

        if (!profiles || profiles.length === 0) {
          // Create new profile if none exists
          const { data: newProfile, error: createError } = await supabase
            .from('users')
            .insert([{
              id: authUser.id,
              email: authUser.email,
              name: authUser.user_metadata?.full_name || 'New User',
              username: authUser.email.split('@')[0],
            }])
            .select()
            .single();

          if (createError) throw createError;
          setUser(newProfile);
          return;
        }

        setUser(profiles[0]);
      } catch (error) {
        console.error('Error loading user profile:', error.message);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [supabase]);

  // Handle form updates
  const handleUpdate = async () => {
    try {
      if (!user?.id || !formData) return;

      setLoading(true);
      
      const { error } = await supabase
        .from('users')
        .update(formData)
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      setUser({ ...user, ...formData });
      
      // Reset form state
      handleCloseEdit();

    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit modal open
  const handleOpenEdit = (section, initialData = {}) => {
    setIsEditing(true);
    setEditSection(section);
    setFormData({
      name: '',
      headline: '',
      location: '',
      bio: '',
      phone_number: '',
      website: '',
      linkedin_url: '',
      github_url: '',
      projects: [],
      courses: [],
      major: '',
      minor: '',
      graduation_year: '',
      achievements: [],
      ...initialData
    });
  };

  // Handle edit modal close
  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditSection(null);
    setFormData({
      name: '',
      headline: '',
      location: '',
      bio: '',
      phone_number: '',
      website: '',
      linkedin_url: '',
      github_url: '',
      projects: [],
      courses: [],
      major: '',
      minor: '',
      graduation_year: '',
      achievements: [],
    });
  };

  // Edit Modal Component
  const EditModal = ({ isOpen, onClose, title, children }) => {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        {/* Improved backdrop with blur effect */}
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                {title}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Content with scroll */}
            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
              {children}
            </div>

            {/* Footer - for modals that need it */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleUpdate();
                    onClose();
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  };

  // Update the input and textarea styles
  const inputStyles = "mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition-colors text-base";
  const textareaStyles = "mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition-colors text-base min-h-[100px]";

  // Add this function to handle avatar updates
  const handleAvatarUpdate = async (event) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setLoading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = fileName;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl); // Check the URL in console

      // Update user profile
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Update local state
      setUser({ ...user, avatar_url: publicUrl });
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading avatar');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // Not authenticated state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Not authenticated</h2>
          <p className="mt-2 text-gray-600">Please sign in to view your profile</p>
          <Link href="/auth/signin" className="mt-4 inline-block bg-pink-600 text-white px-6 py-2 rounded-lg">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              <Image
                src={user?.avatar_url || '/default-avatar.png'}
                alt="Profile"
                fill
                className="rounded-full border-4 border-white shadow-xl object-cover"
                loader={({ src }) => src}
                unoptimized={true}
              />
              <label 
                htmlFor="avatar-upload"
                className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 cursor-pointer"
              >
                <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpdate}
                />
              </label>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">{user?.name}</h1>
              <p className="text-xl text-white/90 mb-4">{user?.headline || 'Student'}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {user?.major && (
                  <span className="px-4 py-1.5 bg-white/20 rounded-full text-white text-sm">
                    {user.major}
                  </span>
                )}
                {user?.graduation_year && (
                  <span className="px-4 py-1.5 bg-white/20 rounded-full text-white text-sm">
                    Class of {user.graduation_year}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl transform -mt-10 relative z-20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {/* Profile Completion with Progress Bar */}
            <div className="p-6 border-b sm:last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-gray-200 hover:bg-gray-50 transition-colors group min-h-[140px]">
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Profile Completion</h3>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                {(() => {
                  const fields = [
                    user?.name,
                    user?.headline,
                    user?.bio,
                    user?.major,
                    user?.graduation_year,
                    user?.phone_number,
                    user?.website,
                    user?.skills?.length > 0,
                    user?.projects?.length > 0,
                    user?.experience?.length > 0
                  ];
                  const completedFields = fields.filter(Boolean).length;
                  const percentage = Math.round((completedFields / fields.length) * 100);
                  
                  return (
                    <div>
                      <div className="text-3xl font-bold text-indigo-600 mb-2">{percentage}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">{completedFields} of {fields.length} items completed</p>
                    </div>
                  );
                })()}
              </div>
            </div>
            
            {/* Courses */}
            <div className="p-6 border-b sm:last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer min-h-[140px]" onClick={() => handleOpenEdit('courses', { courses: user.courses || [] })}>
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Courses</h3>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">{user?.courses?.length || 0}</div>
                  <p className="text-xs text-gray-500">Click to add courses</p>
                </div>
              </div>
            </div>
            
            {/* Projects */}
            <div className="p-6 border-b sm:last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer min-h-[140px]" onClick={() => handleOpenEdit('projects', { projects: user.projects || [] })}>
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Projects</h3>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{user?.projects?.length || 0}</div>
                  <p className="text-xs text-gray-500">Click to add projects</p>
                </div>
              </div>
            </div>
            
            {/* Achievements */}
            <div className="p-6 border-b sm:last:border-b-0 md:border-b-0 md:last:border-r-0 border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer min-h-[140px]" onClick={() => handleOpenEdit('achievements', { achievements: user.achievements || [] })}>
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Achievements</h3>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">{user?.achievements?.length || 0}</div>
                  <div className="flex items-center">
                    <p className="text-xs text-gray-500">Click to manage achievements</p>
                    <span className="ml-2 px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full">New</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-8">
            {/* Academic Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Academic Info</h2>
                <button 
                  onClick={() => handleOpenEdit('academic', {
                    major: user.major,
                    minor: user.minor,
                    graduation_year: user.graduation_year
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Major</label>
                  <p className="text-gray-900">{user?.major || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Minor</label>
                  <p className="text-gray-900">{user?.minor || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Expected Graduation</label>
                  <p className="text-gray-900">{user?.graduation_year || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
                <button 
                  onClick={() => handleOpenEdit('skills')}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {user?.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <button 
                  onClick={() => handleOpenEdit('contact', {
                    phone_number: user.phone_number,
                    website: user.website,
                    linkedin_url: user.linkedin_url,
                    github_url: user.github_url
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { icon: EnvelopeIcon, value: user.email },
                  { icon: PhoneIcon, value: user.phone_number },
                  { icon: GlobeAltIcon, value: user.website },
                ].filter(item => item.value).map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <contact.icon className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                    <span className="ml-3 text-gray-600 group-hover:text-gray-900">
                      {contact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                <button 
                  onClick={() => handleOpenEdit('basic', {
                    name: user.name,
                    headline: user.headline,
                    location: user.location
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Headline</label>
                  <p className="text-gray-900">{user?.headline || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Location</label>
                  <p className="text-gray-900">{user?.location || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">About</h2>
                <button 
                  onClick={() => handleOpenEdit('bio')}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-600 whitespace-pre-wrap">{user?.bio || 'No bio provided yet.'}</p>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
                <button 
                  onClick={() => handleOpenEdit('projects', { 
                    projects: user.projects || [] 
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-6">
                {user?.projects?.map((project, index) => (
                  <div 
                    key={index} 
                    className="p-6 border border-gray-200 rounded-xl space-y-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-medium text-gray-900">Project #{index + 1}</h4>
                      <button
                        onClick={() => {
                          const newProjects = user.projects.filter((_, i) => i !== index);
                          setFormData({ ...formData, projects: newProjects });
                        }}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Project fields */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Name
                        </label>
                        <input
                          type="text"
                          className={inputStyles}
                          value={project.name || ''}
                          onChange={(e) => {
                            const newProjects = [...user.projects];
                            newProjects[index] = { ...project, name: e.target.value };
                            setFormData({ ...formData, projects: newProjects });
                          }}
                          placeholder="Enter project name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          className={textareaStyles}
                          value={project.description || ''}
                          onChange={(e) => {
                            const newProjects = [...user.projects];
                            newProjects[index] = { ...project, description: e.target.value };
                            setFormData({ ...formData, projects: newProjects });
                          }}
                          placeholder="Describe your project..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    const newProjects = [...(user.projects || []), { name: '', description: '', url: '' }];
                    setFormData({ ...formData, projects: newProjects });
                  }}
                  className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add New Project
                </button>
              </div>
            </div>

            {/* Coursework */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Relevant Coursework</h2>
                <button 
                  onClick={() => handleOpenEdit('courses', { 
                    courses: user.courses || [] 
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user?.courses?.map((course, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.code}</p>
                    {course.grade && (
                      <p className="text-sm text-indigo-600 mt-1">Grade: {course.grade}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Experience - update with hover effects */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Experience
                </h3>
                <button 
                  onClick={() => handleOpenEdit('experience', { 
                    experience: user.experience || [] 
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-6">
                {user.experience?.map((exp, index) => (
                  <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">{exp.title}</h4>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {exp.start_date} - {exp.end_date || 'Present'}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education - update with hover effects */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Education
                </h3>
                <button 
                  onClick={() => handleOpenEdit('education', { 
                    education: user.education || [] 
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-6">
                {user.education?.map((edu, index) => (
                  <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">{edu.degree}</h4>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {edu.start_date} - {edu.end_date}
                      </div>
                    </div>
                    {edu.grade && <p className="mt-2 text-gray-600">{edu.grade}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications - update with hover effects */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Certifications
                </h3>
                <button 
                  onClick={() => handleOpenEdit('certifications', { 
                    certifications: user.certifications || [] 
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                {user.certifications?.map((cert, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                    </div>
                    <div className="text-sm text-gray-500">{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Achievements
                  <span className="ml-2 px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full">New</span>
                </h3>
                <button 
                  onClick={() => handleOpenEdit('achievements', { 
                    achievements: user.achievements || [] 
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
              
              {user.achievements && user.achievements.length > 0 ? (
                <div className="space-y-4">
                  {user.achievements.map((achievement, index) => (
                    <div key={index} className="p-4 border-l-4 border-amber-400 bg-amber-50 rounded-r-lg">
                      <div className="flex justify-between">
                        <h4 className="text-base font-medium text-gray-900">{achievement.title}</h4>
                        {achievement.date && (
                          <span className="text-sm text-amber-700">{achievement.date}</span>
                        )}
                      </div>
                      {achievement.description && (
                        <p className="mt-2 text-sm text-gray-600">{achievement.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-amber-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="mt-4 text-gray-500">No achievements added yet</p>
                  <button
                    onClick={() => handleOpenEdit('achievements', { achievements: [] })}
                    className="mt-4 px-4 py-2 text-sm font-medium text-amber-600 border border-amber-600 rounded-md hover:bg-amber-50"
                  >
                    Add Your First Achievement
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modals */}
      <EditModal
        isOpen={isEditing && editSection === 'basic'}
        onClose={handleCloseEdit}
        title="Edit Basic Information"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className={inputStyles}
              value={formData?.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Headline
            </label>
            <input
              type="text"
              className={inputStyles}
              value={formData?.headline || ''}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              placeholder="e.g., Software Engineer | Student at University"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              className={inputStyles}
              value={formData?.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., San Francisco, CA"
            />
          </div>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditing && editSection === 'bio'}
        onClose={handleCloseEdit}
        title="Edit Bio"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              className={textareaStyles}
              rows={4}
              value={formData.bio || user?.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Write a brief description about yourself..."
            />
          </div>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditing && editSection === 'contact'}
        onClose={handleCloseEdit}
        title="Edit Contact Information"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              className={inputStyles}
              value={formData.phone_number || ''}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input
              type="url"
              className={inputStyles}
              value={formData.website || ''}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <input
              type="url"
              className={inputStyles}
              value={formData.linkedin_url || ''}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">GitHub</label>
            <input
              type="url"
              className={inputStyles}
              value={formData.github_url || ''}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            />
          </div>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditing && editSection === 'academic'}
        onClose={handleCloseEdit}
        title="Edit Academic Information"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Major</label>
            <input
              type="text"
              className={inputStyles}
              value={formData?.major || ''}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              placeholder="Enter your major"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Minor</label>
            <input
              type="text"
              className={inputStyles}
              value={formData?.minor || ''}
              onChange={(e) => setFormData({ ...formData, minor: e.target.value })}
              placeholder="Enter your minor (if applicable)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Graduation Year</label>
            <input
              type="text"
              className={inputStyles}
              value={formData?.graduation_year || ''}
              onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
              placeholder="Enter graduation year"
            />
          </div>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditing && editSection === 'skills'}
        onClose={handleCloseEdit}
        title="Edit Skills"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Skills</label>
            <input
              type="text"
              placeholder="Enter skills separated by commas"
              className={inputStyles}
              value={formData.skills?.join(', ') || ''}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
            />
            <p className="mt-2 text-sm text-gray-500">
              Enter your skills separated by commas (e.g., JavaScript, React, Node.js)
            </p>
          </div>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditing && editSection === 'experience'}
        onClose={handleCloseEdit}
        title="Edit Experience"
      >
        <div className="space-y-4">
          {formData.experience?.map((exp, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={exp.title || ''}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index] = { ...exp, title: e.target.value };
                    setFormData({ ...formData, experience: newExp });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={exp.company || ''}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index] = { ...exp, company: e.target.value };
                    setFormData({ ...formData, experience: newExp });
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="text"
                    className={inputStyles}
                    value={exp.start_date || ''}
                    onChange={(e) => {
                      const newExp = [...formData.experience];
                      newExp[index] = { ...exp, start_date: e.target.value };
                      setFormData({ ...formData, experience: newExp });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="text"
                    className={inputStyles}
                    value={exp.end_date || ''}
                    onChange={(e) => {
                      const newExp = [...formData.experience];
                      newExp[index] = { ...exp, end_date: e.target.value };
                      setFormData({ ...formData, experience: newExp });
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className={textareaStyles}
                  rows={3}
                  value={exp.description || ''}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index] = { ...exp, description: e.target.value };
                    setFormData({ ...formData, experience: newExp });
                  }}
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newExp = [...(formData.experience || []), {
                title: '',
                company: '',
                start_date: '',
                end_date: '',
                description: ''
              }];
              setFormData({ ...formData, experience: newExp });
            }}
            className="w-full px-4 py-2 text-sm font-medium text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50"
          >
            Add Experience
          </button>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditing && editSection === 'education'}
        onClose={handleCloseEdit}
        title="Edit Education"
      >
        <div className="space-y-4">
          {formData.education?.map((edu, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={edu.degree || ''}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index] = { ...edu, degree: e.target.value };
                    setFormData({ ...formData, education: newEdu });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={edu.institution || ''}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index] = { ...edu, institution: e.target.value };
                    setFormData({ ...formData, education: newEdu });
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Year</label>
                  <input
                    type="text"
                    className={inputStyles}
                    value={edu.start_date || ''}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index] = { ...edu, start_date: e.target.value };
                      setFormData({ ...formData, education: newEdu });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Year</label>
                  <input
                    type="text"
                    className={inputStyles}
                    value={edu.end_date || ''}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index] = { ...edu, end_date: e.target.value };
                      setFormData({ ...formData, education: newEdu });
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grade/Honors</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={edu.grade || ''}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index] = { ...edu, grade: e.target.value };
                    setFormData({ ...formData, education: newEdu });
                  }}
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newEdu = [...(formData.education || []), {
                degree: '',
                institution: '',
                start_date: '',
                end_date: '',
                grade: ''
              }];
              setFormData({ ...formData, education: newEdu });
            }}
            className="w-full px-4 py-2 text-sm font-medium text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50"
          >
            Add Education
          </button>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditing && editSection === 'certifications'}
        onClose={handleCloseEdit}
        title="Edit Certifications"
      >
        <div className="space-y-4">
          {formData.certifications?.map((cert, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Certification Name</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={cert.name || ''}
                  onChange={(e) => {
                    const newCert = [...formData.certifications];
                    newCert[index] = { ...cert, name: e.target.value };
                    setFormData({ ...formData, certifications: newCert });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={cert.issuer || ''}
                  onChange={(e) => {
                    const newCert = [...formData.certifications];
                    newCert[index] = { ...cert, issuer: e.target.value };
                    setFormData({ ...formData, certifications: newCert });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={cert.date || ''}
                  onChange={(e) => {
                    const newCert = [...formData.certifications];
                    newCert[index] = { ...cert, date: e.target.value };
                    setFormData({ ...formData, certifications: newCert });
                  }}
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newCert = [...(formData.certifications || []), {
                name: '',
                issuer: '',
                date: ''
              }];
              setFormData({ ...formData, certifications: newCert });
            }}
            className="w-full px-4 py-2 text-sm font-medium text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50"
          >
            Add Certification
          </button>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditing && editSection === 'projects'}
        onClose={handleCloseEdit}
        title="Edit Projects"
      >
        <div className="space-y-4">
          {formData.projects?.map((project, index) => (
            <div 
              key={index} 
              className="p-6 border border-gray-200 rounded-xl space-y-4 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-medium text-gray-900">Project #{index + 1}</h4>
                <button
                  onClick={() => {
                    const newProjects = formData.projects.filter((_, i) => i !== index);
                    setFormData({ ...formData, projects: newProjects });
                  }}
                  className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Project fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className={inputStyles}
                    value={project.name || ''}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index] = { ...project, name: e.target.value };
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    placeholder="Enter project name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className={textareaStyles}
                    value={project.description || ''}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index] = { ...project, description: e.target.value };
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    placeholder="Describe your project..."
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => {
              const newProjects = [...(formData.projects || []), { name: '', description: '', url: '' }];
              setFormData({ ...formData, projects: newProjects });
            }}
            className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Project
          </button>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditing && editSection === 'courses'}
        onClose={handleCloseEdit}
        title="Edit Coursework"
      >
        <div className="space-y-4">
          {formData.courses?.map((course, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Name</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={course.name || ''}
                  onChange={(e) => {
                    const newCourses = [...(formData.courses || [])];
                    newCourses[index] = { ...course, name: e.target.value };
                    setFormData({ ...formData, courses: newCourses });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Code</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={course.code || ''}
                  onChange={(e) => {
                    const newCourses = [...(formData.courses || [])];
                    newCourses[index] = { ...course, code: e.target.value };
                    setFormData({ ...formData, courses: newCourses });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grade</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={course.grade || ''}
                  onChange={(e) => {
                    const newCourses = [...(formData.courses || [])];
                    newCourses[index] = { ...course, grade: e.target.value };
                    setFormData({ ...formData, courses: newCourses });
                  }}
                />
              </div>
              <button
                onClick={() => {
                  const newCourses = formData.courses.filter((_, i) => i !== index);
                  setFormData({ ...formData, courses: newCourses });
                }}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newCourses = [...(formData.courses || []), {
                name: '',
                code: '',
                grade: ''
              }];
              setFormData({ ...formData, courses: newCourses });
            }}
            className="w-full px-4 py-2 text-sm font-medium text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50"
          >
            Add Course
          </button>
        </div>
      </EditModal>

      {/* Achievements Modal */}
      <EditModal
        isOpen={isEditing && editSection === 'achievements'}
        onClose={handleCloseEdit}
        title="Your Achievements"
      >
        <div className="space-y-4">
          {formData.achievements?.map((achievement, index) => (
            <div key={index} className="p-4 border border-amber-100 bg-amber-50 rounded-lg space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Achievement Title</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={achievement.title || ''}
                  onChange={(e) => {
                    const newAchievements = [...(formData.achievements || [])];
                    newAchievements[index] = { ...achievement, title: e.target.value };
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className={textareaStyles}
                  rows={2}
                  value={achievement.description || ''}
                  onChange={(e) => {
                    const newAchievements = [...(formData.achievements || [])];
                    newAchievements[index] = { ...achievement, description: e.target.value };
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date Achieved</label>
                <input
                  type="text"
                  className={inputStyles}
                  value={achievement.date || ''}
                  onChange={(e) => {
                    const newAchievements = [...(formData.achievements || [])];
                    newAchievements[index] = { ...achievement, date: e.target.value };
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                  placeholder="e.g., May 2023"
                />
              </div>
              <button
                onClick={() => {
                  const newAchievements = formData.achievements.filter((_, i) => i !== index);
                  setFormData({ ...formData, achievements: newAchievements });
                }}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newAchievements = [...(formData.achievements || []), {
                title: '',
                description: '',
                date: ''
              }];
              setFormData({ ...formData, achievements: newAchievements });
            }}
            className="w-full px-4 py-2 text-sm font-medium text-amber-600 border border-amber-600 rounded-md hover:bg-amber-50"
          >
            Add Achievement
          </button>
        </div>
      </EditModal>
    </div>
  );
}
