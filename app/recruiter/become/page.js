'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../../components/Footer';

export default function BecomeRecruiterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    industryFocus: '',
    hiringNeeds: '',
    yearsOfExperience: '',
    linkedInProfile: '',
    motivation: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.industryFocus.trim()) newErrors.industryFocus = 'Industry focus is required';
    if (!formData.hiringNeeds.trim()) newErrors.hiringNeeds = 'Hiring needs information is required';
    if (!formData.motivation.trim()) newErrors.motivation = 'Please tell us why you want to join';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your backend API
      // For demonstration, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      // Redirect to confirmation or dashboard page after successful submission
      setTimeout(() => {
        router.push('/recruiter/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'There was an error submitting your application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Become a Recruiter</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Recruiter Application</h2>
          <p className="text-gray-600">
            Thank you for your interest in becoming a recruiter at JedMantra. Please complete the form below to apply.
            Our team will review your application and get back to you within 48 hours.
          </p>
        </div>
        
        {submitSuccess ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
            <h3 className="font-medium">Application Submitted Successfully!</h3>
            <p>Thank you for applying to become a recruiter. We'll review your application and contact you soon.</p>
            <p className="mt-2">Redirecting you to the dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                {errors.submit}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
              </div>
            </div>
            
            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Recruiting Experience
                </label>
                <select
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select experience</option>
                  <option value="0-1">Less than 1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="industryFocus" className="block text-sm font-medium text-gray-700 mb-1">
                Industry Focus <span className="text-red-500">*</span>
              </label>
              <select
                id="industryFocus"
                name="industryFocus"
                value={formData.industryFocus}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.industryFocus ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select your industry focus</option>
                <option value="technology">Technology & IT</option>
                <option value="healthcare">Healthcare & Medical</option>
                <option value="finance">Finance & Banking</option>
                <option value="education">Education & Training</option>
                <option value="manufacturing">Manufacturing & Engineering</option>
                <option value="retail">Retail & Consumer Goods</option>
                <option value="hospitality">Hospitality & Tourism</option>
                <option value="media">Media & Entertainment</option>
                <option value="other">Other</option>
              </select>
              {errors.industryFocus && <p className="mt-1 text-sm text-red-500">{errors.industryFocus}</p>}
            </div>
            
            <div>
              <label htmlFor="hiringNeeds" className="block text-sm font-medium text-gray-700 mb-1">
                Current Hiring Needs <span className="text-red-500">*</span>
              </label>
              <textarea
                id="hiringNeeds"
                name="hiringNeeds"
                value={formData.hiringNeeds}
                onChange={handleChange}
                rows="3"
                placeholder="Describe your current hiring needs, including roles, volume, and timeline"
                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.hiringNeeds ? 'border-red-500' : 'border-gray-300'}`}
              ></textarea>
              {errors.hiringNeeds && <p className="mt-1 text-sm text-red-500">{errors.hiringNeeds}</p>}
            </div>
            
            <div>
              <label htmlFor="linkedInProfile" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                id="linkedInProfile"
                name="linkedInProfile"
                value={formData.linkedInProfile}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
                Why do you want to join JedMantra as a recruiter? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us why you're interested in recruiting on our platform and what you hope to achieve"
                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.motivation ? 'border-red-500' : 'border-gray-300'}`}
              ></textarea>
              {errors.motivation && <p className="mt-1 text-sm text-red-500">{errors.motivation}</p>}
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className={`font-medium ${errors.agreeToTerms ? 'text-red-500' : 'text-gray-700'}`}>
                  I agree to the <a href="/policies/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="/policies/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> <span className="text-red-500">*</span>
                </label>
                {errors.agreeToTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">What Happens Next?</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Our team reviews your application (typically within 48 hours)</li>
            <li>If approved, you'll receive an email with next steps</li>
            <li>You'll set up your recruiter profile and onboarding</li>
            <li>Start posting jobs and connecting with talent</li>
          </ol>
        </div>
      </div>
    </div>
    </>
  );
}