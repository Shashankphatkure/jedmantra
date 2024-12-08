"use client";

import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import {
  MapPinIcon,
  LinkIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  BellIcon,
  EnvelopeIcon,
  ArrowPathRoundedSquareIcon,
  ShareIcon,
  BookmarkIcon,
  StarIcon as StarIconOutline,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Popover } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FollowModal from "@/app/components/FollowModal";

export default function UserProfilePage({ params }) {
  const username = use(params).username;
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);
  const notificationRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const supabase = createClientComponentClient();
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      // Fetch user profile by username
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

      if (userData) {
        // Fetch user's posts
        const { data: postsData } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", userData.id)
          .order("created_at", { ascending: false });

        setPosts(postsData || []);

        // Get followers count
        const { count: followers } = await supabase
          .from("followers")
          .select("*", { count: "exact", head: true })
          .eq("following_id", userData.id);

        // Get following count
        const { count: following } = await supabase
          .from("followers")
          .select("*", { count: "exact", head: true })
          .eq("follower_id", userData.id);

        // Check if current user is following this profile
        if (currentUser) {
          const { data: followData } = await supabase
            .from("followers")
            .select("*")
            .match({
              follower_id: currentUser.id,
              following_id: userData.id,
            })
            .single();

          setIsFollowing(!!followData);
        }

        setFollowersCount(followers || 0);
        setFollowingCount(following || 0);
        setProfile({
          ...userData,
          id: userData.id,
          name: `${userData.first_name} ${userData.last_name}`.trim(),
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
          avatar: userData.avatar_url
            ? supabase.storage.from("avatars").getPublicUrl(userData.avatar_url)
                .data.publicUrl
            : null,
          coverImage: userData.cover_image_url
            ? supabase.storage
                .from("covers")
                .getPublicUrl(userData.cover_image_url).data.publicUrl
            : null,
          education: {
            school: userData.institution,
            degree: formatAcademicRole(userData.academic_role),
          },
        });
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username, supabase, currentUser]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("users")
          .select("id, username")
          .eq("id", user.id)
          .single();

        setCurrentUser(data);
      }
    };

    fetchCurrentUser();
  }, [supabase]);

  // Add loading state
  if (!profile) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  const handleFollowClick = async () => {
    if (!currentUser) {
      // TODO: Handle not logged in state - maybe redirect to login
      return;
    }

    try {
      if (isFollowing) {
        // Unfollow
        const { error } = await supabase.from("followers").delete().match({
          follower_id: currentUser.id,
          following_id: profile.id,
        });

        if (error) throw error;
        setFollowersCount((prev) => prev - 1);
      } else {
        // Follow
        const { error } = await supabase.from("followers").insert({
          follower_id: currentUser.id,
          following_id: profile.id,
        });

        if (error) throw error;
        setFollowersCount((prev) => prev + 1);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error following/unfollowing:", error);
    }
  };

  return (
    <div className="flex">
      <main className="flex-1">
        <div>
          {/* Profile Header */}
          <div className="relative">
            {/* Cover Image */}
            <div className="h-16 bg-gray-800 rounded-[20px]">
              <img
                src={profile.coverImage}
                alt=""
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>

            {/* Profile Info */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex">
                  {/* Profile Image */}
                  <div className="w-32 h-32 rounded-full border-4 border-black bg-gray-700 -mt-16 overflow-hidden">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-4 mt-2">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold">{profile.name}</h1>
                      {profile.verified && (
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
                    <p className="text-gray-500">@{profile.username}</p>
                  </div>
                </div>

                {/* Follow and Notification buttons */}
                <div className="flex gap-2">
                  {currentUser?.username === username ? (
                    // Show Edit Profile and Become Mentor for own profile
                    <>
                      <Link
                        href="/profile/edit"
                        className="px-6 py-2 rounded-full border border-gray-600 hover:bg-gray-800 font-semibold"
                      >
                        Edit Profile
                      </Link>
                      <Link
                        href="/become-mentor"
                        className="px-6 py-2 rounded-full border border-gray-600 hover:bg-gray-800 font-semibold"
                      >
                        Become Mentor
                      </Link>
                    </>
                  ) : (
                    // Show Follow and Notification buttons for other profiles
                    <>
                      <button
                        onClick={handleFollowClick}
                        className={`px-6 py-2 rounded-full font-semibold ${
                          isFollowing
                            ? "border border-gray-600 hover:bg-gray-800"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>

                      <Link
                        href="/messages"
                        className="p-2 rounded-full border border-gray-600 hover:bg-gray-800"
                      >
                        <EnvelopeIcon className="w-5 h-5" />
                      </Link>

                      <div className="relative" ref={notificationRef}>
                        <button
                          className="p-2 rounded-full border border-gray-600 hover:bg-gray-800"
                          onClick={() =>
                            setShowNotificationOptions(!showNotificationOptions)
                          }
                        >
                          <BellIcon className="w-5 h-5" />
                        </button>

                        {showNotificationOptions && (
                          <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-700 z-10">
                            <div className="py-1">
                              <button
                                onClick={() =>
                                  setShowNotificationOptions(false)
                                }
                                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-800"
                              >
                                All notifications
                              </button>
                              <button
                                onClick={() =>
                                  setShowNotificationOptions(false)
                                }
                                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-800"
                              >
                                Mentions only
                              </button>
                              <button
                                onClick={() =>
                                  setShowNotificationOptions(false)
                                }
                                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-800"
                              >
                                No notifications
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bio and Info */}
              <div className="mt-4">
                <p className="text-gray-200 whitespace-pre-wrap">
                  {profile.bio}
                </p>

                <div className="flex flex-wrap gap-4 mt-3 text-gray-500">
                  {profile.education && (
                    <span className="flex items-center gap-1">
                      <AcademicCapIcon className="w-5 h-5" />{" "}
                      {profile.education.degree} from {profile.education.school}
                    </span>
                  )}
                  {profile.location && (
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

          {/* Tabs */}
          <div className="border-b border-gray-800">
            <nav className="flex">
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

          {/* Posts Section */}
          {activeTab === "posts" && (
            <div className="space-y-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="p-4 hover:bg-gray-900/50 transition-colors"
                >
                  <div className="flex gap-4">
                    <Link href={`/profile/${profile.username}`} className="flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-full bg-gray-700 hover:opacity-80 bg-cover bg-center"
                        style={{ backgroundImage: `url(${profile.avatar})` }}
                      />
                    </Link>
                    <div className="flex-grow">
                      {/* Post Header */}
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
                        <span className="text-gray-500">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Post Content */}
                      <div className="mt-2 text-white whitespace-pre-wrap text-justify">
                        {post.content}
                      </div>

                      {/* Post Images */}
                      {post.image_urls && post.image_urls.length > 0 && (
                        <div className="mt-3">
                          <div className="relative pt-[56.25%] bg-gray-800 rounded-xl overflow-hidden">
                            <div
                              className="absolute inset-0 bg-center bg-cover"
                              style={{ backgroundImage: `url(${post.image_urls[0]})` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Interaction Buttons */}
                      <div className="flex justify-between mt-4 text-gray-500 max-w-md">
                        <button className="group flex items-center gap-2 hover:text-purple-400">
                          <span className="p-2 rounded-full group-hover:bg-purple-400/10">
                            <StarIconOutline className="w-5 h-5" />
                          </span>
                          <span>{post.likes_count || 0}</span>
                        </button>
                        <button className="group flex items-center gap-2 hover:text-blue-400">
                          <span className="p-2 rounded-full group-hover:bg-blue-400/10">
                            <EnvelopeIcon className="w-5 h-5" />
                          </span>
                          <span>{post.comments_count || 0}</span>
                        </button>
                        <button className="group flex items-center gap-2 hover:text-green-400">
                          <span className="p-2 rounded-full group-hover:bg-green-400/10">
                            <ArrowPathRoundedSquareIcon className="w-5 h-5" />
                          </span>
                          <span>{post.reposts_count || 0}</span>
                        </button>

                        <button className="group flex items-center gap-2 hover:text-blue-400">
                          <span className="p-2 rounded-full group-hover:bg-blue-400/10">
                            <BookmarkIcon className="w-5 h-5" />
                          </span>
                        </button>
                        <button className="group flex items-center gap-2 hover:text-blue-400">
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
          )}
        </div>
      </main>

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
    </div>
  );
}

const tabs = [
  { id: "posts", label: "Posts" },
  { id: "replies", label: "Replies" },
  { id: "media", label: "Media" },
  { id: "likes", label: "Likes" },
];

// Helper function for formatting academic role
const formatAcademicRole = (role) => {
  if (!role) return "";
  return role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
