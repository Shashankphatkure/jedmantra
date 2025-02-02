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
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Company Details</h1>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="name"
                value={company.name || ''}
                onChange={handleChange}
                disabled={!editing}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  editing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Logo</label>
              <div className="mt-1 flex items-center space-x-4">
                {(logoPreview || company.logo_url) && (
                  <div className="relative w-24 h-24">
                    <Image
                      src={logoPreview || company.logo_url}
                      alt="Company logo"
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                )}
                {editing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                type="text"
                name="industry"
                value={company.industry}
                onChange={handleChange}
                disabled={!editing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={company.location}
                onChange={handleChange}
                disabled={!editing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={company.description}
                onChange={handleChange}
                disabled={!editing}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Size</label>
              <input
                type="text"
                name="company_size"
                value={company.company_size}
                onChange={handleChange}
                disabled={!editing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Founded Year</label>
              <input
                type="number"
                name="founded_year"
                value={company.founded_year || ''}
                onChange={handleChange}
                disabled={!editing}
                min="1800"
                max={new Date().getFullYear()}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Website URL</label>
              <input
                type="url"
                name="website_url"
                value={company.website_url}
                onChange={handleChange}
                disabled={!editing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin_url"
                value={company.linkedin_url}
                onChange={handleChange}
                disabled={!editing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Benefits (comma-separated)</label>
              <input
                type="text"
                name="benefits"
                value={company.benefits?.join(', ')}
                onChange={(e) => handleArrayChange(e, 'benefits')}
                disabled={!editing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Culture Values (comma-separated)</label>
              <input
                type="text"
                name="culture_values"
                value={company.culture_values?.join(', ')}
                onChange={(e) => handleArrayChange(e, 'culture_values')}
                disabled={!editing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {editing && (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
