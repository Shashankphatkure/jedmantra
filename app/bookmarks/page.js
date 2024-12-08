"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  BookmarkIcon,
  FolderIcon,
  PlusIcon,
  LinkIcon,
  DocumentIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowPathRoundedSquareIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  CheckBadgeIcon,
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

export default function BookmarksPage() {
  const supabase = createClientComponentClient();
  const [bookmarks, setBookmarks] = useState([]);
  const [activeCollection, setActiveCollection] = useState("all");
  const [activeTab, setActiveTab] = useState("posts");
  const [showNewCollectionInput, setShowNewCollectionInput] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  useEffect(() => {
    const fetchBookmarks = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("bookmarks")
        .select(
          `
          *,
          posts (
            id,
            content,
            image_url,
            image_urls,
            likes_count,
            comments_count,
            reposts_count,
            created_at,
            post_type,
            link_url,
            poll_options,
            poll_votes,
            poll_end_date,
            event_name,
            event_description,
            event_stream_link,
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
            )
          )
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching bookmarks:", error);
        return;
      }

      // Transform the data to match your existing format
      const transformedBookmarks = data.map((bookmark) => ({
        id: bookmark.id,
        type: bookmark.type,
        collection: bookmark.collection_name,
        timestamp: new Date(bookmark.created_at).toLocaleDateString(),
        content: {
          postId: bookmark.posts.id, // Add the actual post ID
          author: {
            name: bookmark.posts.users.name,
            username: bookmark.posts.users.username,
            verified: bookmark.posts.users.verified,
            avatar: bookmark.posts.users.avatar_url,
          },
          community: {
            id: bookmark.posts.community_id,
            name: bookmark.posts.communities.name
          },
          text: bookmark.posts.content,
          image: bookmark.posts.image_url,
          images: bookmark.posts.image_urls,
          likes: bookmark.posts.likes_count || 0,
          comments: bookmark.posts.comments_count || 0,
          reposts: bookmark.posts.reposts_count || 0,
          postType: bookmark.posts.post_type,
          linkUrl: bookmark.posts.link_url,
          pollOptions: bookmark.posts.poll_options,
          pollVotes: bookmark.posts.poll_votes,
          pollEndDate: bookmark.posts.poll_end_date,
          eventName: bookmark.posts.event_name,
          eventDescription: bookmark.posts.event_description,
          eventStreamLink: bookmark.posts.event_stream_link,
          tags: bookmark.posts.tags
        },
      }));

      setBookmarks(transformedBookmarks);
    };

    fetchBookmarks();
  }, [supabase]);

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      // Add new collection logic here
      setShowNewCollectionInput(false);
      setNewCollectionName("");
    }
  };

  const filteredBookmarks =
    activeCollection === "all"
      ? bookmarks
      : bookmarks.filter((item) => item.collection === activeCollection);

  return (
    <main className="flex-1">
      <header className="p-4 border-b border-gray-800 backdrop-blur-md bg-black/70 sticky top-0 z-10">
        <h1 className="text-xl font-bold">Bookmarks</h1>
      </header>

      {/* Bookmarked Content */}
      <div className="flex-1">
        {/* Tabs */}
        <div className="flex gap-1.5 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "posts" && (
            <div className="space-y-4">
              {filteredBookmarks
                .filter((item) => item.type === "post")
                .map((bookmark) => (
                  <BookmarkedPost
                    key={bookmark.id}
                    id={bookmark.content.postId}
                    content={bookmark.content}
                    timestamp={bookmark.timestamp}
                  />
                ))}
            </div>
          )}
          {activeTab === "media" && (
            <div className="grid grid-cols-3 gap-4">
              {filteredBookmarks
                .filter((item) => item.type === "post" && item.content.image)
                .map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="aspect-square rounded-xl overflow-hidden"
                  >
                    <img
                      src={bookmark.content.image}
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
            </div>
          )}
          {activeTab === "links" && (
            <div className="space-y-4">
              {filteredBookmarks
                .filter((item) => item.type === "link")
                .map((bookmark) => (
                  <BookmarkedLink key={bookmark.id} {...bookmark} />
                ))}
            </div>
          )}
          {activeTab === "documents" && (
            <div className="space-y-4">
              {filteredBookmarks
                .filter((item) => item.type === "document")
                .map((bookmark) => (
                  <BookmarkedDocument key={bookmark.id} {...bookmark} />
                ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const BookmarkedPost = ({ content, timestamp, id }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(content.likes || 0);
  const [isReposted, setIsReposted] = useState(false);
  const [repostCount, setRepostCount] = useState(content.reposts || 0);
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (content.author.avatar) {
      const { data: { publicUrl } } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(content.author.avatar);
      setAvatarUrl(publicUrl);
    }
  }, [content.author.avatar, supabase]);

  const handlePostClick = () => {
    if (content.postId) {
      // Use the actual post ID from the database
      router.push(`/post/${content.postId}`);
    }
  };

  const handleBookmark = async (e) => {
    e.stopPropagation();
    const {
      data: { user },
    } = await supabase.auth.getUser();
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleRepost = () => {
    setIsReposted(!isReposted);
    setRepostCount((prev) => (isReposted ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Post by ${content.author.name}`,
        text: content.text,
        url: window.location.href,
      });
    } catch (err) {
      console.log("Share failed:", err);
    }
  };

  const handleVote = async (optionIndex) => {
    console.log("Voted for option:", optionIndex);
  };

  const calculatePollResults = () => {
    if (!content.pollVotes) return {};
    const totalVotes = Object.values(content.pollVotes).reduce((a, b) => a + b, 0);
    return Object.entries(content.pollVotes).reduce((acc, [key, votes]) => {
      acc[key] = (votes / totalVotes) * 100;
      return acc;
    }, {});
  };

  return (
    <article
      className="p-4 hover:bg-gray-900/50 transition-colors cursor-pointer"
      onClick={handlePostClick}
    >
      <div className="flex gap-4">
        <Link
          href={`/profile/${content.author.username}`}
          className="flex-shrink-0"
        >
          <div
            className="w-12 h-12 rounded-full bg-gray-700 hover:opacity-80 bg-cover bg-center"
            style={{ 
              backgroundImage: avatarUrl 
                ? `url(${avatarUrl})` 
                : `url(/default-avatar.png)`
            }}
          />
        </Link>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${content.author.username}`}
              className="font-bold hover:underline"
            >
              {content.author.name}
            </Link>
            {content.author.verified && (
              <CheckBadgeIcon className="w-4 h-4 text-yellow-500" />
            )}
            <span className="text-gray-500">·</span>
            {content.community && (
              <>
                <Link
                  href={`/communities/${content.community.id}`}
                  className="text-gray-500 hover:underline"
                >
                  {content.community.name}
                </Link>
                <span className="text-gray-500">·</span>
              </>
            )}
            <span className="text-gray-500">{timestamp}</span>
          </div>

          {content.postType === "event" && (
            <div className="mt-4 border border-gray-800 rounded-xl p-4">
              <h2 className="text-xl font-bold">{content.eventName}</h2>
              <p className="mt-2 text-gray-400">{content.eventDescription}</p>
              {content.eventStreamLink && (
                <a
                  href={content.eventStreamLink}
                  className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Stream
                </a>
              )}
            </div>
          )}

          {content.postType === "poll" && content.pollOptions && (
            <div className="mt-4">
              {content.pollOptions.map((option, index) => {
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
              {content.pollEndDate && (
                <p className="mt-2 text-sm text-gray-500">
                  Poll ends {formatDistanceToNow(new Date(content.pollEndDate), { addSuffix: true })}
                </p>
              )}
            </div>
          )}

          <div className="mt-2 text-white whitespace-pre-wrap">
            {content.text}
          </div>

          {content.images && content.images.length > 0 && (
            <div
              className={`grid gap-2 mt-3 ${
                content.images.length === 1
                  ? "grid-cols-1"
                  : content.images.length === 2
                  ? "grid-cols-2"
                  : content.images.length === 3
                  ? "grid-cols-2"
                  : "grid-cols-2"
              }`}
            >
              {content.images.map((image, index) => (
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

          {content.image && !content.images && (
            <div className="mt-3">
              <div className="relative pt-[56.25%] bg-gray-800 rounded-xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-center bg-cover transform transition-transform group-hover:scale-105"
                  style={{ backgroundImage: `url(${content.image})` }}
                />
              </div>
            </div>
          )}

          {content.tags && content.tags.length > 0 && (
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-100">
                {content.tags}
              </span>
            </div>
          )}

          {content.postType === "link" && content.linkUrl && (
            <a
              href={content.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block border border-gray-800 rounded-xl p-4 hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-blue-400">
                <span className="truncate">{content.linkUrl}</span>
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

          <div className="flex justify-between mt-4 text-gray-500 max-w-md">
            <button
              onClick={handleLike}
              className={`group flex items-center gap-2 ${
                isLiked ? "text-purple-400" : "hover:text-purple-400"
              }`}
              title="Like this post"
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
              title="Comment on this post"
            >
              <span className="p-2 rounded-full group-hover:bg-blue-400/10">
                <ChatBubbleLeftIcon className="w-5 h-5" />
              </span>
              <span>{content.comments.toLocaleString()}</span>
            </Link>
            <button
              onClick={handleRepost}
              className={`group flex items-center gap-2 ${
                isReposted ? "text-green-400" : "hover:text-green-400"
              }`}
              title="Repost this post"
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
              title="Bookmark this post"
            >
              <span className="p-2 rounded-full group-hover:bg-blue-400/10">
                {isBookmarked ? (
                  <BookmarkIconSolid className="w-5 h-5" />
                ) : (
                  <BookmarkIcon className="w-5 h-5" />
                )}
              </span>
            </button>
            <button
              onClick={handleShare}
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
  );
};

const BookmarkedLink = ({ content, timestamp }) => (
  <a
    href={content.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-colors"
  >
    <div className="flex gap-4">
      {content.image && (
        <div className="w-24 h-24 rounded-xl bg-gray-800 overflow-hidden flex-shrink-0">
          <img
            src={content.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div>
        <h3 className="font-bold text-blue-400 hover:underline">
          {content.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">{content.description}</p>
        <div className="text-gray-500 text-sm mt-2">
          {content.domain} · {timestamp}
        </div>
      </div>
    </div>
  </a>
);

const BookmarkedDocument = ({ content, timestamp }) => (
  <div className="block bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-colors">
    <h3 className="font-bold text-blue-400 hover:underline">{content.title}</h3>
    <p className="text-gray-400 text-sm mt-1">{content.description}</p>
    <div className="text-gray-500 text-sm mt-2">
      {content.domain} · {timestamp}
    </div>
  </div>
);

const tabs = [
  { id: "posts", label: "Posts", icon: <NewspaperIcon className="w-5 h-5" /> },
  { id: "media", label: "Media", icon: <FolderIcon className="w-5 h-5" /> },
  { id: "links", label: "Links", icon: <LinkIcon className="w-5 h-5" /> },
  {
    id: "documents",
    label: "Documents",
    icon: <DocumentIcon className="w-5 h-5" />,
  },
];

const collections = [
  { id: "read-later", name: "Read Later" },
  { id: "favorites", name: "Favorites" },
  { id: "tech", name: "Tech Articles" },
  { id: "inspiration", name: "Inspiration" },
];
