'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
  BuildingOfficeIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export default function RecruiterVerification() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    companyWebsite: '',
    jobTitle: '',
    yearsOfExperience: '',
    linkedinProfile: '',
    companySize: '',
    industry: '',
    reasonForJoining: '',
    termsAccepted: false,
  });
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast.error('You must accept the terms and conditions');
      return;
    }
    
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      
      if (!user) {
        toast.error('You must be logged in to submit this form');
        router.push('/login');
        return;
      }
      
      // Check if recruiter_verifications table exists
      const { error: tableError } = await supabase
        .from('recruiter_verifications')
        .select('id')
        .limit(1);
        
      if (tableError && tableError.code === '42P01') {
        // Table doesn't exist, create it
        await createVerificationsTable();
      }
      
      // Submit verification request
      const { error } = await supabase
        .from('recruiter_verifications')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.companyName,
          company_website: formData.companyWebsite,
          job_title: formData.jobTitle,
          years_of_experience: formData.yearsOfExperience,
          linkedin_profile: formData.linkedinProfile,
          company_size: formData.companySize,
          industry: formData.industry,
          reason_for_joining: formData.reasonForJoining,
          status: 'pending',
          created_at: new Date().toISOString(),
        });
        
      if (error) throw error;
      
      // Update user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          verification_status: 'pending',
          role: 'recruiter',
        })
        .eq('id', user.id);
        
      if (profileError) {
        console.error('Error updating profile:', profileError);
      }
      
      toast.success('Verification request submitted successfully');
      router.push('/verification/success');
    } catch (error) {
      console.error('Error submitting verification request:', error);
      toast.error('Failed to submit verification request');
    } finally {
      setLoading(false);
    }
  };

  const createVerificationsTable = async () => {
    try {
      // Create the verifications table using SQL
      const { error } = await supabase.rpc('create_recruiter_verifications_table');
      
      if (error) {
        // If RPC doesn't exist, create the table using a different approach
        // This is a simplified approach - in a real app, you'd use migrations
        await supabase.auth.getSession();
        
        // For demo purposes, we'll just show a toast
        toast.error('Could not create verifications table. Please contact support.');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error creating verifications table:', error);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Recruiter Verification</h1>
            <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
              Complete this form to verify your recruiter account and gain access to post jobs and search for candidates
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-20">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <CheckBadgeIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">Recruiter Verification Form</h2>
                <p className="text-gray-600">Please provide the following information to verify your account</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-blue-500" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700">
                    LinkedIn Profile
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      name="linkedinProfile"
                      id="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <BuildingOfficeIcon className="h-5 w-5 mr-2 text-blue-500" />
                Company Information
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">
                    Company Website *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      name="companyWebsite"
                      id="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleInputChange}
                      required
                      placeholder="https://example.com"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
                    Company Size *
                  </label>
                  <div className="mt-1">
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1001+">1001+ employees</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Industry *
                  </label>
                  <div className="mt-1">
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Media">Media</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <BriefcaseIcon className="h-5 w-5 mr-2 text-blue-500" />
                Professional Information
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    Job Title *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="jobTitle"
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                    Years of Experience in Recruiting *
                  </label>
                  <div className="mt-1">
                    <select
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select experience</option>
                      <option value="Less than 1 year">Less than 1 year</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="reasonForJoining" className="block text-sm font-medium text-gray-700">
                    Why do you want to join our platform as a recruiter? *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="reasonForJoining"
                      name="reasonForJoining"
                      rows={4}
                      value={formData.reasonForJoining}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                  I agree to the terms and conditions *
                </label>
                <p className="text-gray-500">
                  By checking this box, you agree to our{' '}
                  <a href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit for Verification'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
