'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PaperAirplaneIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

const SaveJobButton = ({ jobId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  // Check if job is already saved when component mounts
  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('saved_jobs')
          .select('job_id')
          .eq('job_id', jobId)
          .eq('user_id', session.user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking saved status:', error);
        }

        setIsSaved(!!data);
      } catch (error) {
        console.error('Error checking saved status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSavedStatus();
  }, [jobId, supabase]);

  const handleSaveJob = async () => {
    setIsSaving(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = `/login?redirect=/jobs/${jobId}`;
        return;
      }

      if (isSaved) {
        // Unsave the job
        const { error } = await supabase
          .from('saved_jobs')
          .delete()
          .eq('job_id', jobId)
          .eq('user_id', session.user.id);

        if (error) throw error;
        setIsSaved(false);
      } else {
        // Save the job
        const { error } = await supabase
          .from('saved_jobs')
          .insert({
            job_id: jobId,
            user_id: session.user.id
          });

        if (error) throw error;
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error saving/unsaving job:', error);
      alert('Failed to save job. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <button className="w-full bg-white text-blue-600 px-6 py-4 rounded-xl font-medium border-2 border-blue-600 opacity-50">
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleSaveJob}
      disabled={isSaving}
      className="w-full bg-white text-blue-600 px-6 py-4 rounded-xl font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center"
    >
      {isSaved ? (
        <BookmarkSolidIcon className="h-5 w-5 mr-2" />
      ) : (
        <BookmarkIcon className="h-5 w-5 mr-2" />
      )}
      {isSaving ? 'Processing...' : (isSaved ? 'Saved' : 'Save Job')}
    </button>
  );
};

const ApplyButton = ({ jobId }) => {
  const [isApplying, setIsApplying] = useState(false);
  const supabase = createClientComponentClient();

  const handleApply = async () => {
    setIsApplying(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = `/login?redirect=/jobs/${jobId}`;
        return;
      }

      const { error } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          user_id: session.user.id,
          status: 'Open'
        });

      if (error) throw error;
      alert('Application submitted successfully!');
      
    } catch (error) {
      console.error('Error applying:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <button
      onClick={handleApply}
      disabled={isApplying}
      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center"
    >
      {isApplying ? (
        <span>Submitting...</span>
      ) : (
        <>
          <PaperAirplaneIcon className="h-5 w-5 mr-2" />
          Apply Now
        </>
      )}
    </button>
  );
};

export default function JobActionButtons({ jobId }) {
  return (
    <div className="space-y-4">
      <ApplyButton jobId={jobId} />
      <SaveJobButton jobId={jobId} />
    </div>
  );
} 