'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

export default function CompanyDetails() {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [company, setCompany] = useState({
    name: '',
    logo_url: '',
    industry: '',
    location: '',
    description: '',
    company_size: '',
    founded_year: '',
    website_url: '',
    linkedin_url: '',
    benefits: [],
    culture_values: [],
  })

  useEffect(() => {
    fetchCompanyDetails()
  }, [])

  const fetchCompanyDetails = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('recruiter_id', user.id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No company exists yet - create one
          const newCompany = {
            name: 'New Company',
            recruiter_id: user.id,
            logo_url: '',
            industry: '',
            location: '',
            description: '',
            company_size: '',
            founded_year: null,
            website_url: '',
            linkedin_url: '',
            open_positions: 0,
            rating: 0.0,
            review_count: 0,
            benefits: [],
            culture_values: [],
            featured: false,
            verified: false
          }

          const { data: createdCompany, error: createError } = await supabase
            .from('companies')
            .insert(newCompany)
            .select()
            .single()

          if (createError) throw createError
          setCompany(createdCompany)
          setEditing(true)
          toast.success('Please complete your company profile')
        } else {
          throw error
        }
      } else if (data) {
        setCompany(data)
      }
    } catch (error) {
      toast.error('Error fetching company details')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const uploadLogo = async () => {
    if (!logoFile) return company.logo_url

    const fileExt = logoFile.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `company-logos/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('logos')
      .upload(filePath, logoFile)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('logos')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      // Upload logo if there's a new file
      const logo_url = await uploadLogo() || company.logo_url
      
      const updateData = {
        ...company,
        logo_url,
        recruiter_id: user.id,
        founded_year: company.founded_year || null,
        open_positions: company.open_positions || 0,
        rating: company.rating || 0.0,
        review_count: company.review_count || 0
      }

      const { error } = await supabase
        .from('companies')
        .update(updateData)
        .eq('id', company.id)
        .eq('recruiter_id', user.id)

      if (error) throw error
      toast.success('Company details updated successfully')
      setEditing(false)
    } catch (error) {
      toast.error('Error updating company details')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCompany(prev => ({
      ...prev,
      [name]: name === 'founded_year' 
        ? value === '' ? null : parseInt(value, 10)
        : value
    }))
  }

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(',').map(item => item.trim())
    setCompany(prev => ({
      ...prev,
      [field]: values
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <div className="flex justify-between items-center mb-8 border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Details</h1>
            <p className="text-gray-600 mt-2">Manage your company's public profile information</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className={`inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 
              ${editing 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
          >
            {editing ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel Editing
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </>
            )}
          </button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Logo Section */}
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">Company Logo</label>
            <div className="flex items-center space-x-6">
              <div className={`relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 
                ${!company.logo_url && !logoPreview ? 'flex items-center justify-center' : ''}`}>
                {(logoPreview || company.logo_url) ? (
                  <Image
                    src={logoPreview || company.logo_url}
                    alt="Company logo"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              {editing && (
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload new logo
                  </label>
                  <p className="mt-2 text-sm text-gray-500">Recommended: 400x400px or larger, PNG or JPG</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={company.name || ''}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full px-4 py-2 rounded-lg shadow-sm transition-colors duration-200
                    ${editing 
                      ? 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-400' 
                      : 'border border-transparent bg-gray-50 text-gray-700'
                    }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={company.industry}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full px-4 py-2 rounded-lg shadow-sm transition-colors duration-200
                    ${editing 
                      ? 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-400' 
                      : 'border border-transparent bg-gray-50 text-gray-700'
                    }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={company.location}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full px-4 py-2 rounded-lg shadow-sm transition-colors duration-200
                    ${editing 
                      ? 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-400' 
                      : 'border border-transparent bg-gray-50 text-gray-700'
                    }`}
                />
              </div>
            </div>

            {/* Company Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Company Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                <input
                  type="text"
                  name="company_size"
                  value={company.company_size}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="e.g., 50-100 employees"
                  className={`w-full px-4 py-2 rounded-lg shadow-sm transition-colors duration-200
                    ${editing 
                      ? 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-400' 
                      : 'border border-transparent bg-gray-50 text-gray-700'
                    }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Founded Year</label>
                <input
                  type="number"
                  name="founded_year"
                  value={company.founded_year || ''}
                  onChange={handleChange}
                  disabled={!editing}
                  min="1800"
                  max={new Date().getFullYear()}
                  className={`w-full px-4 py-2 rounded-lg shadow-sm transition-colors duration-200
                    ${editing 
                      ? 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-400' 
                      : 'border border-transparent bg-gray-50 text-gray-700'
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Company Description</h3>
            <textarea
              name="description"
              value={company.description}
              onChange={handleChange}
              disabled={!editing}
              rows={4}
              placeholder="Tell us about your company..."
              className={`w-full rounded-lg shadow-sm transition-colors duration-200 p-4 resize-y min-h-[120px]
                ${editing 
                  ? 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-400' 
                  : 'border border-transparent bg-gray-50 text-gray-700'
                }`}
            />
          </div>

          {/* Online Presence */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Online Presence</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <input
                    type="url"
                    name="website_url"
                    value={company.website_url}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`pl-10 pr-4 py-2 w-full rounded-lg shadow-sm transition-colors duration-200
                      ${editing 
                        ? 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-400' 
                        : 'border border-transparent bg-gray-50 text-gray-700'
                      }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <input
                    type="url"
                    name="linkedin_url"
                    value={company.linkedin_url}
                    onChange={handleChange}
                    disabled={!editing}
                    className={`pl-10 pr-4 py-2 w-full rounded-lg shadow-sm transition-colors duration-200
                      ${editing 
                        ? 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-400' 
                        : 'border border-transparent bg-gray-50 text-gray-700'
                      }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Culture & Benefits */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Culture & Benefits</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                <input
                  type="text"
                  name="benefits"
                  value={company.benefits?.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'benefits')}
                  disabled={!editing}
                  placeholder="Health insurance, 401k, Remote work..."
                  className={`w-full px-4 py-2 rounded-lg shadow-sm transition-colors duration-200
                    ${editing 
                      ? 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-400' 
                      : 'border border-transparent bg-gray-50 text-gray-700'
                    }`}
                />
                <p className="mt-1 text-sm text-gray-500">Separate multiple benefits with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Culture Values</label>
                <input
                  type="text"
                  name="culture_values"
                  value={company.culture_values?.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'culture_values')}
                  disabled={!editing}
                  placeholder="Innovation, Teamwork, Growth..."
                  className={`w-full px-4 py-2 rounded-lg shadow-sm transition-colors duration-200
                    ${editing 
                      ? 'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-400' 
                      : 'border border-transparent bg-gray-50 text-gray-700'
                    }`}
                />
                <p className="mt-1 text-sm text-gray-500">Separate multiple values with commas</p>
              </div>
            </div>
          </div>

          {editing && (
            <div className="sticky bottom-0 bg-white pt-6 pb-4 border-t mt-8">
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving Changes...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
