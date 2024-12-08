'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

export default function ReviewSystem({ courseId, existingReviews = [] }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClientComponentClient();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert('Please login to submit a review');
        return;
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert({
          course_id: courseId,
          user_id: session.user.id,
          rating: rating,
          review_text: reviewText,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Reset form
      setRating(0);
      setReviewText('');
      
      // Refresh the page to show new review
      window.location.reload();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Review Form */}
      <form onSubmit={handleSubmitReview} className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        
        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1"
            >
              {star <= rating ? (
                <StarIconSolid className="h-8 w-8 text-yellow-400" />
              ) : (
                <StarIcon className="h-8 w-8 text-gray-300" />
              )}
            </button>
          ))}
        </div>

        {/* Review Text */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      {/* Existing Reviews */}
      <div className="space-y-6">
        {existingReviews.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-start">
              <Image
                src={review.student_image}
                alt={review.student_name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-4">
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-900">{review.student_name}</h4>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-gray-600">{review.review_text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 