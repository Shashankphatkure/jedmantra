'use client';
import { useEffect, useState, use } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';

export default function CourseLearn({ params }) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const courseId = use(params).id;
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseAndEnrollment = async () => {
      try {
        // Check authentication
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast.error('Please login to access this course');
          router.push('/login');
          return;
        }

        // Fetch course data
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();

        if (courseError) throw courseError;

        // Parse course sections if needed
        const parsedCourseSections = Array.isArray(courseData.course_sections) 
          ? courseData.course_sections 
          : JSON.parse(courseData.course_sections || '[]');

        courseData.course_sections = parsedCourseSections;

        // Fetch enrollment
        const { data: enrollmentData, error: enrollmentError } = await supabase
          .from('enrollments')
          .select('*')
          .eq('course_id', courseId)
          .eq('user_id', session.user.id)
          .single();

        if (enrollmentError && enrollmentError.code !== 'PGRST116') throw enrollmentError;

        if (!enrollmentData) {
          toast.error('You are not enrolled in this course');
          router.push(`/courses/${courseId}`);
          return;
        }

        setCourse(courseData);
        setEnrollment(enrollmentData);

        // Set current position from progress
        if (enrollmentData.progress && Object.keys(enrollmentData.progress).length > 0) {
          setCurrentSectionIndex(enrollmentData.progress.currentSection || 0);
          setCurrentItemIndex(enrollmentData.progress.currentItem || 0);
        }

      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load course content');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndEnrollment();
  }, [courseId, router, supabase]);

  const updateProgress = async (sectionIndex, itemIndex) => {
    try {
      const newProgress = {
        ...enrollment.progress,
        currentSection: sectionIndex,
        currentItem: itemIndex,
        lastAccessed: new Date().toISOString(),
        [`${sectionIndex}-${itemIndex}`]: true // Mark this item as completed
      };

      const { error } = await supabase
        .from('enrollments')
        .update({
          progress: newProgress,
          last_accessed: new Date().toISOString(),
        })
        .eq('id', enrollment.id);

      if (error) throw error;

      setEnrollment({ ...enrollment, progress: newProgress });
      setCurrentSectionIndex(sectionIndex);
      setCurrentItemIndex(itemIndex);

    } catch (error) {
      console.error('Failed to update progress:', error);
      toast.error('Failed to update progress');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!course || !enrollment) return <div>Course not found</div>;

  const courseSections = Array.isArray(course.course_sections) 
    ? course.course_sections 
    : [];

  const validSectionIndex = Math.max(
    0,
    Math.min(currentSectionIndex, courseSections.length - 1)
  );

  const currentSection = courseSections[validSectionIndex] || { 
    title: 'Section not available',
    items: [],
    duration: '0 hours',
    lectures: 0
  };

  const validItemIndex = Math.max(
    0,
    Math.min(currentItemIndex, (currentSection.items || []).length - 1)
  );

  const currentItem = currentSection.items?.[validItemIndex] || 'Content not available';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/courses" className="text-gray-500 hover:text-gray-700">
                <ArrowLeftIcon className="h-6 w-6" />
              </Link>
              <div className="ml-4">
                <h1 className="text-lg font-medium text-gray-900">{course.title}</h1>
                <p className="text-sm text-gray-500">{currentSection.title}</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Progress: {Math.round((validSectionIndex / Math.max(courseSections.length, 1)) * 100)}%
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2"
                  style={{
                    width: `${Math.round((validSectionIndex / Math.max(courseSections.length, 1)) * 100)}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                {currentItem}
              </h2>
              {/* Add your content display here */}
            </div>
          </div>

          {/* Course Navigation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Course Content
            </h3>
            <div className="space-y-6">
              {courseSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">
                      {section.title}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {section.duration} • {section.lectures} lectures
                    </span>
                  </div>
                  <div className="space-y-1">
                    {(section.items || []).map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={() => updateProgress(sectionIndex, itemIndex)}
                        className={`w-full flex items-center p-2 rounded-lg text-left
                          ${
                            validSectionIndex === sectionIndex &&
                            validItemIndex === itemIndex
                              ? 'bg-blue-50 text-blue-600'
                              : 'hover:bg-gray-50'
                          }`}
                      >
                        {enrollment.progress?.[`${sectionIndex}-${itemIndex}`] ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <PlayCircleIcon className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="ml-3 text-sm">{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
