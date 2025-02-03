'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { StarIcon, PlayIcon, HeartIcon, VideoCameraIcon, CodeBracketIcon, ArrowDownTrayIcon, LockClosedIcon, CheckBadgeIcon, ChevronDownIcon, ChevronRightIcon, PlayCircleIcon, SpeakerWaveIcon, PuzzlePieceIcon, AcademicCapIcon, BriefcaseIcon, BoltIcon, UserGroupIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import EnrollButton from '@/components/EnrollButton';
import WishlistButton from '@/components/WishlistButton';
import VideoPlayer from '@/components/VideoPlayer';
import CourseContent from '@/components/CourseContent';
import ReviewSystem from '@/components/ReviewSystem';

export default function CourseDetail({ params }) {
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();
  const courseId = use(params).id;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchCourse() {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error) {
        console.error('Supabase Error Details:', error);
        setError(error.message);
        return;
      }

      setCourse(data);
    }

    async function fetchReviews() {
      const { data, error } = await supabase
        .from('course_reviews')
        .select(`
          *,
          users:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('course_id', courseId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        return;
      }

      setReviews(data || []);
    }

    fetchCourse();
    fetchReviews();
  }, [courseId]);

  if (!course) return <div>Loading...</div>;
  if (error) return <div>Error loading course: {error}</div>;

  const parseJsonField = (field, defaultValue = []) => {
    try {
      console.log('Parsing field:', {
        type: typeof field,
        value: field,
        defaultValue: defaultValue
      });

      if (field == null) {
        console.log('Field is null or undefined, returning default:', defaultValue);
        return defaultValue;
      }

      if (typeof field === 'object') {
        console.log('Field is already an object, returning:', field);
        return field;
      }

      const parsed = JSON.parse(field);
      console.log('Successfully parsed JSON:', parsed);
      return parsed;
    } catch (e) {
      console.error('Error parsing JSON field:', {
        field: field,
        error: e.message,
        stack: e.stack
      });
      return defaultValue;
    }
  };

  const defaultTargetAudience = [
    {
      title: "Beginners",
      description: "No prior experience needed"
    }
  ];

  const defaultFeatures = [
    { text: "Full course content" },
    { text: "Lifetime access" }
  ];

  const defaultLearningOutcomes = [
    "Learn the basics",
    "Build real projects"
  ];

  const defaultCourseSections = [
    {
      title: "Getting Started",
      lectures: 1,
      duration: "1 hour",
      items: ["Introduction"]
    }
  ];

  const defaultRequirements = [
    "Basic computer knowledge"
  ];

  const targetAudience = parseJsonField(course.target_audience, defaultTargetAudience);
  const features = parseJsonField(course.features, defaultFeatures);
  const learningOutcomes = parseJsonField(course.learning_outcomes, defaultLearningOutcomes);
  const courseSections = parseJsonField(course.course_sections, defaultCourseSections);
  const requirements = parseJsonField(course.requirements, defaultRequirements);
  const subtitlesLanguages = parseJsonField(course.subtitles_languages, ["English"]);
  const prerequisites = parseJsonField(course.prerequisites, ["None"]);
  const resources = parseJsonField(course.resources, []);

  console.log('Parsed course data:', {
    targetAudience,
    features,
    learningOutcomes,
    courseSections,
    requirements,
    reviews
  });

  const discountPercentage = course.discount_percentage || 
    (course.original_price ? 
      Math.round(((course.original_price - course.price) / course.original_price) * 100) 
      : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                {course.bestseller && (
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    Bestseller
                  </span>
                )}
                {course.new_course && (
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    New & Updated
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {course.description}
              </p>

              <div className="flex items-center space-x-4 text-white/90 mb-6">
                <div className="flex items-center">
                  <StarIconSolid className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1">{course.rating} ({course.review_count} reviews)</span>
                </div>
                <span>•</span>
                <span>{course.total_students?.toLocaleString()} students enrolled</span>
                
              </div>

              <div className="mt-8 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">About This Course</h3>
                <div className="space-y-4 text-white/90">
                  <p>{course.long_description}</p>
                  
                  <p>Through hands-on projects and real-world examples, you'll build a strong foundation in modern web development. Perfect for:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {targetAudience.map((audience) => (
                      <div key={audience.title} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg className="h-6 w-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">{audience.title}</span>
                        </div>
                        <p className="text-sm">{audience.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl shadow-2xl">
                <div className="relative aspect-video mb-6 rounded-xl overflow-hidden">
                  {course.preview_video_url ? (
                    <VideoPlayer
                      videoUrl={course.preview_video_url}
                      posterImage={course.course_image}
                      isPreview={true}
                    />
                  ) : (
                    <Image
                      src={course.course_image || "https://picsum.photos/seed/default-course/800/450"}
                      alt={course.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    />
                  )}
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-4xl font-bold text-gray-900">£{course.price}</p>
                    {course.original_price && (
                      <div className="flex flex-col items-start">
                        <span className="line-through text-gray-400 text-lg">£{course.original_price}</span>
                        <span className="text-emerald-600 font-medium">{discountPercentage}% off</span>
                      </div>
                    )}
                  </div>
                  {course.money_back_guarantee && (
                    <p className="mt-2 text-gray-600 text-sm">
                      {course.money_back_guarantee}-day money-back guarantee
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <button 
                    onClick={() => {
                      router.push(`/cart?courseId=${courseId}&title=${encodeURIComponent(course.title)}&price=${course.price}&original_price=${course.original_price}&image=${encodeURIComponent(course.course_image)}&instructor=${encodeURIComponent(course.instructor_name)}`);
                    }}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Enroll Now - £{course.price}
                  </button>
                  <WishlistButton courseId={courseId} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    This course includes:
                  </h3>
                  <ul className="space-y-4">
                    
                    <li className="flex items-center gap-3 text-gray-600">
                      <AcademicCapIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <LockClosedIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      <span>Full lifetime access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Course Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start">
                    <CheckBadgeIcon className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Course Content
              </h2>
              <CourseContent
                courseSections={courseSections}
                courseId={courseId}
                isEnrolled={false}
              />
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Requirements
              </h2>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Student Reviews
              </h2>
              <ReviewSystem
                courseId={courseId}
                reviews={reviews}
                onReviewAdded={(newReview) => {
                  setReviews(prevReviews => [newReview, ...prevReviews]);
                }}
                isEnrolled={false}
              />
            </div>
          </div>

          {/* Instructor Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Your Instructor
              </h2>
              <div className="flex items-center mb-4">
                <Image
                  src={course.instructor_image || "https://picsum.photos/seed/instructor-large/64/64"}
                  alt={course.instructor_name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {course.instructor_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {course.instructor_title}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">
                    {course.instructor_total_students?.toLocaleString()} students
                  </span>
                </div>
                <div className="flex items-center">
                  <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{course.instructor_course_count} courses</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">
                    {course.instructor_rating} instructor rating
                  </span>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{course.instructor_bio}</p>
            </div>
          </div>
        </div>
      </div>

      

      {/* Add Last Updated Info */}
      {course.last_updated && (
        <div className="mt-4 text-sm text-gray-600">
          <ClockIcon className="h-5 w-5 text-gray-400 mr-2 inline" />
          Last updated: {new Date(course.last_updated).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
