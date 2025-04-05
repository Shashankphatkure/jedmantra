'use client';

import Link from 'next/link';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function VerificationIndex() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Account Verification</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Verify your account to unlock full access to our platform features
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Recruiter Verification Card */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="h-2 bg-blue-500"></div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-full p-3">
                  <BriefcaseIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="ml-4 text-2xl font-bold text-gray-900">Recruiter Verification</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Verify your account as a recruiter to post jobs, search for candidates, and access premium recruiting tools.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                  <p className="text-sm text-gray-600">Post unlimited job listings</p>
                </div>
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                  <p className="text-sm text-gray-600">Access candidate database</p>
                </div>
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                  <p className="text-sm text-gray-600">Receive verified recruiter badge</p>
                </div>
              </div>
              <Link
                href="/verification/recruiter"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Get Verified as Recruiter
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Instructor Verification Card */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="h-2 bg-purple-500"></div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 rounded-full p-3">
                  <AcademicCapIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="ml-4 text-2xl font-bold text-gray-900">Instructor Verification</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Verify your account as an instructor to create and publish courses, interact with students, and earn from your expertise.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-5 w-5 text-purple-500 mt-0.5 mr-2" />
                  <p className="text-sm text-gray-600">Create and publish courses</p>
                </div>
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-5 w-5 text-purple-500 mt-0.5 mr-2" />
                  <p className="text-sm text-gray-600">Access instructor dashboard</p>
                </div>
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-5 w-5 text-purple-500 mt-0.5 mr-2" />
                  <p className="text-sm text-gray-600">Receive verified instructor badge</p>
                </div>
              </div>
              <Link
                href="/verification/instructor"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Get Verified as Instructor
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <dl className="divide-y divide-gray-200">
              <div className="px-4 py-6 sm:px-6">
                <dt className="text-lg font-medium text-gray-900">How long does verification take?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Our team typically reviews verification requests within 2-3 business days. You will receive an email notification once your verification is complete.
                </dd>
              </div>
              <div className="px-4 py-6 sm:px-6">
                <dt className="text-lg font-medium text-gray-900">What documents do I need for verification?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  For now, we only require you to fill out the verification form with accurate information. Our team may contact you for additional documentation if needed.
                </dd>
              </div>
              <div className="px-4 py-6 sm:px-6">
                <dt className="text-lg font-medium text-gray-900">Can I use the platform while my verification is pending?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, you can still use the platform with limited features while your verification is pending. Once verified, you will gain access to all features.
                </dd>
              </div>
              <div className="px-4 py-6 sm:px-6">
                <dt className="text-lg font-medium text-gray-900">What if my verification is rejected?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  If your verification is rejected, you will receive an email explaining the reason. You can address the issues and resubmit your verification request.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
