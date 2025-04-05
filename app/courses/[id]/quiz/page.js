'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ClockIcon,
  DocumentTextIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function CourseQuiz({ params }) {
  const courseId = params.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [course, setCourse] = useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchQuizData();
  }, [courseId]);

  useEffect(() => {
    if (quiz && quiz.time_limit && !quizSubmitted) {
      // Set timer
      setTimeLeft(quiz.time_limit * 60); // Convert minutes to seconds
      
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            submitQuiz();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [quiz, quizSubmitted]);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      
      // Fetch course data
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
        
      if (courseError) throw courseError;
      setCourse(courseData);
      
      // Check if quizzes table exists
      const { error: tableError } = await supabase
        .from('course_quizzes')
        .select('id')
        .limit(1);
        
      if (tableError && tableError.code === '42P01') {
        // Table doesn't exist, create it
        await createQuizzesTable();
        await seedQuizData(courseId);
      }
      
      // Fetch quiz data
      const { data: quizData, error: quizError } = await supabase
        .from('course_quizzes')
        .select('*')
        .eq('course_id', courseId)
        .single();
        
      if (quizError) {
        if (quizError.code === 'PGRST116') {
          // No quiz found for this course, create one
          await seedQuizData(courseId);
          
          // Fetch the newly created quiz
          const { data: newQuizData, error: newQuizError } = await supabase
            .from('course_quizzes')
            .select('*')
            .eq('course_id', courseId)
            .single();
            
          if (newQuizError) throw newQuizError;
          setQuiz(newQuizData);
        } else {
          throw quizError;
        }
      } else {
        setQuiz(quizData);
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createQuizzesTable = async () => {
    try {
      // Create the quizzes table using SQL
      const { error } = await supabase.rpc('create_course_quizzes_table');
      
      if (error) {
        // If RPC doesn't exist, create the table using a different approach
        // This is a simplified approach - in a real app, you'd use migrations
        await supabase.auth.getSession();
        
        // For demo purposes, we'll just show a toast
        toast.error('Could not create quizzes table. Please contact support.');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error creating quizzes table:', error);
      return false;
    }
  };

  const seedQuizData = async (courseId) => {
    try {
      // Create a sample quiz for the course
      const quizData = {
        course_id: courseId,
        title: 'Course Assessment Quiz',
        description: 'Test your knowledge of the course material with this quiz.',
        time_limit: 30, // 30 minutes
        passing_score: 70, // 70%
        questions: [
          {
            id: 1,
            question: 'What is the main purpose of this course?',
            options: [
              'To provide theoretical knowledge only',
              'To teach practical skills and theoretical knowledge',
              'To entertain students',
              'To fulfill academic requirements'
            ],
            correct_answer: 1, // Index of the correct answer (0-based)
            explanation: 'This course aims to provide both practical skills and theoretical knowledge to prepare you for real-world applications.'
          },
          {
            id: 2,
            question: 'Which of the following is a key concept covered in this course?',
            options: [
              'Ancient history',
              'Quantum physics',
              'Course-specific concept 1',
              'Political science'
            ],
            correct_answer: 2,
            explanation: 'Course-specific concept 1 is one of the fundamental concepts covered in this course.'
          },
          {
            id: 3,
            question: 'What is the recommended approach to learning the material in this course?',
            options: [
              'Memorize everything without understanding',
              'Skip the practical exercises',
              'Practice regularly and apply concepts',
              'Focus only on the final exam'
            ],
            correct_answer: 2,
            explanation: 'Regular practice and application of concepts is the most effective way to learn and retain the material.'
          },
          {
            id: 4,
            question: 'Which tool or technology is primarily used in this course?',
            options: [
              'Course-specific tool/technology',
              'Abacus',
              'Typewriter',
              'Sundial'
            ],
            correct_answer: 0,
            explanation: 'This course primarily uses course-specific tool/technology for practical applications.'
          },
          {
            id: 5,
            question: 'What is the best way to prepare for the final assessment?',
            options: [
              'Cram the night before',
              'Review notes and practice exercises regularly',
              'Skip all the lessons and just take the test',
              'Ask someone else to take the test for you'
            ],
            correct_answer: 1,
            explanation: 'Regular review of notes and practice exercises is the most effective way to prepare for the final assessment.'
          }
        ],
        created_at: new Date().toISOString()
      };
      
      // Insert the quiz data
      const { error } = await supabase
        .from('course_quizzes')
        .insert(quizData);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error seeding quiz data:', error);
      return false;
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correctAnswers++;
      }
    });
    
    const score = (correctAnswers / quiz.questions.length) * 100;
    const passed = score >= quiz.passing_score;
    
    return {
      score,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      passed
    };
  };

  const submitQuiz = async () => {
    try {
      const results = calculateScore();
      setQuizResults(results);
      setQuizSubmitted(true);
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      
      if (user) {
        // Check if quiz_results table exists
        const { error: tableError } = await supabase
          .from('quiz_results')
          .select('id')
          .limit(1);
          
        if (tableError && tableError.code === '42P01') {
          // Table doesn't exist, create it
          await createQuizResultsTable();
        }
        
        // Save quiz results
        const { error } = await supabase
          .from('quiz_results')
          .insert({
            user_id: user.id,
            course_id: courseId,
            quiz_id: quiz.id,
            score: results.score,
            passed: results.passed,
            answers: selectedAnswers,
            completed_at: new Date().toISOString()
          });
          
        if (error) throw error;
        
        // If passed, check if certificate should be generated
        if (results.passed) {
          // Check if user has completed all course content
          // This is a simplified check - in a real app, you'd check all lessons/modules
          const { data: enrollment, error: enrollmentError } = await supabase
            .from('enrollments')
            .select('*')
            .eq('user_id', user.id)
            .eq('course_id', courseId)
            .single();
            
          if (!enrollmentError && enrollment) {
            // Update enrollment to mark course as completed
            const { error: updateError } = await supabase
              .from('enrollments')
              .update({
                completed: true,
                completed_at: new Date().toISOString()
              })
              .eq('id', enrollment.id);
              
            if (updateError) {
              console.error('Error updating enrollment:', updateError);
            } else {
              // Generate certificate
              router.push(`/courses/${courseId}/certificate`);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to submit quiz');
    }
  };

  const createQuizResultsTable = async () => {
    try {
      // Create the quiz results table using SQL
      const { error } = await supabase.rpc('create_quiz_results_table');
      
      if (error) {
        // If RPC doesn't exist, create the table using a different approach
        // This is a simplified approach - in a real app, you'd use migrations
        await supabase.auth.getSession();
        
        // For demo purposes, we'll just show a toast
        toast.error('Could not create quiz results table. Please contact support.');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error creating quiz results table:', error);
      return false;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
            <XCircleIcon className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="mt-4 text-xl font-bold text-gray-900">Error Loading Quiz</h2>
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

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto" />
            <h2 className="mt-4 text-xl font-bold text-gray-900">No Quiz Available</h2>
            <p className="mt-2 text-gray-600">There is no quiz available for this course yet.</p>
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

  if (quizSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-6 py-8 border-b border-gray-200">
              <div className="flex items-center">
                <div className={`rounded-full p-3 ${quizResults.passed ? 'bg-green-100' : 'bg-red-100'}`}>
                  {quizResults.passed ? (
                    <CheckCircleIcon className="h-8 w-8 text-green-600" />
                  ) : (
                    <XCircleIcon className="h-8 w-8 text-red-600" />
                  )}
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Quiz Results</h2>
                  <p className="text-gray-600">{course.title}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gray-100">
                  <span className="text-3xl font-bold text-gray-900">{Math.round(quizResults.score)}%</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  {quizResults.passed ? 'Congratulations! You passed the quiz.' : 'You did not pass the quiz.'}
                </h3>
                <p className="mt-2 text-gray-600">
                  You answered {quizResults.correctAnswers} out of {quizResults.totalQuestions} questions correctly.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Quiz Summary</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Questions:</span>
                    <span className="font-medium">{quizResults.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Correct Answers:</span>
                    <span className="font-medium">{quizResults.correctAnswers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Score:</span>
                    <span className="font-medium">{Math.round(quizResults.score)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passing Score:</span>
                    <span className="font-medium">{quiz.passing_score}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Result:</span>
                    <span className={`font-medium ${quizResults.passed ? 'text-green-600' : 'text-red-600'}`}>
                      {quizResults.passed ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setSelectedAnswers({});
                    setCurrentQuestionIndex(0);
                    setQuizResults(null);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={() => router.push(`/courses/${courseId}`)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Return to Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const allQuestionsAnswered = Object.keys(selectedAnswers).length === quiz.questions.length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3">
                  <AcademicCapIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">{quiz.title}</h2>
                  <p className="text-gray-600">{course.title}</p>
                </div>
              </div>
              {timeLeft !== null && (
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                  <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="font-medium">{formatTime(timeLeft)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
              <div className="flex space-x-2">
                {quiz.questions.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-8 rounded-full ${
                      index === currentQuestionIndex
                        ? 'bg-blue-600'
                        : selectedAnswers[index] !== undefined
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">{currentQuestion.question}</h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                          selectedAnswers[currentQuestionIndex] === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-400'
                        }`}
                      >
                        {selectedAnswers[currentQuestionIndex] === index && (
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={goToPreviousQuestion}
                disabled={isFirstQuestion}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                  isFirstQuestion
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Previous
              </button>
              {isLastQuestion ? (
                <button
                  onClick={submitQuiz}
                  disabled={!selectedAnswers[currentQuestionIndex]}
                  className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md ${
                    !selectedAnswers[currentQuestionIndex]
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={goToNextQuestion}
                  disabled={!selectedAnswers[currentQuestionIndex]}
                  className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md ${
                    !selectedAnswers[currentQuestionIndex]
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  Next
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              )}
            </div>
          </div>

          {allQuestionsAnswered && !isLastQuestion && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={submitQuiz}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
