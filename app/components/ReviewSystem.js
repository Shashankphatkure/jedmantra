'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ReviewSystem({ courseId, reviews, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Submit review
      const { data, error } = await supabase
        .from('course_reviews')
        .insert([
          {
            course_id: courseId,
            user_id: user.id,
            rating,
            review_text: reviewText,
            student_name: user.user_metadata?.full_name || user.email,
            student_image: user.user_metadata?.avatar_url
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Clear form
      setRating(5);
      setReviewText('');
      
      // Update UI
      onReviewAdded(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Review Statistics */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <span className="text-3xl font-bold mr-2">
            {reviews.length > 0
              ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
              : '0.0'}
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className="h-5 w-5 text-yellow-400"
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Add Review Form */}
      <form onSubmit={handleSubmitReview} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-8 w-8 cursor-pointer ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows="4"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center mb-4">
              <img
                src={review.student_image || '/default-avatar.png'}
                alt={review.student_name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-medium">{review.student_name}</h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.review_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 