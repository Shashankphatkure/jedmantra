'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { 
  ShoppingCartIcon, 
  LockClosedIcon,
  CheckIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

// Create a helper function for logging errors
const logError = async (supabase, errorDetails) => {
  try {
    const { error: logError } = await supabase
      .from('error_logs')
      .insert([{
        error_message: errorDetails.message,
        error_code: errorDetails.code,
        error_details: errorDetails,
        timestamp: new Date().toISOString(),
        source: 'cart_enrollment'
      }]);

    if (logError) {
      console.error('Failed to log error:', logError);
    }
  } catch (e) {
    console.error('Error while logging error:', e);
  }
};

export default function Cart() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [courseInfo, setCourseInfo] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = {
          courseId: searchParams.get('courseId'),
          title: searchParams.get('title'),
          price: searchParams.get('price'),
          original_price: searchParams.get('original_price'),
          image: searchParams.get('image'),
          instructor: searchParams.get('instructor'),
        };
        setCourseInfo(info);

        // Fetch related courses
        const { data, error } = await supabase
          .from('courses')
          .select('id, title, instructor_name, price, original_price, course_image, rating, review_count, bestseller')
          .neq('id', info.courseId)
          .order('rating', { ascending: false })
          .limit(4);

        if (error) {
          throw error;
        }

        setRelatedCourses(data);
      } catch (error) {
        await logError(supabase, {
          message: 'Failed to fetch related courses',
          code: error.code,
          details: error
        });
        toast.error('Failed to load related courses');
      }
    };

    fetchData();
  }, [searchParams, supabase]);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        await logError(supabase, {
          message: 'Authentication error during checkout',
          code: authError.code,
          details: authError
        });
        throw authError;
      }

      if (!session) {
        toast.error('Please login to enroll in this course');
        router.push('/login');
        return;
      }

      // First, check if user is already enrolled
      const { data: existingEnrollment, error: checkError } = await supabase
        .from('enrollments')
        .select('id')
        .match({ 
          user_id: session.user.id, 
          course_id: courseInfo.courseId 
        })
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows returned
        await logError(supabase, {
          message: 'Error checking existing enrollment',
          code: checkError.code,
          details: checkError
        });
        throw checkError;
      }

      // Create enrollment
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .insert([
          {
            user_id: session.user.id,
            course_id: courseInfo.courseId,
            status: 'active',
            progress: {},
          }
        ])
        .select()
        .single();

      if (enrollmentError) {
        // Check if error is due to unique constraint
        if (enrollmentError.code === '23505') {
          toast.error('You are already enrolled in this course');
        } else {
          throw enrollmentError;
        }
        return;
      }

      // If successful, show success message and redirect to course
      toast.success('Successfully enrolled in the course!');
      router.push(`courses/learn/${courseInfo.courseId}`);

    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error('Failed to enroll in the course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!courseInfo) return <div>Loading...</div>;

  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-3">
            <ShoppingCartIcon className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <span>Shopping Cart</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Course Details Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-48 h-32">
                    <Image
                      src={courseInfo.image || '/placeholder.png'}
                      alt={courseInfo.title}
                      fill
                      className="object-cover rounded-lg"
                      priority
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h2 className="text-xl font-semibold hover:text-blue-600">
                      <Link href={`/courses/${courseInfo.courseId}`}>
                        {courseInfo.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600">By {courseInfo.instructor}</p>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Bestseller
                      </span>
                      <span className="text-sm text-gray-500">
                        Updated Recently
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">What you'll get</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <DevicePhoneMobileIcon className="h-5 w-5 text-green-500" />
                  <span>Access on mobile and TV</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AcademicCapIcon className="h-5 w-5 text-green-500" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <DocumentArrowDownIcon className="h-5 w-5 text-green-500" />
                  <span>Downloadable resources</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Original Price:</span>
                  <span className="line-through text-gray-500">
                    £{courseInfo.original_price}
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Price:</span>
                  <span>£{courseInfo.price}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>£{courseInfo.price}</span>
                </div>

                {/* Coupon Code Input */}
                <div className="mt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Apply
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 
                    transition duration-200 mt-4 flex items-center justify-center space-x-2
                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <LockClosedIcon className="h-5 w-5" />
                  <span>
                    {loading ? 'Processing...' : 'Checkout Securely'}
                  </span>
                </button>

                {/* Money-back guarantee */}
                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>30-Day Money-Back Guarantee</p>
                  <p className="mt-2">Full Lifetime Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Course Image */}
                <div className="relative h-36">
                  <Image
                    src={course.course_image || '/placeholder.png'}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Course Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600">
                    <Link href={`/courses/${course.id}`}>
                      {course.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{course.instructor_name}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 font-bold mr-1">{course.rating}</span>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.round(course.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">
                      ({course.review_count})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">£{course.price}</span>
                    {course.original_price && (
                      <span className="text-sm text-gray-500 line-through">
                        £{course.original_price}
                      </span>
                    )}
                  </div>

                  {/* Bestseller Badge */}
                  {course.bestseller && (
                    <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Bestseller
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}