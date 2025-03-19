import { createClient } from './supabase';

export async function getInstructorProfile(userId) {
  const supabase = createClient();
  
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (userError) {
    console.error('Error fetching instructor profile:', userError);
    return null;
  }
  
  return user;
}

export async function getInstructorCourses(userId) {
  const supabase = createClient();
  
  // Query by instructor_id (primary method)
  const { data: coursesById, error: errorById } = await supabase
    .from('courses')
    .select('*')
    .eq('instructor_id', userId);
  
  // If we found courses by instructor_id, return them
  if (!errorById && coursesById && coursesById.length > 0) {
    return coursesById;
  }
  
  // Fall back to the old method querying by instructor_name for backward compatibility
  // This will be used during transition period until all courses have instructor_id
  const { data: coursesByName, error: errorByName } = await supabase
    .from('courses')
    .select('*')
    .eq('instructor_name', userId);
  
  if (errorByName) {
    console.error('Error fetching instructor courses:', errorByName);
    return [];
  }
  
  return coursesByName || [];
}

export async function getCourseById(courseId) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();
  
  if (error) {
    console.error('Error fetching course:', error);
    return null;
  }
  
  return data;
}

export async function getCourseReviews(courseId) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('course_reviews')
    .select('*')
    .eq('course_id', courseId);
  
  if (error) {
    console.error('Error fetching course reviews:', error);
    return [];
  }
  
  return data || [];
}

export async function getStudentsForCourse(courseId) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      users:user_id (*)
    `)
    .eq('course_id', courseId);
  
  if (error) {
    console.error('Error fetching course students:', error);
    return [];
  }
  
  return data || [];
}

export async function createCourse(courseData) {
  const supabase = createClient();
  
  // Make sure we have an instructor_id before creating the course
  if (!courseData.instructor_id) {
    // Try to get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('User not authenticated:', userError);
      return null;
    }
    
    // Set the instructor_id to the current user
    courseData.instructor_id = user.id;
  }
  
  const { data, error } = await supabase
    .from('courses')
    .insert([courseData])
    .select();
  
  if (error) {
    console.error('Error creating course:', error);
    return null;
  }
  
  return data[0];
}

export async function updateCourse(courseId, courseData, userId) {
  const supabase = createClient();
  
  // If userId is provided, verify ownership first
  if (userId) {
    // Check if the course belongs to this instructor
    const { data: course, error: fetchError } = await supabase
      .from('courses')
      .select('instructor_id, instructor_name')
      .eq('id', courseId)
      .single();
      
    if (fetchError) {
      console.error('Error fetching course for update:', fetchError);
      return null;
    }
    
    // Verify ownership (check both instructor_id and instructor_name for backward compatibility)
    if (course.instructor_id !== userId && course.instructor_name !== userId) {
      console.error('Not authorized to update this course');
      return null;
    }
  }
  
  // Do not allow changing the instructor_id during update if it's already set
  if (courseData.instructor_id && userId && courseData.instructor_id !== userId) {
    delete courseData.instructor_id;
  }
  
  // Update the course
  const { data, error } = await supabase
    .from('courses')
    .update(courseData)
    .eq('id', courseId)
    .select();
  
  if (error) {
    console.error('Error updating course:', error);
    return null;
  }
  
  return data[0];
}

export async function deleteCourse(courseId, userId) {
  const supabase = createClient();
  
  // First check if the course belongs to this instructor
  const { data: course, error: fetchError } = await supabase
    .from('courses')
    .select('instructor_id, instructor_name')
    .eq('id', courseId)
    .single();
    
  if (fetchError) {
    console.error('Error fetching course for deletion:', fetchError);
    return false;
  }
  
  // Verify ownership (check both instructor_id and instructor_name for backward compatibility)
  if (course.instructor_id !== userId && course.instructor_name !== userId) {
    console.error('Not authorized to delete this course');
    return false;
  }
  
  // First, try to delete related storage files (thumbnails and videos)
  if (course.course_image) {
    try {
      const imageUrl = new URL(course.course_image);
      const imagePath = imageUrl.pathname.split('/').slice(-2).join('/');
      if (imagePath) {
        await supabase.storage
          .from('course_media')
          .remove([imagePath]);
      }
    } catch (error) {
      console.warn('Error deleting course thumbnail:', error);
      // Continue with course deletion even if image deletion fails
    }
  }
  
  if (course.preview_video_url) {
    try {
      const videoUrl = new URL(course.preview_video_url);
      const videoPath = videoUrl.pathname.split('/').slice(-2).join('/');
      if (videoPath) {
        await supabase.storage
          .from('course_media')
          .remove([videoPath]);
      }
    } catch (error) {
      console.warn('Error deleting course video:', error);
      // Continue with course deletion even if video deletion fails
    }
  }
  
  // Now delete the course
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', courseId);
  
  if (error) {
    console.error('Error deleting course:', error);
    return false;
  }
  
  return true;
}

export async function getCourseAnalytics(courseId) {
  const supabase = createClient();
  
  // Get enrollments count
  const { data: enrollments, error: enrollmentsError } = await supabase
    .from('enrollments')
    .select('count', { count: 'exact' })
    .eq('course_id', courseId);
    
  // Get average rating
  const { data: reviews, error: reviewsError } = await supabase
    .from('course_reviews')
    .select('rating')
    .eq('course_id', courseId);
    
  if (enrollmentsError || reviewsError) {
    console.error('Error fetching course analytics:', enrollmentsError || reviewsError);
    return null;
  }
  
  // Calculate average rating
  const avgRating = reviews && reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length 
    : 0;
    
  return {
    enrollmentCount: enrollments?.length || 0,
    reviewCount: reviews?.length || 0,
    averageRating: avgRating
  };
}

export async function getAllReviews(userId) {
  const supabase = createClient();
  
  // Try to get courses by instructor_id first
  const { data: coursesByIdResult, error: coursesIdError } = await supabase
    .from('courses')
    .select('id')
    .eq('instructor_id', userId);
    
  // If we found courses by instructor_id, use them
  if (!coursesIdError && coursesByIdResult && coursesByIdResult.length > 0) {
    const courseIds = coursesByIdResult.map(course => course.id);
    const { data: reviews, error: reviewsError } = await supabase
      .from('course_reviews')
      .select('*, courses(*)')
      .in('course_id', courseIds);
      
    if (reviewsError) {
      console.error('Error fetching course reviews:', reviewsError);
      return [];
    }
    
    return reviews || [];
  }
  
  // Fall back to instructor_name for backward compatibility
  const { data: coursesByNameResult, error: coursesNameError } = await supabase
    .from('courses')
    .select('id')
    .eq('instructor_name', userId);
    
  if (coursesNameError || !coursesByNameResult.length) {
    console.error('Error fetching instructor courses:', coursesNameError);
    return [];
  }
  
  // Get reviews for all courses
  const courseIds = coursesByNameResult.map(course => course.id);
  const { data: reviews, error: reviewsError } = await supabase
    .from('course_reviews')
    .select('*, courses(*)')
    .in('course_id', courseIds);
    
  if (reviewsError) {
    console.error('Error fetching course reviews:', reviewsError);
    return [];
  }
  
  return reviews || [];
} 