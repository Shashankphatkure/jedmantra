'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

export default function WishlistButton({ courseId }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    checkWishlistStatus();
  }, [courseId]);

  const checkWishlistStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from('wishlists')
        .select()
        .eq('user_id', session.user.id)
        .eq('course_id', courseId)
        .single();

      setIsInWishlist(!!data);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWishlist = async () => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login?redirect=' + encodeURIComponent(`/courses/${courseId}`));
        return;
      }

      if (isInWishlist) {
        // Remove from wishlist
        await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', session.user.id)
          .eq('course_id', courseId);
      } else {
        // Add to wishlist
        await supabase
          .from('wishlists')
          .insert({
            user_id: session.user.id,
            course_id: courseId,
            added_at: new Date().toISOString()
          });
      }

      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={isLoading}
      className="w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-medium border border-gray-200 hover:bg-gray-200 transition-all disabled:opacity-50"
    >
      <div className="flex items-center justify-center gap-2">
        {isInWishlist ? (
          <HeartSolid className="w-5 h-5 text-red-500" />
        ) : (
          <HeartOutline className="w-5 h-5" />
        )}
        <span className="text-sm text-gray-600">
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </span>
      </div>
    </button>
  );
} 