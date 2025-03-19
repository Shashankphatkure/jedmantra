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
  BookOpenIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
  BellIcon,
  PresentationChartBarIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ViewfinderCircleIcon
} from "@heroicons/react/24/outline";

// Define the available tabs
const TABS = [
  { id: 'basics', name: 'Course Info', icon: DocumentTextIcon },
  { id: 'curriculum', name: 'Curriculum', icon: BookOpenIcon },
  { id: 'requirements', name: 'Requirements', icon: PuzzlePieceIcon },
  { id: 'pricing', name: 'Pricing', icon: CurrencyDollarIcon },
  { id: 'students', name: 'Students', icon: UserGroupIcon },
  { id: 'promotions', name: 'Promotions', icon: BellIcon },
];

export default function EditCourse({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const courseId = unwrappedParams.id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [currentTab, setCurrentTab] = useState('basics');
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
    // Required fields based on database schema
    instructor_id: "",
    // Arrays and objects
    curriculum: [],
    requirements: [],
    what_you_will_learn: [],
    who_is_this_for: [],
    target_audience: [],
    features: [],
    learning_outcomes: [],
    course_sections: [],
    prerequisites: [],
    resources: [],
    // Additional fields
    language: "English",
    access_type: "lifetime",
    certificate_included: true,
    money_back_guarantee: 30,
    lecture_count: 0,
    discount_percentage: null,
    subtitles_languages: [],
  });

  // State for curriculum editing
  const [editingSection, setEditingSection] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newLessonData, setNewLessonData] = useState({
    title: '',
    type: 'video',
    content: '',
    duration: 0,
    videoUrl: '',
    textContent: '',
    quizQuestions: [],
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
        curriculum: course.curriculum || [],
        instructor_id: course.instructor_id || "",
        language: course.language || "English",
        access_type: course.access_type || "lifetime",
        certificate_included: course.certificate_included ?? true,
        money_back_guarantee: course.money_back_guarantee || 30,
        lecture_count: course.lecture_count || 0,
        discount_percentage: course.discount_percentage || null,
        subtitles_languages: course.subtitles_languages || [],
        // Load JSONB fields
        requirements: course.requirements || [],
        target_audience: course.target_audience || [],
        features: course.features || [],
        learning_outcomes: course.learning_outcomes || [],
        course_sections: course.course_sections || [],
        prerequisites: course.prerequisites || [],
        resources: course.resources || [],
        what_you_will_learn: course.learning_outcomes || [],
        who_is_this_for: course.target_audience?.map(a => a.title) || [],
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
        curriculum: formData.curriculum || [],
        instructor_id: formData.instructor_id,
        language: formData.language,
        access_type: formData.access_type,
        certificate_included: formData.certificate_included,
        money_back_guarantee: formData.money_back_guarantee,
        lecture_count: formData.lecture_count,
        discount_percentage: formData.discount_percentage,
        subtitles_languages: formData.subtitles_languages,
        // JSONB fields
        requirements: formData.requirements || [],
        target_audience: formData.target_audience || [],
        features: formData.features || [],
        learning_outcomes: formData.learning_outcomes || [],
        course_sections: formData.course_sections || [],
        prerequisites: formData.prerequisites || [],
        resources: formData.resources || [],
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

  // Curriculum management functions
  const addNewSection = () => {
    if (!newSectionTitle.trim()) {
      setNotification({
        type: 'error',
        message: 'Section title cannot be empty'
      });
      return;
    }

    const newSection = {
      id: uuidv4(),
      title: newSectionTitle,
      lessons: []
    };

    setFormData(prev => ({
      ...prev,
      curriculum: [...prev.curriculum, newSection]
    }));

    setNewSectionTitle('');
    setNotification({
      type: 'success',
      message: 'Section added successfully'
    });
  };

  const addLessonToSection = (sectionId) => {
    if (!newLessonData.title.trim()) {
      setNotification({
        type: 'error',
        message: 'Lesson title cannot be empty'
      });
      return;
    }

    // Prepare the content based on lesson type
    let finalContent = newLessonData.content;
    if (newLessonData.type === 'video' && newLessonData.videoUrl) {
      finalContent = newLessonData.videoUrl;
    } else if (newLessonData.type === 'text' && newLessonData.textContent) {
      finalContent = newLessonData.textContent;
    }

    const newLesson = {
      id: uuidv4(),
      title: newLessonData.title,
      type: newLessonData.type,
      content: finalContent,
      duration: parseFloat(newLessonData.duration) || 0,
      preview: false
    };

    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map(section => 
        section.id === sectionId 
          ? { ...section, lessons: [...section.lessons, newLesson] }
          : section
      )
    }));

    setNewLessonData({
      title: '',
      type: 'video',
      content: '',
      duration: 0,
      videoUrl: '',
      textContent: '',
      quizQuestions: [],
    });
    
    setEditingSection(null);
    setNotification({
      type: 'success',
      message: 'Lesson added successfully'
    });
  };

  const updateLesson = (sectionId, lessonId) => {
    if (!newLessonData.title.trim()) {
      setNotification({
        type: 'error',
        message: 'Lesson title cannot be empty'
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              lessons: section.lessons.map(lesson => 
                lesson.id === lessonId
                  ? { 
                      ...lesson, 
                      title: newLessonData.title,
                      type: newLessonData.type,
                      content: newLessonData.content,
                      duration: parseFloat(newLessonData.duration) || 0
                    }
                  : lesson
              )
            }
          : section
      )
    }));

    setEditingLesson(null);
    setEditingSection(null);
    setNewLessonData({
      title: '',
      type: 'video',
      content: '',
      duration: 0,
      videoUrl: '',
      textContent: '',
      quizQuestions: [],
    });
    
    setNotification({
      type: 'success',
      message: 'Lesson updated successfully'
    });
  };

  const deleteSection = (sectionId) => {
    if (window.confirm('Are you sure you want to delete this section and all its lessons?')) {
      setFormData(prev => ({
        ...prev,
        curriculum: prev.curriculum.filter(section => section.id !== sectionId)
      }));
      
      setNotification({
        type: 'success',
        message: 'Section deleted successfully'
      });
    }
  };

  const deleteLesson = (sectionId, lessonId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      setFormData(prev => ({
        ...prev,
        curriculum: prev.curriculum.map(section => 
          section.id === sectionId 
            ? { ...section, lessons: section.lessons.filter(lesson => lesson.id !== lessonId) }
            : section
        )
      }));
      
      setNotification({
        type: 'success',
        message: 'Lesson deleted successfully'
      });
    }
  };

  const toggleLessonPreview = (sectionId, lessonId) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              lessons: section.lessons.map(lesson => 
                lesson.id === lessonId
                  ? { ...lesson, preview: !lesson.preview }
                  : lesson
              )
            }
          : section
      )
    }));
  };

  const startEditingLesson = (sectionId, lesson) => {
    setEditingSection(sectionId);
    setEditingLesson(lesson.id);
    
    // Set appropriate content fields based on lesson type
    let videoUrl = '';
    let textContent = '';
    
    if (lesson.type === 'video') {
      videoUrl = lesson.content || '';
    } else if (lesson.type === 'text') {
      textContent = lesson.content || '';
    }
    
    setNewLessonData({
      title: lesson.title,
      type: lesson.type || 'video',
      content: lesson.content || '',
      duration: lesson.duration || 0,
      videoUrl: videoUrl,
      textContent: textContent,
      quizQuestions: [],
    });
  };

  const moveSection = (sectionId, direction) => {
    const sectionIndex = formData.curriculum.findIndex(section => section.id === sectionId);
    if ((direction === 'up' && sectionIndex === 0) || 
        (direction === 'down' && sectionIndex === formData.curriculum.length - 1)) {
      return;
    }

    const newCurriculum = [...formData.curriculum];
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    [newCurriculum[sectionIndex], newCurriculum[targetIndex]] = [newCurriculum[targetIndex], newCurriculum[sectionIndex]];

    setFormData(prev => ({
      ...prev,
      curriculum: newCurriculum
    }));
  };

  const moveLesson = (sectionId, lessonId, direction) => {
    const section = formData.curriculum.find(section => section.id === sectionId);
    const lessonIndex = section.lessons.findIndex(lesson => lesson.id === lessonId);
    
    if ((direction === 'up' && lessonIndex === 0) || 
        (direction === 'down' && lessonIndex === section.lessons.length - 1)) {
      return;
    }

    const newLessons = [...section.lessons];
    const targetIndex = direction === 'up' ? lessonIndex - 1 : lessonIndex + 1;
    [newLessons[lessonIndex], newLessons[targetIndex]] = [newLessons[targetIndex], newLessons[lessonIndex]];

    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map(sec => 
        sec.id === sectionId ? { ...sec, lessons: newLessons } : sec
      )
    }));
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
          <h1 className="text-4xl font-bold text-white mb-4">{formData.title || 'Edit Course'}</h1>
          <p className="text-xl text-white/90">
            Update your course details and content
          </p>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
        {notification && (
          <Notification type={notification.type} message={notification.message} />
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex justify-between overflow-x-auto" aria-label="Tabs">
              <div className="flex">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`
                      whitespace-nowrap py-4 px-6 font-medium text-sm border-b-2 flex items-center
                      ${currentTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                    `}
                    aria-current={currentTab === tab.id ? 'page' : undefined}
                  >
                    <tab.icon className={`mr-2 h-5 w-5 ${currentTab === tab.id ? 'text-blue-500' : 'text-gray-400'}`} />
                    {tab.name}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center px-6">
                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} })}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
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
            </nav>
          </div>
        </div>

        {/* Tab Content Container */}
        <div className="bg-white rounded-b-xl shadow-lg p-8">
          {/* Content for each tab will go here */}
          {currentTab === 'basics' && (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information (existing content) */}
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
                </div>
              </div>
            </form>
          )}

          {currentTab === 'pricing' && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <CurrencyDollarIcon className="h-6 w-6 mr-2 text-blue-600" />
                Course Pricing
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
              </div>
            </div>
          )}

          {currentTab === 'curriculum' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <BookOpenIcon className="h-6 w-6 mr-2 text-blue-600" />
                Course Curriculum
              </h2>
              
              {/* Section list */}
              <div className="space-y-6">
                {formData.curriculum.length === 0 ? (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No curriculum content yet</h3>
                    <p className="text-gray-500 mb-4">Start by adding your first section</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {formData.curriculum.map((section, sectionIndex) => (
                      <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <span>Section {sectionIndex + 1}: {section.title}</span>
                            <span className="ml-2 text-sm text-gray-500">({section.lessons.length} lessons)</span>
                          </h3>
                          <div className="flex space-x-2">
                            <button 
                              type="button"
                              onClick={() => moveSection(section.id, 'up')}
                              disabled={sectionIndex === 0}
                              className={`p-1 rounded-md ${sectionIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                              <ArrowUpIcon className="h-5 w-5" />
                            </button>
                            <button 
                              type="button"
                              onClick={() => moveSection(section.id, 'down')}
                              disabled={sectionIndex === formData.curriculum.length - 1}
                              className={`p-1 rounded-md ${sectionIndex === formData.curriculum.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                              <ArrowDownIcon className="h-5 w-5" />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => {
                                setEditingSection(section.id);
                                setEditingLesson(null);
                              }}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
                            >
                              <PlusIcon className="h-5 w-5" />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => deleteSection(section.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Lesson list for this section */}
                        <div className="divide-y divide-gray-200">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                              <div className="flex items-center">
                                <div className="mr-4 text-gray-400 flex-shrink-0">
                                  {lesson.type === 'video' ? (
                                    <VideoCameraIcon className="h-5 w-5" />
                                  ) : (
                                    <DocumentTextIcon className="h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-md font-medium text-gray-900 flex items-center">
                                    {lesson.title}
                                    {lesson.preview && (
                                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                                        Preview
                                      </span>
                                    )}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {lesson.duration > 0 ? `${lesson.duration} min` : 'No duration set'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button 
                                  type="button"
                                  onClick={() => moveLesson(section.id, lesson.id, 'up')}
                                  disabled={lessonIndex === 0}
                                  className={`p-1 rounded-md ${lessonIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                                >
                                  <ArrowUpIcon className="h-4 w-4" />
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => moveLesson(section.id, lesson.id, 'down')}
                                  disabled={lessonIndex === section.lessons.length - 1}
                                  className={`p-1 rounded-md ${lessonIndex === section.lessons.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                                >
                                  <ArrowDownIcon className="h-4 w-4" />
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => toggleLessonPreview(section.id, lesson.id)}
                                  className={`p-1 rounded-md ${lesson.preview ? 'text-green-600 hover:bg-green-50' : 'text-gray-500 hover:bg-gray-100'}`}
                                  title={lesson.preview ? "Remove from free preview" : "Mark as free preview"}
                                >
                                  <ViewfinderCircleIcon className="h-4 w-4" />
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => startEditingLesson(section.id, lesson)}
                                  className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => deleteLesson(section.id, lesson.id)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                          
                          {/* Add lesson form */}
                          {editingSection === section.id && editingLesson === null && (
                            <div className="p-4 bg-blue-50 border-t border-blue-100">
                              <h4 className="text-md font-medium text-blue-900 mb-4">Add New Lesson</h4>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Lesson Title <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={newLessonData.title}
                                    onChange={(e) => setNewLessonData({...newLessonData, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter lesson title"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Lesson Type
                                  </label>
                                  <select
                                    value={newLessonData.type}
                                    onChange={(e) => setNewLessonData({...newLessonData, type: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="video">Video</option>
                                    <option value="text">Text/Article</option>
                                    <option value="quiz">Quiz</option>
                                    <option value="assignment">Assignment</option>
                                  </select>
                                </div>
                                
                                {/* Conditional fields based on lesson type */}
                                {newLessonData.type === 'video' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Video URL
                                    </label>
                                    <input
                                      type="url"
                                      value={newLessonData.videoUrl}
                                      onChange={(e) => setNewLessonData({...newLessonData, videoUrl: e.target.value, content: e.target.value})}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="https://www.youtube.com/watch?v=example"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">YouTube, Vimeo, or direct video URL</p>
                                  </div>
                                )}
                                
                                {newLessonData.type === 'text' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Lesson Content
                                    </label>
                                    <textarea
                                      value={newLessonData.textContent}
                                      onChange={(e) => setNewLessonData({...newLessonData, textContent: e.target.value, content: e.target.value})}
                                      rows={6}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Enter the lesson content or paste HTML..."
                                    ></textarea>
                                  </div>
                                )}
                                
                                {newLessonData.type === 'quiz' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Quiz Info
                                    </label>
                                    <textarea
                                      value={newLessonData.content}
                                      onChange={(e) => setNewLessonData({...newLessonData, content: e.target.value})}
                                      rows={6}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Enter quiz questions and answers in JSON format or describe the quiz"
                                    ></textarea>
                                    <p className="mt-1 text-sm text-gray-500">You'll be able to build the quiz in detail after creating the lesson</p>
                                  </div>
                                )}
                                
                                {newLessonData.type === 'assignment' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Assignment Details
                                    </label>
                                    <textarea
                                      value={newLessonData.content}
                                      onChange={(e) => setNewLessonData({...newLessonData, content: e.target.value})}
                                      rows={6}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Describe the assignment, requirements, and submission details..."
                                    ></textarea>
                                  </div>
                                )}
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (minutes)
                                  </label>
                                  <input
                                    type="number"
                                    value={newLessonData.duration}
                                    onChange={(e) => setNewLessonData({...newLessonData, duration: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    min="0"
                                    step="0.5"
                                  />
                                </div>
                                <div className="flex justify-end space-x-3">
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setEditingSection(null);
                                      setNewLessonData({
                                        title: '',
                                        type: 'video',
                                        content: '',
                                        duration: 0,
                                        videoUrl: '',
                                        textContent: '',
                                        quizQuestions: [],
                                      });
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                  >
                                    Cancel
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => addLessonToSection(section.id)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                  >
                                    Add Lesson
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Edit lesson form */}
                          {editingSection === section.id && editingLesson && section.lessons.some(l => l.id === editingLesson) && (
                            <div className="p-4 bg-blue-50 border-t border-blue-100">
                              <h4 className="text-md font-medium text-blue-900 mb-4">Edit Lesson</h4>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Lesson Title <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={newLessonData.title}
                                    onChange={(e) => setNewLessonData({...newLessonData, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Lesson Type
                                  </label>
                                  <select
                                    value={newLessonData.type}
                                    onChange={(e) => setNewLessonData({...newLessonData, type: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="video">Video</option>
                                    <option value="text">Text/Article</option>
                                    <option value="quiz">Quiz</option>
                                    <option value="assignment">Assignment</option>
                                  </select>
                                </div>
                                
                                {/* Conditional fields based on lesson type */}
                                {newLessonData.type === 'video' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Video URL
                                    </label>
                                    <input
                                      type="url"
                                      value={newLessonData.content}
                                      onChange={(e) => setNewLessonData({...newLessonData, content: e.target.value})}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="https://www.youtube.com/watch?v=example"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">YouTube, Vimeo, or direct video URL</p>
                                  </div>
                                )}
                                
                                {newLessonData.type === 'text' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Lesson Content
                                    </label>
                                    <textarea
                                      value={newLessonData.content}
                                      onChange={(e) => setNewLessonData({...newLessonData, content: e.target.value})}
                                      rows={6}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Enter the lesson content or paste HTML..."
                                    ></textarea>
                                  </div>
                                )}
                                
                                {newLessonData.type === 'quiz' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Quiz Info
                                    </label>
                                    <textarea
                                      value={newLessonData.content}
                                      onChange={(e) => setNewLessonData({...newLessonData, content: e.target.value})}
                                      rows={6}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Enter quiz questions and answers in JSON format or describe the quiz"
                                    ></textarea>
                                    <p className="mt-1 text-sm text-gray-500">You'll be able to build the quiz in detail after creating the lesson</p>
                                  </div>
                                )}
                                
                                {newLessonData.type === 'assignment' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Assignment Details
                                    </label>
                                    <textarea
                                      value={newLessonData.content}
                                      onChange={(e) => setNewLessonData({...newLessonData, content: e.target.value})}
                                      rows={6}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Describe the assignment, requirements, and submission details..."
                                    ></textarea>
                                  </div>
                                )}
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (minutes)
                                  </label>
                                  <input
                                    type="number"
                                    value={newLessonData.duration}
                                    onChange={(e) => setNewLessonData({...newLessonData, duration: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    min="0"
                                    step="0.5"
                                  />
                                </div>
                                <div className="flex justify-end space-x-3">
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setEditingSection(null);
                                      setEditingLesson(null);
                                      setNewLessonData({
                                        title: '',
                                        type: 'video',
                                        content: '',
                                        duration: 0,
                                        videoUrl: '',
                                        textContent: '',
                                        quizQuestions: [],
                                      });
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                  >
                                    Cancel
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => updateLesson(section.id, editingLesson)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                  >
                                    Update Lesson
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Add new section */}
              <div className="mt-6 p-6 border border-dashed border-gray-300 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Section</h3>
                <div className="flex items-end space-x-4">
                  <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter section title"
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={addNewSection}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <PlusIcon className="h-5 w-5 mr-1" />
                    Add Section
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {currentTab === 'requirements' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <PuzzlePieceIcon className="h-6 w-6 mr-2 text-blue-600" />
                  Requirements
                </h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Prerequisites</h3>
                    <p className="text-sm text-gray-500 mb-4">What should students know before taking this course?</p>
                    
                    <div className="space-y-3">
                      {formData.requirements && formData.requirements.map((req, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => {
                              const newReqs = [...formData.requirements];
                              newReqs[index] = e.target.value;
                              setFormData({ ...formData, requirements: newReqs });
                            }}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Basic programming knowledge"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newReqs = [...formData.requirements];
                              newReqs.splice(index, 1);
                              setFormData({ ...formData, requirements: newReqs });
                            }}
                            className="ml-2 p-2 text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => {
                          const newReqs = [...(formData.requirements || []), ''];
                          setFormData({ ...formData, requirements: newReqs });
                        }}
                        className="mt-2 px-4 py-2 border border-dashed border-gray-300 rounded-md text-blue-600 hover:text-blue-700 hover:border-blue-300 flex items-center"
                      >
                        <PlusIcon className="h-5 w-5 mr-1" />
                        Add Prerequisite
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">What Students Will Learn</h3>
                    <p className="text-sm text-gray-500 mb-4">List the main learning outcomes of your course</p>
                    
                    <div className="space-y-3">
                      {formData.learning_outcomes && formData.learning_outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={outcome}
                            onChange={(e) => {
                              const newOutcomes = [...formData.learning_outcomes];
                              newOutcomes[index] = e.target.value;
                              setFormData({ ...formData, learning_outcomes: newOutcomes });
                            }}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Build responsive web applications"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newOutcomes = [...formData.learning_outcomes];
                              newOutcomes.splice(index, 1);
                              setFormData({ ...formData, learning_outcomes: newOutcomes });
                            }}
                            className="ml-2 p-2 text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => {
                          const newOutcomes = [...(formData.learning_outcomes || []), ''];
                          setFormData({ ...formData, learning_outcomes: newOutcomes });
                        }}
                        className="mt-2 px-4 py-2 border border-dashed border-gray-300 rounded-md text-blue-600 hover:text-blue-700 hover:border-blue-300 flex items-center"
                      >
                        <PlusIcon className="h-5 w-5 mr-1" />
                        Add Learning Outcome
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Target Audience</h3>
                    <p className="text-sm text-gray-500 mb-4">Define who this course is for</p>
                    
                    <div className="space-y-4">
                      {formData.target_audience && formData.target_audience.map((audience, index) => (
                        <div key={index} className="space-y-2 border border-gray-200 rounded-lg p-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Audience Type
                            </label>
                            <input
                              type="text"
                              value={audience.title || ''}
                              onChange={(e) => {
                                const newAudience = [...formData.target_audience];
                                newAudience[index] = {
                                  ...newAudience[index],
                                  title: e.target.value
                                };
                                setFormData({ ...formData, target_audience: newAudience });
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Beginner Developers"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <input
                              type="text"
                              value={audience.description || ''}
                              onChange={(e) => {
                                const newAudience = [...formData.target_audience];
                                newAudience[index] = {
                                  ...newAudience[index],
                                  description: e.target.value
                                };
                                setFormData({ ...formData, target_audience: newAudience });
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Looking to learn fundamentals"
                            />
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                const newAudience = [...formData.target_audience];
                                newAudience.splice(index, 1);
                                setFormData({ ...formData, target_audience: newAudience });
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => {
                          const newAudience = [...(formData.target_audience || []), { title: '', description: '' }];
                          setFormData({ ...formData, target_audience: newAudience });
                        }}
                        className="mt-2 px-4 py-2 border border-dashed border-gray-300 rounded-md text-blue-600 hover:text-blue-700 hover:border-blue-300 flex items-center"
                      >
                        <PlusIcon className="h-5 w-5 mr-1" />
                        Add Target Audience
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Course Features</h3>
                    <p className="text-sm text-gray-500 mb-4">Highlight key features of your course</p>
                    
                    <div className="space-y-3">
                      {formData.features && formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={feature.text || ''}
                            onChange={(e) => {
                              const newFeatures = [...formData.features];
                              newFeatures[index] = { text: e.target.value };
                              setFormData({ ...formData, features: newFeatures });
                            }}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 10 hours of video content"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newFeatures = [...formData.features];
                              newFeatures.splice(index, 1);
                              setFormData({ ...formData, features: newFeatures });
                            }}
                            className="ml-2 p-2 text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => {
                          const newFeatures = [...(formData.features || []), { text: '' }];
                          setFormData({ ...formData, features: newFeatures });
                        }}
                        className="mt-2 px-4 py-2 border border-dashed border-gray-300 rounded-md text-blue-600 hover:text-blue-700 hover:border-blue-300 flex items-center"
                      >
                        <PlusIcon className="h-5 w-5 mr-1" />
                        Add Feature
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'students' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <UserGroupIcon className="h-6 w-6 mr-2 text-blue-600" />
                Enrolled Students
              </h2>
              <p className="text-gray-600">Coming soon: View and manage students enrolled in your course.</p>
            </div>
          )}
          
          {currentTab === 'promotions' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <BellIcon className="h-6 w-6 mr-2 text-blue-600" />
                Course Promotions
              </h2>
              <p className="text-gray-600">Coming soon: Create and manage promotional coupons for your course.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 