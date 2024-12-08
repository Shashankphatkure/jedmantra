"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckBadgeIcon,
  AcademicCapIcon,
  MapPinIcon,
  ChatBubbleLeftIcon,
  ArrowPathRoundedSquareIcon,
  StarIcon as StarIconOutline,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { Popover } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FollowModal from "@/app/components/FollowModal";
import { formatDistanceToNow } from "date-fns";

// Add this helper function at the top of your file, outside the component
const formatAcademicRole = (role) => {
  if (!role) return "";
  return role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const supabase = createClientComponentClient();
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showVerifiedPopover, setShowVerifiedPopover] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        // Fetch user data
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (userError) throw userError;

        // Fetch user's posts
        const { data: userPosts, error: postsError } = await supabase
          .from("posts")
          .select(`
            id,
            content,
            created_at,
            image_urls,
            likes_count,
            comments_count,
            reposts_count,
            title,
            post_type,
            tags,
            community_id,
            communities (
              id,
              name
            ),
            users (
              id,
              username,
              name,
              avatar_url,
              verified
            ),
            event_name,
            event_description,
            event_stream_link,
            poll_options,
            poll_votes,
            poll_end_date,
            link_url
          `)
          .eq("user_id", user.id)
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;

        if (userData) {
          const { count: followers } = await supabase
            .from("followers")
            .select("*", { count: "exact", head: true })
            .eq("following_id", user.id);

          const { count: following } = await supabase
            .from("followers")
            .select("*", { count: "exact", head: true })
            .eq("follower_id", user.id);

          setFollowersCount(followers || 0);
          setFollowingCount(following || 0);

          setProfile({
            id: userData.id,
            name: userData.first_name && userData.last_name 
              ? `${userData.first_name} ${userData.last_name}`.trim()
              : userData.name || 'Anonymous',
            username: userData.username,
            bio: userData.headline,
            verified: userData.verified,
            isPremium: userData.is_premium,
            location: userData.location,
            website: userData.website,
            joinedDate: new Date(userData.created_at).toLocaleDateString(
              "en-US",
              {
                month: "long",
                year: "numeric",
              }
            ),
            coverImage: userData.cover_image_url
              ? supabase.storage
                  .from("covers")
                  .getPublicUrl(userData.cover_image_url).data.publicUrl
              : null,
            profileImage: userData.avatar_url
              ? supabase.storage
                  .from("avatars")
                  .getPublicUrl(userData.avatar_url).data.publicUrl
              : null,
            education: {
              school: userData.institution,
              degree: formatAcademicRole(userData.academic_role),
              field:
                userData.field_of_expertise === "other"
                  ? formatAcademicRole(userData.other_field_of_expertise)
                  : formatAcademicRole(userData.field_of_expertise),
              department: userData.department,
            },
            posts: userPosts.map(post => ({
              ...post,
              created_at: post.created_at || new Date().toISOString(),
              likes_count: post.likes_count || 0,
              comments_count: post.comments_count || 0,
              reposts_count: post.reposts_count || 0,
              image_urls: post.image_urls || [],
              isLiked: false,
              isReposted: false,
              isBookmarked: false,
            })),
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No profile found</p>
      </div>
    );
  }

  // Tab Components
  const PostsTab = () => (
    <div className="space-y-4">
      {profile?.posts.map((post) => (
        <article key={post.id} className="p-4 hover:bg-gray-900/50 transition-colors">
          <div className="flex gap-4">
            <Link href={`/profile/${profile.username}`} className="flex-shrink-0">
              <div
                className="w-12 h-12 rounded-full bg-gray-700 hover:opacity-80 bg-cover bg-center"
                style={{ backgroundImage: `url(${profile.profileImage})` }}
              />
            </Link>
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <Link
                  href={`/profile/${profile.username}`}
                  className="font-bold hover:underline"
                >
                  {profile.name}
                </Link>
                {profile.verified && (
                  <CheckBadgeIcon className="w-4 h-4 text-yellow-500" />
                )}
                <span className="text-gray-500">·</span>
                {post.communities && (
                  <>
                    <Link
                      href={`/communities/${post.communities.id}`}
                      className="text-gray-500 hover:underline"
                    >
                      {post.communities.name}
                    </Link>
                    <span className="text-gray-500">·</span>
                  </>
                )}
                <span className="text-gray-500">
                  {post.created_at ? 
                    formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                    })
                      .replace("about ", "")
                      .replace(" ago", "")
                      .replace(" hours", "h")
                      .replace(" hour", "h")
                      .replace(" minutes", "m")
                      .replace(" minute", "m")
                      .replace(" days", "d")
                      .replace(" day", "d")
                    : "recently"
                  }
                </span>
              </div>

              {post.post_type === "event" && (
                <div className="mt-4 border border-gray-800 rounded-xl p-4">
                  <h2 className="text-xl font-bold">{post.event_name}</h2>
                  <p className="mt-2 text-gray-400">{post.event_description}</p>
                  {post.event_stream_link && (
                    <a
                      href={post.event_stream_link}
                      className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Stream
                    </a>
                  )}
                </div>
              )}

              {post.post_type === "poll" && post.poll_options && (
                <div className="mt-4">
                  {post.poll_options.map((option, index) => {
                    const results = calculatePollResults(post.poll_votes);
                    const percentage = results[index] || 0;

                    return (
                      <button
                        key={index}
                        onClick={() => handleVote(post.id, index)}
                        className="w-full mt-2 p-3 border border-gray-700 rounded-lg hover:bg-gray-800 relative overflow-hidden"
                      >
                        <div
                          className="absolute left-0 top-0 h-full bg-blue-500/20"
                          style={{ width: `${percentage}%` }}
                        />
                        <div className="relative flex justify-between">
                          <span>{option}</span>
                          <span>{percentage.toFixed(1)}%</span>
                        </div>
                      </button>
                    );
                  })}
                  {post.poll_end_date && (
                    <p className="mt-2 text-sm text-gray-500">
                      Poll ends{" "}
                      {formatDistanceToNow(new Date(post.poll_end_date), {
                        addSuffix: true,
                      })}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-2 text-white whitespace-pre-wrap">
                {post.content}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {post.post_type === "link" && post.link_url && (
                <a
                  href={post.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block border border-gray-800 rounded-xl p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-blue-400">
                    <span className="truncate">{post.link_url}</span>
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              )}

              {post.image_urls && post.image_urls.length > 0 && (
                <div
                  className={`grid gap-2 mt-3 ${
                    post.image_urls.length === 1
                      ? "grid-cols-1"
                      : post.image_urls.length === 2
                      ? "grid-cols-2"
                      : post.image_urls.length === 3
                      ? "grid-cols-2"
                      : "grid-cols-2"
                  }`}
                >
                  {post.image_urls.map((image, index) => (
                    <div
                      key={index}
                      className="relative pt-[56.25%] bg-gray-800 rounded-xl overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 bg-center bg-cover transform transition-transform group-hover:scale-105"
                        style={{ backgroundImage: `url(${image})` }}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between mt-4 text-gray-500 max-w-md">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`group flex items-center gap-2 ${
                    post.isLiked ? "text-purple-400" : "hover:text-purple-400"
                  }`}
                  title="Like this post"
                >
                  <span className="p-2 rounded-full group-hover:bg-purple-400/10">
                    {post.isLiked ? (
                      <StarIconSolid className="w-5 h-5" />
                    ) : (
                      <StarIconOutline className="w-5 h-5" />
                    )}
                  </span>
                  <span>{(post.likes_count || 0).toLocaleString()}</span>
                </button>
                <Link
                  href={`/post/${post.id}`}
                  className="group flex items-center gap-2 hover:text-blue-400"
                  title="Comment on this post"
                >
                  <span className="p-2 rounded-full group-hover:bg-blue-400/10">
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                  </span>
                  <span>{(post.comments_count || 0).toLocaleString()}</span>
                </Link>
                <button
                  onClick={() => handleRepost(post.id)}
                  className={`group flex items-center gap-2 ${
                    post.isReposted ? "text-green-400" : "hover:text-green-400"
                  }`}
                  title="Repost this post"
                >
                  <span className="p-2 rounded-full group-hover:bg-green-400/10">
                    <ArrowPathRoundedSquareIcon className="w-5 h-5" />
                  </span>
                  <span>{(post.reposts_count || 0).toLocaleString()}</span>
                </button>
                <button
                  onClick={() => handleBookmark(post.id)}
                  className={`group flex items-center gap-2 ${
                    post.isBookmarked ? "text-blue-400" : "hover:text-blue-400"
                  }`}
                  title="Bookmark this post"
                >
                  <span className="p-2 rounded-full group-hover:bg-blue-400/10">
                    {post.isBookmarked ? (
                      <BookmarkIconSolid className="w-5 h-5" />
                    ) : (
                      <BookmarkIcon className="w-5 h-5" />
                    )}
                  </span>
                </button>
                <button
                  onClick={() => handleShare(post.id)}
                  className="group flex items-center gap-2 hover:text-blue-400"
                  title="Share this post"
                >
                  <span className="p-2 rounded-full group-hover:bg-blue-400/10">
                    <ShareIcon className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  const RepliesTab = () => (
    <div className="space-y-4">
      <div className="text-gray-500 text-center py-8">No replies yet</div>
    </div>
  );

  const MediaTab = () => (
    <div className="grid grid-cols-3 gap-1">
      {profile?.posts
        .filter((post) => post.images)
        .flatMap((post) => post.images || [])
        .map((image, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-800 overflow-hidden"
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </div>
        ))}
    </div>
  );

  const LikesTab = () => (
    <div className="space-y-4">
      <div className="text-gray-500 text-center py-8">No likes yet</div>
    </div>
  );

  // Add these handler functions to your component
  const handleLike = async (postId) => {
    // Implement like functionality
  };

  const handleRepost = async (postId) => {
    // Implement repost functionality
  };

  const handleBookmark = async (postId) => {
    // Implement bookmark functionality
  };

  const handleShare = async (postId) => {
    try {
      await navigator.share({
        title: `Post by ${profile.name}`,
        text: profile.posts.find(p => p.id === postId)?.content,
        url: `${window.location.origin}/post/${postId}`,
      });
    } catch (err) {
      console.log("Share failed:", err);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Main Content */}
        <main className="flex-1">
          <div>
            {/* Profile Header */}
            <div className="relative">
              {/* Cover Image */}
              <div className="h-32 md:h-16 bg-gray-800 rounded-[20px]">
                {profile?.coverImage && (
                  <img
                    src={profile.coverImage}
                    alt=""
                    className="w-full h-full object-cover rounded-[20px]"
                  />
                )}
              </div>

              {/* Profile Info */}
              <div className="p-4">
                <div className="flex flex-col md:flex-row justify-between items-start">
                  <div className="flex flex-col md:flex-row">
                    {/* Profile Image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-black bg-gray-700 -mt-12 md:-mt-16 overflow-hidden">
                      {profile?.profileImage && (
                        <img
                          src={profile.profileImage}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="ml-0 md:ml-4 mt-2">
                      <div className="flex items-center gap-2">
                        {profile ? (
                          <h1 className="text-xl md:text-2xl font-bold">{profile.name}</h1>
                        ) : (
                          <h1 className="text-xl md:text-2xl font-bold">Loading...</h1>
                        )}
                        {profile?.verified && (
                          <Popover className="relative">
                            <Popover.Button className="focus:outline-none">
                              <CheckBadgeIcon className="w-6 h-6 text-yellow-500 cursor-pointer hover:text-yellow-400" />
                            </Popover.Button>

                            <Popover.Panel className="absolute z-10 mt-2 w-72 -translate-x-1/2 transform px-4 sm:px-0">
                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="bg-black p-4">
                                  <div className="flex gap-2">
                                    <CheckBadgeIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm text-gray-200">
                                        This account is verified because it's
                                        officially part of @Gradly
                                      </p>
                                      <p className="text-xs text-gray-400 mt-2">
                                        Verified since eternity
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Popover>
                        )}
                      </div>
                      <p className="text-gray-500">@{profile?.username}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Link
                      href="/profile/edit"
                      className="px-4 md:px-6 py-2 rounded-full border border-gray-600 hover:bg-gray-800 font-semibold"
                    >
                      Edit Profile
                    </Link>
                    <button className="px-4 md:px-6 py-2 rounded-full border border-gray-600 hover:bg-gray-800 font-semibold">
                      Become Mentor
                    </button>
                  </div>
                </div>

                {/* Bio and Info */}
                <div className="mt-4">
                  <p className="text-gray-200 whitespace-pre-wrap">
                    {profile?.bio}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-3 text-gray-500">
                    {profile?.education && (
                      <span className="flex items-center gap-1">
                        <AcademicCapIcon className="w-5 h-5" />
                        {profile.education.degree} from{" "}
                        {profile.education.school}
                      </span>
                    )}
                    {profile?.location && (
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="w-5 h-5" /> {profile.location}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-6 mt-4">
                    <button
                      onClick={() => setShowFollowingModal(true)}
                      className="hover:underline"
                    >
                      <strong>{followingCount}</strong>{" "}
                      <span className="text-gray-500">Following</span>
                    </button>
                    <button
                      onClick={() => setShowFollowersModal(true)}
                      className="hover:underline"
                    >
                      <strong>{followersCount}</strong>{" "}
                      <span className="text-gray-500">Followers</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="border-b border-gray-800">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-4 hover:bg-gray-900 relative ${
                      activeTab === tab.id ? "font-bold" : ""
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="">
              {activeTab === "posts" && <PostsTab />}
              {activeTab === "replies" && <RepliesTab />}
              {activeTab === "media" && <MediaTab />}
              {activeTab === "likes" && <LikesTab />}
            </div>
          </div>
        </main>
      </div>

      <FollowModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        userId={profile?.id}
        type="followers"
        title="Followers"
      />

      <FollowModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        userId={profile?.id}
        type="following"
        title="Following"
      />
    </>
  );
}

const tabs = [
  { id: "posts", label: "Posts" },
  { id: "replies", label: "Replies" },
  { id: "media", label: "Media" },
  { id: "likes", label: "Likes" },
];

const calculatePollResults = (pollVotes) => {
  if (!pollVotes) return {};
  const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);
  return Object.entries(pollVotes).reduce((acc, [key, votes]) => {
    acc[key] = (votes / totalVotes) * 100;
    return acc;
  }, {});
};

const handleVote = async (postId, optionIndex) => {
  // Implement poll voting functionality
  console.log("Voted for option:", optionIndex, "on post:", postId);
};
