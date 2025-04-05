'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import {
  CheckBadgeIcon,
  XMarkIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ClockIcon,
  ArrowPathIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function AdminVerifications() {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [filteredVerifications, setFilteredVerifications] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchVerifications();
  }, []);

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredVerifications(verifications);
    } else {
      setFilteredVerifications(verifications.filter(v => v.type === activeTab));
    }
  }, [activeTab, verifications]);

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      
      // Fetch instructor verifications
      const { data: instructorData, error: instructorError } = await supabase
        .from('instructor_verifications')
        .select(`
          *,
          user:user_id (
            email,
            id
          )
        `)
        .order('created_at', { ascending: false });
        
      if (instructorError && instructorError.code !== '42P01') {
        throw instructorError;
      }
      
      // Fetch recruiter verifications
      const { data: recruiterData, error: recruiterError } = await supabase
        .from('recruiter_verifications')
        .select(`
          *,
          user:user_id (
            email,
            id
          )
        `)
        .order('created_at', { ascending: false });
        
      if (recruiterError && recruiterError.code !== '42P01') {
        throw recruiterError;
      }
      
      // Combine and format the data
      const formattedInstructors = (instructorData || []).map(item => ({
        ...item,
        type: 'instructor',
        name: item.full_name,
        email: item.user?.email,
        details: {
          qualification: item.qualification,
          institution: item.institution,
          specialization: item.specialization,
          experience: item.years_of_experience
        }
      }));
      
      const formattedRecruiters = (recruiterData || []).map(item => ({
        ...item,
        type: 'recruiter',
        name: item.full_name,
        email: item.user?.email,
        details: {
          company: item.company_name,
          position: item.job_title,
          experience: item.years_of_experience,
          industry: item.industry
        }
      }));
      
      const combined = [...formattedInstructors, ...formattedRecruiters];
      setVerifications(combined);
      setFilteredVerifications(combined);
    } catch (error) {
      console.error('Error fetching verifications:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (verification) => {
    try {
      setLoading(true);
      
      // Update the verification status
      const tableName = verification.type === 'instructor' ? 'instructor_verifications' : 'recruiter_verifications';
      
      const { error: updateError } = await supabase
        .from(tableName)
        .update({
          status: 'approved',
          verified_at: new Date().toISOString(),
        })
        .eq('id', verification.id);
        
      if (updateError) throw updateError;
      
      // Update the user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          verification_status: 'verified',
          role: verification.type,
        })
        .eq('id', verification.user_id);
        
      if (profileError) {
        console.error('Error updating profile:', profileError);
      }
      
      // Update local state
      setVerifications(prev => 
        prev.map(v => v.id === verification.id && v.type === verification.type 
          ? { ...v, status: 'approved' } 
          : v
        )
      );
      
      toast.success(`${verification.type === 'instructor' ? 'Instructor' : 'Recruiter'} verification approved`);
    } catch (error) {
      console.error('Error approving verification:', error);
      toast.error('Failed to approve verification');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (verification) => {
    try {
      setLoading(true);
      
      // Update the verification status
      const tableName = verification.type === 'instructor' ? 'instructor_verifications' : 'recruiter_verifications';
      
      const { error: updateError } = await supabase
        .from(tableName)
        .update({
          status: 'rejected',
          verified_at: new Date().toISOString(),
        })
        .eq('id', verification.id);
        
      if (updateError) throw updateError;
      
      // Update the user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          verification_status: 'rejected',
        })
        .eq('id', verification.user_id);
        
      if (profileError) {
        console.error('Error updating profile:', profileError);
      }
      
      // Update local state
      setVerifications(prev => 
        prev.map(v => v.id === verification.id && v.type === verification.type 
          ? { ...v, status: 'rejected' } 
          : v
        )
      );
      
      toast.success(`${verification.type === 'instructor' ? 'Instructor' : 'Recruiter'} verification rejected`);
    } catch (error) {
      console.error('Error rejecting verification:', error);
      toast.error('Failed to reject verification');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Verification Requests</h1>
              <p className="mt-2 text-blue-100">
                Manage verification requests from instructors and recruiters
              </p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={fetchVerifications}
                className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'all'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <UserIcon className="inline-block h-5 w-5 mr-2 -mt-1" />
                All Requests
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'instructor'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <AcademicCapIcon className="inline-block h-5 w-5 mr-2 -mt-1" />
                Instructors
              </button>
              <button
                onClick={() => setActiveTab('recruiter')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'recruiter'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BriefcaseIcon className="inline-block h-5 w-5 mr-2 -mt-1" />
                Recruiters
              </button>
            </nav>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <XMarkIcon className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        ) : filteredVerifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No verification requests</h3>
            <p className="mt-1 text-sm text-gray-500">
              There are no verification requests at the moment.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVerifications.map((verification) => (
                    <tr key={`${verification.type}-${verification.id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{verification.name}</div>
                            <div className="text-sm text-gray-500">{verification.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          verification.type === 'instructor' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {verification.type === 'instructor' ? (
                            <AcademicCapIcon className="mr-1 h-4 w-4" />
                          ) : (
                            <BriefcaseIcon className="mr-1 h-4 w-4" />
                          )}
                          {verification.type === 'instructor' ? 'Instructor' : 'Recruiter'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {verification.type === 'instructor' ? (
                            <>
                              <div>{verification.details.qualification}</div>
                              <div className="text-gray-500">{verification.details.institution}</div>
                              <div className="text-gray-500">{verification.details.specialization}</div>
                            </>
                          ) : (
                            <>
                              <div>{verification.details.company}</div>
                              <div className="text-gray-500">{verification.details.position}</div>
                              <div className="text-gray-500">{verification.details.industry}</div>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          verification.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : verification.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {verification.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDate(verification.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        {verification.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleApprove(verification)}
                              className="text-green-600 hover:text-green-900 mr-3"
                              title="Approve"
                              disabled={loading}
                            >
                              <CheckBadgeIcon className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => handleReject(verification)}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                              disabled={loading}
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
