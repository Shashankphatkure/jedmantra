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
  ClockIcon,
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
      {/* Enhanced Top Navigation */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Link 
                href="/courses" 
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-white">{course.title}</h1>
                <p className="text-sm text-white/80">{currentSection.title}</p>
              </div>
            </div>
            {/* Enhanced Progress Display */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-white/90 font-medium">
                {Math.round((validSectionIndex / Math.max(courseSections.length, 1)) * 100)}% Complete
              </div>
              <div className="w-32 bg-white/20 rounded-full h-3">
                <div
                  className="bg-white rounded-full h-3 transition-all duration-300"
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
      <div className="max-w-8xl mx-auto flex">
        {/* Enhanced Course Navigation - Now on the left */}
        <div className="w-80 flex-shrink-0 h-[calc(100vh-5rem)] overflow-y-auto border-r border-gray-200 bg-white">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Course Content
            </h3>
            <div className="space-y-6">
              {courseSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {section.title}
                    </h4>
                    <span className="text-xs text-gray-500 flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4" />
                      <span>{section.duration}</span>
                    </span>
                  </div>
                  <div className="space-y-1">
                    {(section.items || []).map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={() => updateProgress(sectionIndex, itemIndex)}
                        className={`w-full flex items-center p-3 rounded-lg text-left transition-all
                          ${
                            validSectionIndex === sectionIndex &&
                            validItemIndex === itemIndex
                              ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100'
                              : 'hover:bg-gray-50'
                          }`}
                      >
                        {enrollment.progress?.[`${sectionIndex}-${itemIndex}`] ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <PlayCircleIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                        <span className="ml-3 text-sm font-medium truncate">{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Content Area - Now takes remaining width */}
        <div className="flex-1 min-h-[calc(100vh-5rem)] p-8 bg-gray-50">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {currentItem}
            </h2>
            {/* Add your content display here */}
            <div className="prose max-w-none">
              {/* Your course content goes here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
