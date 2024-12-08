"use client";

import { useState, use, useEffect, useRef } from "react";
import Link from "next/link";
import {
  UsersIcon,
  ShieldCheckIcon,
  BellIcon,
  ShareIcon,
  PencilSquareIcon,
  ChatBubbleLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  CalendarIcon,
  StarIcon as StarIconOutline,
  BookmarkIcon as BookmarkIconOutline,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { ClipboardIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function CommunityPage({ params }) {
  const id = use(params).id;
  const [community, setCommunity] = useState(null);
  const [moderators, setModerators] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);
  const notificationRef = useRef(null);
  const supabase = createClientComponentClient();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const router = useRouter();
  const [followingMap, setFollowingMap] = useState({});
  const [followLoading, setFollowLoading] = useState({});

  useEffect(() => {
    async function fetchCommunityData() {
      // First try to fetch by slug
      let { data: communityData, error: slugError } = await supabase
        .from("communities")
        .select("*")
        .eq("slug", id)
        .single();

      // If no result found by slug, try fetching by UUID
      if (slugError) {
        const { data, error: uuidError } = await supabase
          .from("communities")
          .select("*")
          .eq("id", id)
          .single();
          
        if (uuidError) {
          console.error("Error fetching community:", uuidError);
          return;
        }
        communityData = data;
      }

      const { data: moderatorsData, error: moderatorsError } = await supabase
        .from("community_moderators")
        .select(
          `
          user_id,
          users (
            id,
            username,
            avatar_url
          )
        `
        )
        .eq("community_id", communityData.id);

      if (moderatorsError) {
        console.error("Error fetching moderators:", moderatorsError);
        return;
      }

      // Fetch posts for the community
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select(
          `
          id,
          content,
          image_urls,
          likes_count,
          comments_count,
          reposts_count,
          created_at,
          title,
          post_type,
          tags,
          users (
            id,
            username,
            name,
            avatar_url,
            verified
          )
        `
        )
        .eq("community_id", communityData.id)
        .order("created_at", { ascending: false });

      if (postsError) {
        console.error("Error fetching posts:", postsError);
        return;
      }

      // Fetch members
      const { data: membersData, error: membersError } = await supabase
        .from("community_members")
        .select(
          `
          role,
          users (
            id,
            username,
            name,
            avatar_url,
            verified
          )
        `
        )
        .eq("community_id", communityData.id);

      if (membersError) {
        console.error("Error fetching members:", membersError);
        return;
      }

      setPosts(postsData);
      setCommunity(communityData);
      setModerators(moderatorsData.map((mod) => mod.users));
      setMembers(membersData);
    }

    fetchCommunityData();
  }, [id, supabase]);

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

  // Add mock currentUser
  const currentUser = {
    name: "Current User",
    username: "currentuser",
    avatar: "https://i.pravatar.cc/150?img=0",
    verified: false,
  };

  // Add this useEffect to get current user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  // Update this useEffect to handle both UUID and slug cases
  useEffect(() => {
    const checkSubscription = async () => {
      if (!user || !community) return;

      try {
        const { data, error } = await supabase
          .from("community_members")
          .select("role")
          .eq("community_id", community.id)
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error checking subscription:", error);
        }

        setIsSubscribed(!!data);
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };

    checkSubscription();
  }, [user, community, supabase]);

  // Add this function to handle join/leave
  const handleSubscription = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      // First, get the community ID if we're using a slug
      let communityId = id;
      if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        const { data: communityData, error: communityError } = await supabase
          .from("communities")
          .select("id")
          .eq("slug", id)
          .single();
        
        if (communityError) throw communityError;
        communityId = communityData.id;
      }

      if (isSubscribed) {
        // Leave community
        const { error } = await supabase
          .from("community_members")
          .delete()
          .eq("community_id", communityId)
          .eq("user_id", user.id);

        if (error) throw error;

        // Update members count in communities table
        await supabase
          .from("communities")
          .update({ members_count: community.members_count - 1 })
          .eq("id", communityId);
      } else {
        // Join community
        const { error } = await supabase.from("community_members").insert({
          community_id: communityId,
          user_id: user.id,
          role: "member",
        });

        if (error) throw error;

        // Update members count in communities table
        await supabase
          .from("communities")
          .update({ members_count: community.members_count + 1 })
          .eq("id", communityId);
      }

      // Toggle subscription state
      setIsSubscribed(!isSubscribed);

      // Update community members count in UI
      setCommunity((prev) => ({
        ...prev,
        members_count: prev.members_count + (isSubscribed ? -1 : 1),
      }));
    } catch (error) {
      console.error("Error updating subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("followers")
        .select("following_id")
        .eq("follower_id", user.id);

      if (error) {
        console.error("Error fetching following status:", error);
        return;
      }

      const followingStatus = {};
      data.forEach((row) => {
        followingStatus[row.following_id] = true;
      });
      setFollowingMap(followingStatus);
    };

    fetchFollowingStatus();
  }, [user, supabase]);

  const handleFollow = async (targetUserId) => {
    if (!user) {
      router.push("/login");
      return;
    }

    setFollowLoading((prev) => ({ ...prev, [targetUserId]: true }));

    try {
      const isFollowing = followingMap[targetUserId];

      if (isFollowing) {
        // Unfollow
        await supabase
          .from("followers")
          .delete()
          .eq("follower_id", user.id)
          .eq("following_id", targetUserId);

        setFollowingMap((prev) => {
          const updated = { ...prev };
          delete updated[targetUserId];
          return updated;
        });
      } else {
        // Follow
        await supabase.from("followers").insert({
          follower_id: user.id,
          following_id: targetUserId,
        });

        setFollowingMap((prev) => ({
          ...prev,
          [targetUserId]: true,
        }));
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
    } finally {
      setFollowLoading((prev) => ({ ...prev, [targetUserId]: false }));
    }
  };

  return (
    <main className="px-4 sm:px-6 lg:px-8">
      {/* Community Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-24 bg-gray-800">
          <img
            src={
              community?.cover_url || "https://picsum.photos/1200/400?random=1"
            }
            alt={community?.name || "Community"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Community Info */}
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{community?.name}</h1>
                {community?.is_verified && (
                  <CheckBadgeIcon className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <p className="text-gray-400 mt-2">{community?.description}</p>
              <div className="flex gap-4 mt-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-4 h-4" />
                  {members?.length?.toLocaleString() || 0} members
                </span>
                <span className="flex items-center gap-1">
                  <PencilSquareIcon className="w-4 h-4" />
                  {posts?.length?.toLocaleString() || 0} posts
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <div className="relative inline-block group">
                <Link
                  href={isSubscribed ? `/communities/createpost` : '#'}
                  onClick={(e) => {
                    if (!isSubscribed) {
                      e.preventDefault();
                      alert('Please join the community to create a post');
                    }
                  }}
                  className={`inline-flex px-4 py-2 rounded-full font-semibold ${
                    isSubscribed 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  Create Post
                </Link>
                {!isSubscribed && (
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-14 invisible group-hover:visible w-48 px-2 py-1 bg-gray-900 text-white text-sm rounded-md shadow-lg z-50">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 bg-gray-900 transform rotate-45"></div>
                    <p className="text-center">Join community to create posts</p>
                  </div>
                )}
              </div>
              <button
                onClick={handleSubscription}
                disabled={isLoading}
                className={`px-4 py-2 rounded-full font-semibold ${
                  isSubscribed
                    ? "border border-gray-600 hover:bg-gray-800"
                    : "bg-blue-500 hover:bg-blue-600"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Loading..." : isSubscribed ? "Joined" : "Join"}
              </button>
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
                        onClick={() => setShowNotificationOptions(false)}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-800"
                      >
                        All notifications
                      </button>
                      <button
                        onClick={() => setShowNotificationOptions(false)}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-800"
                      >
                        Mentions only
                      </button>
                      <button
                        onClick={() => setShowNotificationOptions(false)}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-800"
                      >
                        No notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button className="p-2 rounded-full border border-gray-600 hover:bg-gray-800">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
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
      </div>

      {/* Main Content */}
      <div className="pt-4">
        <div className="flex-1">
          {activeTab === "posts" && (
            <div className="divide-y divide-gray-800">
              {posts.map((post) => (
                <CommunityPost
                  key={post.id}
                  id={post.id}
                  author={{
                    name: post.users.name,
                    username: post.users.username,
                    verified: post.users.verified,
                    avatar: post.users.avatar_url,
                  }}
                  content={post.content}
                  timestamp={formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                  })}
                  likes={post.likes_count}
                  comments={post.comments_count}
                  reposts={post.reposts_count}
                  images={post.image_urls}
                  post_type={post.post_type}
                  event_name={post.title}
                  event_description={post.description}
                  event_stream_link={post.event_stream_link}
                  poll_options={post.poll_options}
                  poll_votes={post.poll_votes}
                  poll_end_date={post.poll_end_date}
                  link_url={post.link_url}
                  tags={post.tags}
                />
              ))}
            </div>
          )}

          {activeTab === "events" && (
            <div className="p-4 text-center text-gray-400">
              {/* Add your events content here */}
              <p>Events coming soon</p>
            </div>
          )}

          {activeTab === "media" && (
            <div className="p-4 text-center text-gray-400">
              <p>Media content coming soon</p>
            </div>
          )}

          {activeTab === "members" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900 rounded-lg">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="text-lg font-bold">Members</h2>
                  <p className="text-sm text-gray-400">
                    {members?.length?.toLocaleString()} members
                  </p>
                </div>

                <div className="divide-y divide-gray-800">
                  {members.map((member) => (
                    <MemberCard
                      key={member.users.id}
                      member={member}
                      user={user}
                      followingMap={followingMap}
                      followLoading={followLoading}
                      handleFollow={handleFollow}
                      router={router}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-4">
              {/* About Section */}
              <div className="bg-gray-900 rounded-lg p-4">
                <h2 className="text-lg font-bold mb-3">About Community</h2>
                <p className="text-gray-400 text-sm text-justify">
                  {community?.long_description}
                </p>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <UsersIcon className="w-5 h-5" />
                    <span>Membership: Open to all interested individuals.</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <LockClosedIcon className="w-5 h-5" />
                    <span>Posting Permissions: Only members can post.</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <ShieldCheckIcon className="w-5 h-5" />
                    <span className="capitalize">
                      {community?.visibility || 'Public'} Community
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <UsersIcon className="w-5 h-5" />
                    <span>{community?.posts_per_day || 0} posts per day</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <CalendarIcon className="w-5 h-5" />
                    <span>
                      Created{" "}
                      {new Date(community?.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rules Section */}
              <div className="bg-gray-900 rounded-lg p-4">
                <h2 className="text-lg font-bold mb-3">Community Rules</h2>
                <ol className="space-y-2 text-sm text-gray-400">
                  {community?.rules?.map((rule, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="font-bold text-gray-300">
                        {index + 1}.
                      </span>
                      {rule}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Moderators Section */}
              <div className="bg-gray-900 rounded-lg p-4">
                <h2 className="text-lg font-bold mb-3">Moderators</h2>
                <div className="space-y-3">
                  {moderators.map((mod) => (
                    <ModeratorCard key={mod.id} mod={mod} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const CommunityPost = ({
  id,
  author,
  content,
  timestamp,
  likes,
  comments,
  reposts,
  images,
  post_type,
  event_name,
  event_description,
  event_stream_link,
  poll_options,
  poll_votes,
  poll_end_date,
  link_url,
  tags,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isReposted, setIsReposted] = useState(false);
  const [repostCount, setRepostCount] = useState(reposts);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  // Check bookmark status
  useEffect(() => {
    async function checkBookmarkStatus() {
      if (!user) return;

      const { data, error } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", user.id)
        .eq("post_id", id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking bookmark:", error);
        return;
      }

      setIsBookmarked(!!data);
    }

    checkBookmarkStatus();
  }, [id, user, supabase]);

  useEffect(() => {
    if (author.avatar) {
      const { data: { publicUrl } } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(author.avatar);
      setAvatarUrl(publicUrl);
    }
  }, [author.avatar, supabase]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleRepost = () => {
    setIsReposted(!isReposted);
    setRepostCount((prev) => (isReposted ? prev - 1 : prev + 1));
  };

  const handleBookmark = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      if (isBookmarked) {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("post_id", id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("bookmarks").insert({
          user_id: user.id,
          post_id: id,
          type: "post",
        });

        if (error) throw error;
      }

      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const handleShare = async (method) => {
    switch (method) {
      case "native":
        try {
          await navigator.share({
            title: `Post by ${author.name}`,
            text: content,
            url: window.location.href,
          });
        } catch (err) {
          console.log("Share failed:", err);
        }
        break;

      case "copy":
        await navigator.clipboard.writeText(window.location.href);
        break;

      case "email":
        window.location.href = `mailto:?subject=Check out this post by ${author.name}&body=${content}%0A%0A${window.location.href}`;
        break;
    }
    setShowShareMenu(false);
  };

  const calculatePollResults = () => {
    if (!poll_votes) return {};
    const totalVotes = Object.values(poll_votes).reduce((a, b) => a + b, 0);
    return Object.entries(poll_votes).reduce((acc, [key, votes]) => {
      acc[key] = (votes / totalVotes) * 100;
      return acc;
    }, {});
  };

  const handleVote = async (optionIndex) => {
    console.log("Voted for option:", optionIndex);
  };

  return (
    <article className="p-4 hover:bg-gray-900/50 transition-colors">
      <div className="flex gap-4">
        <Link href={`/profile/${author.username}`} className="flex-shrink-0">
          <div
            className="w-10 h-10 rounded-full bg-gray-700 bg-cover bg-center"
            style={{ 
              backgroundImage: avatarUrl 
                ? `url(${avatarUrl})` 
                : `url(/default-avatar.png)` 
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </Link>
        <div className="flex-grow">
          {/* Author info */}
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${author.username}`}
              className="font-bold hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {author.name}
            </Link>
            {author.verified && (
              <CheckBadgeIcon className="w-4 h-4 text-yellow-500" />
            )}
            <span className="text-gray-500">{timestamp}</span>
          </div>

          <Link href={`/post/${id}`} className="block">
            <div className="cursor-pointer">
              {/* Event Post */}
              {post_type === "event" && (
                <div className="mt-4 border border-gray-800 rounded-xl p-4">
                  <h2 className="text-xl font-bold">{event_name}</h2>
                  <p className="mt-2 text-gray-400">{event_description}</p>
                  {event_stream_link && (
                    <a
                      href={event_stream_link}
                      className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Stream
                    </a>
                  )}
                </div>
              )}

              {/* Poll Post */}
              {post_type === "poll" && poll_options && (
                <div className="mt-4">
                  {poll_options.map((option, index) => {
                    const results = calculatePollResults();
                    const percentage = results[index] || 0;

                    return (
                      <button
                        key={index}
                        onClick={() => handleVote(index)}
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
                  {poll_end_date && (
                    <p className="mt-2 text-sm text-gray-500">
                      Poll ends{" "}
                      {formatDistanceToNow(new Date(poll_end_date), {
                        addSuffix: true,
                      })}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-2 text-white whitespace-pre-wrap text-justify">{content}</div>

              {/* Add tags display */}
              {tags && tags.length > 0 && (
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-100">
                    {tags}
                  </span>
                </div>
              )}

              {/* Images Grid */}
              {images && images.length > 0 && (
                <div
                  className={`grid gap-2 mt-3 ${
                    images.length === 1
                      ? "grid-cols-1"
                      : images.length === 2
                      ? "grid-cols-2"
                      : images.length === 3
                      ? "grid-cols-2"
                      : "grid-cols-2"
                  }`}
                >
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative pt-[56.25%] bg-gray-800 rounded-xl overflow-hidden"
                    >
                      <img
                        src={image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Link Post */}
              {post_type === "link" && link_url && (
                <a
                  href={link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block border border-gray-800 rounded-xl p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-blue-400">
                    <span className="truncate">{link_url}</span>
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
            </div>
          </Link>

          {/* Interaction Buttons */}
          <div className="flex justify-between mt-4 text-gray-500 max-w-md">
            <button
              onClick={handleLike}
              className={`group flex items-center gap-2 ${
                isLiked ? "text-purple-400" : "hover:text-purple-400"
              }`}
            >
              <span className="p-2 rounded-full group-hover:bg-purple-400/10">
                {isLiked ? (
                  <StarIconSolid className="w-5 h-5" />
                ) : (
                  <StarIconOutline className="w-5 h-5" />
                )}
              </span>
              <span>{likeCount.toLocaleString()}</span>
            </button>

            <Link
              href={`/post/${id}`}
              className="group flex items-center gap-2 hover:text-blue-400"
            >
              <span className="p-2 rounded-full group-hover:bg-blue-400/10">
                <ChatBubbleLeftIcon className="w-5 h-5" />
              </span>
              <span>{comments.toLocaleString()}</span>
            </Link>

            <button
              onClick={handleRepost}
              className={`group flex items-center gap-2 ${
                isReposted ? "text-green-400" : "hover:text-green-400"
              }`}
            >
              <span className="p-2 rounded-full group-hover:bg-green-400/10">
                <ArrowPathRoundedSquareIcon className="w-5 h-5" />
              </span>
              <span>{repostCount.toLocaleString()}</span>
            </button>

            <button
              onClick={handleBookmark}
              className={`group flex items-center gap-2 ${
                isBookmarked ? "text-blue-400" : "hover:text-blue-400"
              }`}
            >
              <span className="p-2 rounded-full group-hover:bg-blue-400/10">
                {isBookmarked ? (
                  <BookmarkIconSolid className="w-5 h-5" />
                ) : (
                  <BookmarkIconOutline className="w-5 h-5" />
                )}
              </span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="group flex items-center hover:text-blue-400"
              >
                <span className="p-2 rounded-full group-hover:bg-blue-400/10">
                  <ShareIcon className="w-5 h-5" />
                </span>
              </button>

              {showShareMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
                  <div className="py-2">
                    {navigator.share && (
                      <button
                        onClick={() => handleShare("native")}
                        className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-800"
                      >
                        <ShareIcon className="w-5 h-5" />
                        <span>Share via...</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleShare("copy")}
                      className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-800"
                    >
                      <ClipboardIcon className="w-5 h-5" />
                      <span>Copy link</span>
                    </button>
                    <button
                      onClick={() => handleShare("email")}
                      className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-800"
                    >
                      <EnvelopeIcon className="w-5 h-5" />
                      <span>Share via email</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const tabs = [
  { id: "posts", label: "Posts" },
  { id: "events", label: "Events" },
  { id: "media", label: "Media" },
  { id: "members", label: "Members" },
  { id: "about", label: "About" },
];

const MemberCard = ({ member, user, followingMap, followLoading, handleFollow, router }) => {
  const supabase = createClientComponentClient();
  const [memberAvatarUrl, setMemberAvatarUrl] = useState(null);

  useEffect(() => {
    if (member.users.avatar_url) {
      const { data: { publicUrl } } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(member.users.avatar_url);
      setMemberAvatarUrl(publicUrl);
    }
  }, [member.users.avatar_url, supabase]);

  return (
    <div className="p-4 flex items-center justify-between hover:bg-gray-800/50">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${member.users.username}`}>
          <div
            className="w-10 h-10 rounded-full bg-gray-700 bg-cover bg-center"
            style={{
              backgroundImage: memberAvatarUrl
                ? `url(${memberAvatarUrl})`
                : `url(/default-avatar.png)`
            }}
          />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${member.users.username}`}
              className="font-semibold hover:underline"
            >
              {member.users.name || member.users.username}
            </Link>
            {member.users.verified && (
              <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
            )}
            {member.role === "moderator" && (
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs">
                Moderator
              </span>
            )}
            {member.role === "admin" && (
              <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs">
                Admin
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400">
            @{member.users.username}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {member.users.id !== user?.id ? (
          <button
            onClick={() => handleFollow(member.users.id)}
            disabled={followLoading[member.users.id]}
            className={`px-4 py-1.5 text-sm font-medium rounded-full ${
              followingMap[member.users.id]
                ? "border border-gray-600 hover:bg-red-500/10 hover:text-red-400 hover:border-red-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {followLoading[member.users.id]
              ? "Loading..."
              : followingMap[member.users.id]
              ? "Following"
              : "Follow"}
          </button>
        ) : (
          <button
            className="px-4 py-1.5 text-sm font-medium rounded-full border border-gray-600"
            onClick={() =>
              router.push(`/profile/${member.users.username}`)
            }
          >
            Profile
          </button>
        )}
      </div>
    </div>
  );
};

// First, create a ModeratorCard component
const ModeratorCard = ({ mod }) => {
  const supabase = createClientComponentClient();
  const [modAvatarUrl, setModAvatarUrl] = useState(null);

  useEffect(() => {
    if (mod.avatar_url) {
      const { data: { publicUrl } } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(mod.avatar_url);
      setModAvatarUrl(publicUrl);
    }
  }, [mod.avatar_url, supabase]);

  return (
    <div className="flex items-center gap-3">
      <Link href={`/profile/${mod.username}`}>
        <div
          className="w-10 h-10 rounded-full bg-gray-700 bg-cover bg-center"
          style={{
            backgroundImage: modAvatarUrl
              ? `url(${modAvatarUrl})`
              : `url(/default-avatar.png)`
          }}
        />
      </Link>
      <div>
        <Link
          href={`/profile/${mod.username}`}
          className="font-semibold hover:underline flex items-center gap-1"
        >
          {mod.username}
          {mod.verified && (
            <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
          )}
        </Link>
        <p className="text-sm text-gray-400">@{mod.username}</p>
      </div>
    </div>
  );
};


