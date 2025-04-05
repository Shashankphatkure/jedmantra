'use client';

import { useState, useEffect, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
  AcademicCapIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CourseCertificate({ params }) {
  const courseId = params.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [completionDate, setCompletionDate] = useState(null);
  const certificateRef = useRef(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchCertificateData();
  }, [courseId]);

  const fetchCertificateData = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      
      if (!currentUser) {
        toast.error('You must be logged in to view this page');
        router.push('/login');
        return;
      }
      
      setUser(currentUser);
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();
        
      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setUser({
          ...currentUser,
          ...profileData
        });
      }
      
      // Fetch course data
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
        
      if (courseError) throw courseError;
      setCourse(courseData);
      
      // Check if user has completed the course
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('course_id', courseId)
        .single();
        
      if (enrollmentError) {
        toast.error('You are not enrolled in this course');
        router.push(`/courses/${courseId}`);
        return;
      }
      
      if (!enrollment.completed) {
        toast.error('You must complete the course to receive a certificate');
        router.push(`/courses/${courseId}`);
        return;
      }
      
      setCompletionDate(new Date(enrollment.completed_at));
      
      // Check if certificates table exists
      const { error: tableError } = await supabase
        .from('certificates')
        .select('id')
        .limit(1);
        
      if (tableError && tableError.code === '42P01') {
        // Table doesn't exist, create it
        await createCertificatesTable();
      }
      
      // Check if certificate already exists
      const { data: existingCertificate, error: certificateError } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('course_id', courseId)
        .single();
        
      if (certificateError) {
        if (certificateError.code === 'PGRST116') {
          // No certificate found, create one
          const certificateData = {
            user_id: currentUser.id,
            course_id: courseId,
            issue_date: new Date().toISOString(),
            certificate_id: generateCertificateId(),
            status: 'active'
          };
          
          const { data: newCertificate, error: createError } = await supabase
            .from('certificates')
            .insert(certificateData)
            .select()
            .single();
            
          if (createError) throw createError;
          setCertificate(newCertificate);
        } else {
          throw certificateError;
        }
      } else {
        setCertificate(existingCertificate);
      }
    } catch (error) {
      console.error('Error fetching certificate data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createCertificatesTable = async () => {
    try {
      // Create the certificates table using SQL
      const { error } = await supabase.rpc('create_certificates_table');
      
      if (error) {
        // If RPC doesn't exist, create the table using a different approach
        // This is a simplified approach - in a real app, you'd use migrations
        await supabase.auth.getSession();
        
        // For demo purposes, we'll just show a toast
        toast.error('Could not create certificates table. Please contact support.');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error creating certificates table:', error);
      return false;
    }
  };

  const generateCertificateId = () => {
    // Generate a unique certificate ID
    const timestamp = new Date().getTime().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CERT-${timestamp}-${randomStr}`;
  };

  const formatDate = (date) => {
    if (!date) return '';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const downloadAsPDF = async () => {
    try {
      if (!certificateRef.current) return;
      
      toast.loading('Generating PDF...');
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${course.title.replace(/\s+/g, '_')}_Certificate.pdf`);
      
      toast.dismiss();
      toast.success('Certificate downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.dismiss();
      toast.error('Failed to download certificate');
    }
  };

  const printCertificate = () => {
    window.print();
  };

  const shareCertificate = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${course.title} Certificate`,
          text: `I've completed the ${course.title} course and earned this certificate!`,
          url: window.location.href
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(window.location.href);
        toast.success('Certificate link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing certificate:', error);
      toast.error('Failed to share certificate');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">
            <DocumentTextIcon className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="mt-4 text-xl font-bold text-gray-900">Error Loading Certificate</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => router.push(`/courses/${courseId}`)}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!certificate || !course || !user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto" />
            <h2 className="mt-4 text-xl font-bold text-gray-900">Certificate Not Available</h2>
            <p className="mt-2 text-gray-600">You need to complete the course to receive a certificate.</p>
            <button
              onClick={() => router.push(`/courses/${courseId}`)}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Course Certificate</h1>
          <div className="flex space-x-4">
            <button
              onClick={downloadAsPDF}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Download PDF
            </button>
            <button
              onClick={printCertificate}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PrinterIcon className="h-5 w-5 mr-2" />
              Print
            </button>
            <button
              onClick={shareCertificate}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-8">
          {/* Certificate */}
          <div
            ref={certificateRef}
            className="relative border-8 border-blue-100 p-8 mx-auto max-w-4xl"
            style={{ aspectRatio: '1.414', backgroundColor: '#FFFFFF' }}
          >
            {/* Certificate Border */}
            <div className="absolute inset-0 border-4 border-blue-800 m-4"></div>
            
            {/* Certificate Content */}
            <div className="relative h-full flex flex-col items-center justify-between text-center p-8">
              {/* Header */}
              <div>
                <div className="flex justify-center mb-4">
                  <AcademicCapIcon className="h-16 w-16 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">JedMantra Learning</h2>
                <p className="text-gray-600 mb-6">Certificate of Completion</p>
                <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
              </div>
              
              {/* Body */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-gray-600 mb-4">This is to certify that</p>
                <h3 className="text-3xl font-bold text-blue-800 mb-4 font-serif">
                  {user.full_name || user.email}
                </h3>
                <p className="text-gray-600 mb-6">has successfully completed the course</p>
                <h4 className="text-2xl font-bold text-gray-900 mb-8 max-w-lg">
                  {course.title}
                </h4>
                <p className="text-gray-600">
                  Completed on {formatDate(completionDate)}
                </p>
              </div>
              
              {/* Footer */}
              <div className="w-full">
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <div className="w-40 h-px bg-gray-400 mb-2"></div>
                    <p className="text-sm font-medium text-gray-900">Course Instructor</p>
                    <p className="text-xs text-gray-600">{course.instructor || 'JedMantra Instructor'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">Certificate ID</p>
                    <p className="text-xs font-mono text-gray-600">{certificate.certificate_id}</p>
                  </div>
                  <div className="text-right">
                    <div className="w-40 h-px bg-gray-400 mb-2"></div>
                    <p className="text-sm font-medium text-gray-900">Platform Director</p>
                    <p className="text-xs text-gray-600">JedMantra Education</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Certificate Details</h3>
          </div>
          <div className="px-6 py-5">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Certificate ID</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">{certificate.certificate_id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(new Date(certificate.issue_date))}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Course</dt>
                <dd className="mt-1 text-sm text-gray-900">{course.title}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Recipient</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.full_name || user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Completion Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(completionDate)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Valid
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
