'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  UsersIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function CreateJob() {
  const supabase = createClientComponentClient();
  
  const [formData, setFormData] = useState({
    title: '',
    company_name: '',
    location: '',
    department: '',
    job_type: 'FULL_TIME',
    experience_level: 'MID_LEVEL',
    is_remote: false,
    salary_min: '',
    salary_max: '',
    salary_currency: 'GBP',
    team_size: '',
    required_experience_years: '',
    description: '',
    responsibilities: [''],
    requirements: [''],
    benefits: [''],
    skills: [''],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleArrayFieldAdd = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], '']
    }));
  };

  const handleArrayFieldRemove = (fieldName, index) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }));
  };

  const handleArrayFieldChange = (fieldName, index, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) => i === index ? value : item)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Insert job posting
      const { data: job, error: jobError } = await supabase
        .from('jobs')
        .insert([{
          ...formData,
          responsibilities: formData.responsibilities.filter(Boolean),
          requirements: formData.requirements.filter(Boolean),
          benefits: formData.benefits.filter(Boolean),
        }])
        .select()
        .single();

      if (jobError) throw jobError;

      // Insert skills
      const skillPromises = formData.skills
        .filter(Boolean)
        .map(async (skillName) => {
          // First try to insert the skill
          const { data: skill, error: skillError } = await supabase
            .from('job_skills')
            .insert([{ name: skillName }])
            .select()
            .single();

          // If skill already exists, fetch it
          if (skillError && skillError.code === '23505') {
            const { data: existingSkill } = await supabase
              .from('job_skills')
              .select()
              .eq('name', skillName)
              .single();
            return existingSkill;
          }

          return skill;
        });

      const skills = await Promise.all(skillPromises);

      // Link skills to job
      await Promise.all(
        skills.map((skill) =>
          supabase
            .from('job_skill_requirements')
            .insert([{ job_id: job.id, skill_id: skill.id }])
        )
      );

      // Redirect to job listing
      window.location.href = `/recruiter/jobs/${job.id}`;
    } catch (error) {
      console.error('Error creating job:', error);
      setErrors({ submit: 'Failed to create job posting. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <h1 className="text-4xl font-bold text-white">Create New Job</h1>
          <p className="mt-2 text-xl text-white/90">
            Post a new job opportunity and find the perfect candidate
          </p>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Basic Information</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="job_type" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="job_type"
                    value={formData.job_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, job_type: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                    required
                  >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="TEMPORARY">Temporary</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="experience_level"
                    value={formData.experience_level}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience_level: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                    required
                  >
                    <option value="ENTRY_LEVEL">Entry Level</option>
                    <option value="MID_LEVEL">Mid Level</option>
                    <option value="SENIOR">Senior</option>
                    <option value="LEAD">Lead</option>
                    <option value="MANAGER">Manager</option>
                    <option value="EXECUTIVE">Executive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3 h-full pt-6">
                <label htmlFor="is_remote" className="text-sm font-medium text-gray-700">
                  Remote Position
                </label>
                <input
                  type="checkbox"
                  id="is_remote"
                  checked={formData.is_remote}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_remote: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="salary_min" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Minimum Salary
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="salary_min"
                    value={formData.salary_min}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary_min: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="salary_max" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Maximum Salary
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="salary_max"
                    value={formData.salary_max}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary_max: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="salary_currency" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Salary Currency
                </label>
                <div className="mt-1">
                  <select
                    id="salary_currency"
                    value={formData.salary_currency}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary_currency: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                  >
                    <option value="GBP">GBP (£)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="team_size" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Team Size
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="team_size"
                    value={formData.team_size}
                    onChange={(e) => setFormData(prev => ({ ...prev, team_size: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                    placeholder="e.g., 5-10 people"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="required_experience_years" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Required Years of Experience
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="required_experience_years"
                    value={formData.required_experience_years}
                    onChange={(e) => setFormData(prev => ({ ...prev, required_experience_years: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Arrays Section */}
          <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Additional Details</h2>
            
            {/* Responsibilities */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Responsibilities
              </label>
              {formData.responsibilities.map((item, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayFieldChange('responsibilities', index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                    placeholder="Add a responsibility"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayFieldRemove('responsibilities', index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleArrayFieldAdd('responsibilities')}
                className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Responsibility
              </button>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Requirements
              </label>
              {formData.requirements.map((item, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                    placeholder="Add a requirement"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayFieldRemove('requirements', index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleArrayFieldAdd('requirements')}
                className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Requirement
              </button>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Benefits
              </label>
              {formData.benefits.map((item, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayFieldChange('benefits', index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                    placeholder="Add a benefit"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayFieldRemove('benefits', index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleArrayFieldAdd('benefits')}
                className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Benefit
              </button>
            </div>

            {/* Skills */}
            <div className="space-y-10">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Required Skills
              </label>
              {formData.skills.map((item, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayFieldChange('skills', index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                    placeholder="Add a skill"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayFieldRemove('skills', index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleArrayFieldAdd('skills')}
                className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Skill
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Publish Job'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
