"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { createClient } from "../../../utils/supabase";
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
} from "@heroicons/react/24/outline";

export default function CreateCourse() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  
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

  // Fetch current user on component mount
  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push('/login');
        return;
      }
      
      setUser(user);
      
      // Get user profile to set instructor name
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('name, id')
        .eq('id', user.id)
        .single();
      
      if (!userError && userData) {
        setFormData(prev => ({
          ...prev,
          instructor_name: userData.name,
          instructor_id: user.id
        }));
      }
    }
    
    getUser();
  }, [router]);

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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setNotification({
        type: 'error',
        message: 'You must be logged in to create a course'
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

    setIsLoading(true);
    setNotification(null);
    
    try {
      const supabase = createClient();
      
      // Upload thumbnail if provided
      let thumbnailUrl = null;
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
      
      // Upload video if provided
      let videoUrl = null;
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
      
      // Prepare course data
      const courseData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : parseFloat(formData.price),
        video_hours: formData.video_hours ? parseFloat(formData.video_hours) : null,
        skill_level: formData.skill_level,
        course_image: thumbnailUrl,
        preview_video_url: videoUrl,
        long_description: formData.long_description || formData.description,
        instructor_name: formData.instructor_name,
        instructor_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        total_students: 0,
        rating: 0,
        review_count: 0
      };
      
      // Insert course into Supabase
      const { data, error } = await supabase
        .from('courses')
        .insert([courseData])
        .select();
        
      if (error) {
        throw new Error('Error creating course: ' + error.message);
      }
      
      // Success notification and redirect
      setNotification({
        type: 'success',
        message: 'Course created successfully!'
      });
      
      setTimeout(() => {
        router.push('/instructor/courses');
      }, 1500);
      
    } catch (error) {
      console.error('Error creating course:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to create course'
      });
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          
          <h1 className="text-4xl font-bold text-white mb-4">Create New Course</h1>
          <p className="text-xl text-white/90">
            Share your knowledge and expertise with the world
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
                            setThumbnailPreview(null);
                          }}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove image
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
                    videoFile ? 'border-green-500' : 'border-gray-300'
                  }`}>
                    <div className="space-y-2 text-center">
                      <VideoCameraIcon className={`mx-auto h-12 w-12 ${videoFile ? 'text-green-500' : 'text-gray-400'}`} />
                      <div className="text-sm text-gray-600">
                        {videoFile ? (
                          <div>
                            <p className="text-green-600">{videoFile.name}</p>
                            <button
                              type="button"
                              onClick={() => setVideoFile(null)}
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
                      {!videoFile && <p className="text-xs text-gray-500">MP4, WebM up to 100MB</p>}
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
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Course'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
