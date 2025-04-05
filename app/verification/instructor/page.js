'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
  AcademicCapIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  BookOpenIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function InstructorVerification() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: '',
    qualification: '',
    institution: '',
    yearsOfExperience: '',
    linkedinProfile: '',
    website: '',
    biography: '',
    teachingExperience: '',
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
      
      // Check if instructor_verifications table exists
      const { error: tableError } = await supabase
        .from('instructor_verifications')
        .select('id')
        .limit(1);
        
      if (tableError && tableError.code === '42P01') {
        // Table doesn't exist, create it
        await createVerificationsTable();
      }
      
      // Submit verification request
      const { error } = await supabase
        .from('instructor_verifications')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          specialization: formData.specialization,
          qualification: formData.qualification,
          institution: formData.institution,
          years_of_experience: formData.yearsOfExperience,
          linkedin_profile: formData.linkedinProfile,
          website: formData.website,
          biography: formData.biography,
          teaching_experience: formData.teachingExperience,
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
          role: 'instructor',
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
      const { error } = await supabase.rpc('create_instructor_verifications_table');
      
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
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Instructor Verification</h1>
            <p className="mt-4 text-xl text-purple-100 max-w-3xl mx-auto">
              Complete this form to verify your instructor account and gain access to create and publish courses
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-20">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3">
                <CheckBadgeIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">Instructor Verification Form</h2>
                <p className="text-gray-600">Please provide the following information to verify your account</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-purple-500" />
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
                      className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
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
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
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
                      className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Background */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <AcademicCapIcon className="h-5 w-5 mr-2 text-purple-500" />
                Educational Background
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                    Highest Qualification *
                  </label>
                  <div className="mt-1">
                    <select
                      id="qualification"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select qualification</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                    Institution *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="institution"
                      id="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                    Specialization/Field *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="specialization"
                      id="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Personal Website/Portfolio
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      name="website"
                      id="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Teaching Experience */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-2 text-purple-500" />
                Teaching Experience
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                    Years of Teaching Experience *
                  </label>
                  <div className="mt-1">
                    <select
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                  <label htmlFor="teachingExperience" className="block text-sm font-medium text-gray-700">
                    Describe your teaching experience and areas of expertise *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="teachingExperience"
                      name="teachingExperience"
                      rows={4}
                      value={formData.teachingExperience}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="biography" className="block text-sm font-medium text-gray-700">
                    Professional Biography *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="biography"
                      name="biography"
                      rows={4}
                      value={formData.biography}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="This will be displayed on your instructor profile"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Write a brief professional biography that highlights your expertise and experience.
                  </p>
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
                  className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                  I agree to the terms and conditions *
                </label>
                <p className="text-gray-500">
                  By checking this box, you agree to our{' '}
                  <a href="/terms" className="text-purple-600 hover:text-purple-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-purple-600 hover:text-purple-500">
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
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
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
