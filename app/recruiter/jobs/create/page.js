'use client';

import { useState, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  BriefcaseIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
  EyeIcon
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
  const [currentSection, setCurrentSection] = useState('basic');
  const [previewMode, setPreviewMode] = useState(false);
  
  const sections = [
    { 
      id: 'basic', 
      name: 'Basic Information', 
      icon: () => <BriefcaseIcon className="w-4 h-4" />
    },
    { 
      id: 'details', 
      name: 'Job Details', 
      icon: () => <DocumentTextIcon className="w-4 h-4" />
    },
    { 
      id: 'requirements', 
      name: 'Requirements & Benefits', 
      icon: () => <ClipboardDocumentCheckIcon className="w-4 h-4" />
    }
  ];

  const validateSection = useCallback((sectionId) => {
    switch(sectionId) {
      case 'basic':
        return !!(formData.title && formData.company_name && formData.location && formData.department);
      case 'details':
        return !!(formData.description && formData.job_type && formData.experience_level);
      case 'requirements':
        return !!(formData.requirements.some(Boolean) && formData.responsibilities.some(Boolean));
      default:
        return false;
    }
  }, [formData]);

  const formatSalaryDisplay = () => {
    const currency = {
      GBP: '£',
      USD: '$',
      EUR: '€'
    }[formData.salary_currency];

    if (formData.salary_min && formData.salary_max) {
      return `${currency}${formData.salary_min.toLocaleString()} - ${currency}${formData.salary_max.toLocaleString()}`;
    } else if (formData.salary_min) {
      return `From ${currency}${formData.salary_min.toLocaleString()}`;
    } else if (formData.salary_max) {
      return `Up to ${currency}${formData.salary_max.toLocaleString()}`;
    }
    return 'Competitive';
  };

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

  const renderBasicInformation = () => (
    <div className="bg-white shadow-sm rounded-lg p-6 ">
      <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );

  const renderJobDetails = () => (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Job Details</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            value={formData.job_type}
            onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
            className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="TEMPORARY">Temporary</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Experience Level</label>
          <select
            value={formData.experience_level}
            onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
            className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value="ENTRY_LEVEL">Entry Level</option>
            <option value="MID_LEVEL">Mid Level</option>
            <option value="SENIOR">Senior</option>
            <option value="EXECUTIVE">Executive</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderRequirementsAndBenefits = () => (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Requirements & Benefits</h2>
      
      {/* Requirements Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">Requirements</label>
        {formData.requirements.map((req, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={req}
              onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
              className="flex-1 rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => handleArrayFieldRemove('requirements', index)}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleArrayFieldAdd('requirements')}
          className="mt-2 text-sm text-blue-600 hover:text-blue-500"
        >
          + Add Requirement
        </button>
      </div>

      {/* Benefits Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">Benefits</label>
        {formData.benefits.map((benefit, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={benefit}
              onChange={(e) => handleArrayFieldChange('benefits', index, e.target.value)}
              className="flex-1 rounded-md border-0 py-1.5 px-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => handleArrayFieldRemove('benefits', index)}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleArrayFieldAdd('benefits')}
          className="mt-2 text-sm text-blue-600 hover:text-blue-500"
        >
          + Add Benefit
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]"></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white">Create New Job</h1>
              <p className="mt-2 text-xl text-white/90">
                Post a new job opportunity and find the perfect candidate
              </p>
            </div>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
            >
              <EyeIcon className="h-5 w-5 mr-2" />
              {previewMode ? 'Edit Mode' : 'Preview'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <nav className="flex justify-between items-center space-x-4" aria-label="Progress">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`flex items-center ${
                  currentSection === section.id
                    ? 'text-blue-600 scale-105 transform transition-all'
                    : validateSection(section.id)
                    ? 'text-green-600'
                    : 'text-gray-500'
                } relative group min-w-0 flex-1 p-2 rounded-lg hover:bg-gray-50`}
              >
                <span className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentSection === section.id
                    ? 'border-blue-400 bg-blue-50'
                    : validateSection(section.id)
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 bg-white'
                } group-hover:border-blue-400 transition-colors`}>
                  {validateSection(section.id) ? (
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  ) : (
                    <span className="text-xl">{section.icon()}</span>
                  )}
                </span>
                <span className="ml-3 text-sm font-medium whitespace-nowrap">{section.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Form Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {previewMode ? (
          <JobPreview formData={formData} formatSalaryDisplay={formatSalaryDisplay} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {currentSection === 'basic' && renderBasicInformation()}
            {currentSection === 'details' && renderJobDetails()}
            {currentSection === 'requirements' && renderRequirementsAndBenefits()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-2 pb-6">
              {currentSection !== 'basic' && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === currentSection);
                    setCurrentSection(sections[currentIndex - 1].id);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Save Draft
                </button>
                
                {currentSection === 'requirements' ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish Job'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === currentSection);
                      setCurrentSection(sections[currentIndex + 1].id);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
