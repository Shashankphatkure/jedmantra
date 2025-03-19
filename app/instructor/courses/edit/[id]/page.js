"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";
import { use } from 'react';
import { createClient } from "../../../../utils/supabase";
import { getCourseById, updateCourse } from "../../../../utils/instructor";
import {
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  CurrencyDollarIcon,
  ClockIcon,
  AcademicCapIcon,
  TagIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export default function EditCourse({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const courseId = unwrappedParams.id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    original_price: "",
    video_hours: "",
    skill_level: "beginner",
    category: "",
    instructor_name: "",
    long_description: "",
  });

  // Fetch current user and course data on component mount
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const supabase = createClient();
      
      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        router.push('/login');
        return;
      }
      
      setUser(user);
      
      // Fetch course data
      const course = await getCourseById(courseId);
      
      if (!course) {
        setNotification({
          type: 'error',
          message: 'Course not found or you do not have permission to edit it'
        });
        return;
      }
      
      // Check if user is the course owner
      if (course.instructor_id && course.instructor_id !== user.id) {
        setNotification({
          type: 'error',
          message: 'You do not have permission to edit this course'
        });
        return;
      }
      
      // Set form data from course
      setFormData({
        title: course.title || "",
        description: course.description || "",
        price: course.price?.toString() || "",
        original_price: course.original_price?.toString() || "",
        video_hours: course.video_hours?.toString() || "",
        skill_level: course.skill_level || "beginner",
        category: course.category || "",
        instructor_name: course.instructor_name || "",
        long_description: course.long_description || course.description || "",
      });
      
      // Set media previews if they exist
      if (course.course_image) {
        setCurrentThumbnail(course.course_image);
        setThumbnailPreview(course.course_image);
      }
      
      if (course.preview_video_url) {
        setCurrentVideo(course.preview_video_url);
      }
      
      setIsLoading(false);
    }
    
    fetchData();
  }, [courseId, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fileType === 'thumbnail') {
      // Validate image file
      if (!file.type.startsWith('image/')) {
        setNotification({
          type: 'error',
          message: 'Please upload a valid image file (PNG, JPG)'
        });
        return;
      }
      
      // Size validation (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setNotification({
          type: 'error',
          message: 'Image size should be less than 10MB'
        });
        return;
      }

      setThumbnailFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (fileType === 'video') {
      // Validate video file
      if (!file.type.startsWith('video/')) {
        setNotification({
          type: 'error',
          message: 'Please upload a valid video file (MP4, WebM)'
        });
        return;
      }
      
      // Size validation (100MB max)
      if (file.size > 100 * 1024 * 1024) {
        setNotification({
          type: 'error',
          message: 'Video size should be less than 100MB'
        });
        return;
      }

      setVideoFile(file);
      // Clear current video reference since we're uploading a new one
      setCurrentVideo(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setNotification({
        type: 'error',
        message: 'You must be logged in to update a course'
      });
      return;
    }
    
    // Form validation
    if (!formData.title || !formData.description || !formData.price) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setIsSaving(true);
    setNotification(null);
    
    try {
      const supabase = createClient();
      
      // Upload thumbnail if a new one is provided
      let thumbnailUrl = currentThumbnail;
      if (thumbnailFile) {
        const fileExt = thumbnailFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `course_thumbnails/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('course_media')
          .upload(filePath, thumbnailFile);
          
        if (uploadError) {
          throw new Error('Error uploading thumbnail: ' + uploadError.message);
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('course_media')
          .getPublicUrl(filePath);
          
        thumbnailUrl = publicUrl;
      }
      
      // Upload video if a new one is provided
      let videoUrl = currentVideo;
      if (videoFile) {
        const fileExt = videoFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `course_videos/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('course_media')
          .upload(filePath, videoFile);
          
        if (uploadError) {
          throw new Error('Error uploading video: ' + uploadError.message);
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('course_media')
          .getPublicUrl(filePath);
          
        videoUrl = publicUrl;
      }
      
      // Prepare course data for update
      const courseData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : parseFloat(formData.price),
        video_hours: formData.video_hours ? parseFloat(formData.video_hours) : null,
        skill_level: formData.skill_level,
        category: formData.category,
        long_description: formData.long_description || formData.description,
        updated_at: new Date().toISOString(),
      };
      
      // Only update image and video URLs if they changed
      if (thumbnailUrl) {
        courseData.course_image = thumbnailUrl;
      }
      
      if (videoUrl) {
        courseData.preview_video_url = videoUrl;
      }
      
      // Update course in Supabase
      const updatedCourse = await updateCourse(courseId, courseData, user.id);
        
      if (!updatedCourse) {
        throw new Error('Error updating course. You may not have permission or there was a server error.');
      }
      
      // Success notification and redirect
      setNotification({
        type: 'success',
        message: 'Course updated successfully!'
      });
      
      setTimeout(() => {
        router.push('/instructor/courses');
      }, 1500);
      
    } catch (error) {
      console.error('Error updating course:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to update course'
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Notification component
  const Notification = ({ type, message }) => (
    <div className={`p-4 rounded-lg mb-6 flex items-center ${type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
      {type === 'success' ? (
        <CheckCircleIcon className="h-5 w-5 mr-2" />
      ) : (
        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
      )}
      <span>{message}</span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => router.push('/instructor/courses')}
              className="inline-flex items-center mr-4 text-white hover:text-white/80 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back to Courses
            </button>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Edit Course</h1>
          <p className="text-xl text-white/90">
            Update your course details and content
          </p>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
        {notification && (
          <Notification type={notification.type} message={notification.message} />
        )}
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <DocumentTextIcon className="h-6 w-6 mr-2 text-blue-600" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter course title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief course description (shown in listings)"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description
                  </label>
                  <textarea
                    name="long_description"
                    value={formData.long_description}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Detailed description of your course (shown on course page)"
                  />
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <VideoCameraIcon className="h-6 w-6 mr-2 text-blue-600" />
                Course Media
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Thumbnail
                  </label>
                  <div 
                    className={`relative flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors ${
                      thumbnailPreview ? 'border-green-500' : 'border-gray-300'
                    }`}
                  >
                    {thumbnailPreview ? (
                      <div className="w-full">
                        <img 
                          src={thumbnailPreview} 
                          alt="Thumbnail preview" 
                          className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setThumbnailFile(null);
                            // If we're removing a new upload, go back to the original
                            // If there's no original, clear everything
                            if (thumbnailFile && currentThumbnail) {
                              setThumbnailPreview(currentThumbnail);
                            } else {
                              setThumbnailPreview(null);
                              setCurrentThumbnail(null);
                            }
                          }}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          {thumbnailFile ? 'Cancel upload' : 'Remove image'}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="text-sm text-gray-600">
                          <label htmlFor="thumbnail" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                            <span>Upload a file</span>
                            <input 
                              id="thumbnail" 
                              name="thumbnail" 
                              type="file" 
                              className="sr-only" 
                              onChange={(e) => handleFileChange(e, 'thumbnail')}
                              accept="image/*"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Introduction Video
                  </label>
                  <div className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors ${
                    videoFile || currentVideo ? 'border-green-500' : 'border-gray-300'
                  }`}>
                    <div className="space-y-2 text-center">
                      <VideoCameraIcon className={`mx-auto h-12 w-12 ${videoFile || currentVideo ? 'text-green-500' : 'text-gray-400'}`} />
                      <div className="text-sm text-gray-600">
                        {videoFile ? (
                          <div>
                            <p className="text-green-600">{videoFile.name}</p>
                            <button
                              type="button"
                              onClick={() => {
                                setVideoFile(null);
                                // If there was a previous video, restore it
                                if (currentVideo) {
                                  setCurrentVideo(currentVideo);
                                }
                              }}
                              className="text-sm text-red-600 hover:text-red-800 mt-2"
                            >
                              Cancel upload
                            </button>
                          </div>
                        ) : currentVideo ? (
                          <div>
                            <p className="text-green-600">Current video</p>
                            <button
                              type="button"
                              onClick={() => setCurrentVideo(null)}
                              className="text-sm text-red-600 hover:text-red-800 mt-2"
                            >
                              Remove video
                            </button>
                          </div>
                        ) : (
                          <label htmlFor="video" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                            <span>Upload a video</span>
                            <input 
                              id="video" 
                              name="video" 
                              type="file" 
                              className="sr-only" 
                              onChange={(e) => handleFileChange(e, 'video')}
                              accept="video/*"
                            />
                          </label>
                        )}
                      </div>
                      {!videoFile && !currentVideo && <p className="text-xs text-gray-500">MP4, WebM up to 100MB</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <AcademicCapIcon className="h-6 w-6 mr-2 text-blue-600" />
                Course Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="29.99"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price ($) <span className="text-gray-400 text-xs">(For discounts)</span>
                  </label>
                  <div className="relative">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      name="original_price"
                      value={formData.original_price}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="49.99"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (hours)
                  </label>
                  <div className="relative">
                    <ClockIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      name="video_hours"
                      value={formData.video_hours}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <select
                    name="skill_level"
                    value={formData.skill_level}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all-levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <TagIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Web Development"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/instructor/courses')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 