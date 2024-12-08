'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function EnrollButton({ courseId, price }) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleEnrollment = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login?redirect=' + encodeURIComponent(`/courses/${courseId}`));
        return;
      }

      // Check if already enrolled
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select()
        .eq('user_id', session.user.id)
        .eq('course_id', courseId)
        .single();

      if (existingEnrollment) {
        // Already enrolled, redirect to course content
        router.push(`/courses/${courseId}/learn`);
        return;
      }

      // TODO: Implement payment processing here
      
      // Create enrollment record
      const { data, error } = await supabase
        .from('enrollments')
        .insert({
          user_id: session.user.id,
          course_id: courseId,
          enrolled_at: new Date().toISOString(),
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      router.push(`/courses/${courseId}/learn`);
      router.refresh();
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Failed to enroll in the course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnrollment}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50"
    >
      {isLoading ? 'Processing...' : `Enroll Now - £${price}`}
    </button>
  );
} 