'use client';

import { useRouter } from 'next/navigation';
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function VerificationSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Verification Submitted</h2>
            <p className="mt-2 text-sm text-gray-600">
              Your verification request has been submitted successfully. Our team will review your application and get back to you within 2-3 business days.
            </p>
          </div>

          <div className="mt-8 bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-900">What happens next?</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-2">
                  1
                </span>
                <span>Our team will review your application to verify your credentials.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-2">
                  2
                </span>
                <span>You will receive an email notification once your verification is complete.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-2">
                  3
                </span>
                <span>Once verified, you will gain access to all the features and tools on our platform.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push('/')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
