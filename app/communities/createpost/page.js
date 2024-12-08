"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  BoltIcon,
  LanguageIcon,
  LinkIcon,
  PhotoIcon,
  VideoCameraIcon,
  Bars3BottomLeftIcon,
  TableCellsIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  PlusIcon,
  XMarkIcon,
  DocumentTextIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftIcon,
  TrashIcon,
  CalendarIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Update these color classes throughout the file:
const colorUpdates = {
  // Background colors
  "bg-[#1A1A1B]": "bg-gray-900/50",
  "bg-[#272729]": "bg-gray-800",
  "bg-[#2D2D2E]": "bg-gray-700",

  // Border colors
  "border-[#343536]": "border-gray-700",

  // Text colors
  "text-[#D7DADC]": "text-gray-100",
  "text-[#818384]": "text-gray-400",
  "placeholder-[#818384]": "placeholder-gray-400",

  // Focus states
  "focus:border-[#D7DADC]": "focus:border-blue-500",

  // Button colors
  "bg-[#FF4500]": "bg-blue-500",
  "hover:bg-[#FF4500]": "hover:bg-blue-600",
};

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("text");
  const [selectedImages, setSelectedImages] = useState([]);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const [communities, setCommunities] = useState([
    {
      name: "My Profile",
      avatar_url: "https://picsum.photos/200/200?random=0",
      members_count: "Personal Feed",
    },
  ]);
  const [selectedCommunity, setSelectedCommunity] = useState(
    communities[0].name
  );
  const [tags, setTags] = useState([]);
  const [searchCommunity, setSearchCommunity] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]); // For Poll tab
  const [pollDuration, setPollDuration] = useState(1); // Days
  const [imageFiles, setImageFiles] = useState([]); // For Images & Video tab
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]); // For image previews
  const [linkUrl, setLinkUrl] = useState(""); // For Link tab
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [eventImagePreview, setEventImagePreview] = useState("");
  const [streamLink, setStreamLink] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [selectedCommunityIcon, setSelectedCommunityIcon] =
    useState("/reddit-icon.png");

  // Fetch communities on component mount
  useEffect(() => {
    const fetchCommunities = async () => {
      const supabase = createClientComponentClient();
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      // Fetch communities the user has joined
      const { data, error } = await supabase
        .from('community_members')
        .select(`
          role,
          communities (
            id,
            name,
            avatar_url,
            members_count,
            is_verified
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error("Error fetching communities:", error);
        return;
      }

      // Transform the data and combine with "My Profile"
      setCommunities([
        {
          id: "my-profile",
          name: "My Profile",
          avatar_url: "https://picsum.photos/200/200?random=0",
          members_count: "Personal Feed",
        },
        ...data.map(({ communities, role }) => ({
          id: communities.id,
          name: `r/${communities.name}`,
          avatar_url: communities.avatar_url || "/reddit-icon.png",
          members_count: `${communities.members_count.toLocaleString()} members`,
          is_verified: communities.is_verified,
          role: role
        })),
      ]);
    };

    fetchCommunities();
  }, []);

  // Update the filtered communities logic
  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchCommunity.toLowerCase())
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get("edit");

    if (postId) {
      setIsEditing(true);
      setEditingPostId(postId);
      fetchPostData(postId);
    }
  }, []);

  const fetchPostData = async (postId) => {
    const supabase = createClientComponentClient();
    const { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      return;
    }

    // Populate form with existing post data
    setTitle(post.title || "");
    setContent(post.content || "");
    setSelectedTab(post.post_type || "text");
    setSelectedTags(post.tags || []);

    // Set other fields based on post type
    if (post.post_type === "images" && post.image_urls) {
      setImagePreviewUrls(post.image_urls);
    } else if (post.post_type === "link") {
      setLinkUrl(post.link_url || "");
    } else if (post.post_type === "poll") {
      setPollOptions(post.poll_options || ["", ""]);
      // Calculate remaining poll duration
      if (post.poll_end_date) {
        const remainingDays = Math.ceil(
          (new Date(post.poll_end_date) - new Date()) / (1000 * 60 * 60 * 24)
        );
        setPollDuration(Math.max(1, remainingDays));
      }
    } else if (post.post_type === "event") {
      setEventName(post.event_name || "");
      setEventDescription(post.event_description || "");
      setEventImagePreview(post.event_image_url || "");
      setStreamLink(post.event_stream_link || "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const supabase = createClientComponentClient();

    try {
      // Get the current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Upload images to Supabase Storage if there are any
      let uploadedImageUrls = [];
      if (selectedTab === "images" && imageFiles.length > 0) {
        for (const file of imageFiles) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${user.id}/${fileName}`;

          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from("post-images") // Make sure this bucket exists in your Supabase project
              .upload(filePath, file);

          if (uploadError) throw uploadError;

          // Get public URL for the uploaded file
          const {
            data: { publicUrl },
          } = supabase.storage.from("post-images").getPublicUrl(filePath);

          uploadedImageUrls.push(publicUrl);
        }
      }

      // Remove 'r/' prefix from community name for database lookup
      const communityName = selectedCommunity.replace("r/", "");

      // Get the community id from selected community name
      const { data: communityData, error: communityError } = await supabase
        .from("communities")
        .select("id")
        .eq("name", communityName)
        .single();
      if (communityError) throw communityError;

      // Prepare the post data
      const postData = {
        user_id: user.id,
        content: content,
        post_type: selectedTab,
        title: title,
        tags: selectedTags,
        community_id: communityData.id,

        // Optional fields based on post type
        ...(selectedTab === "images" && {
          image_urls: uploadedImageUrls,
        }),

        ...(selectedTab === "link" && {
          link_url: linkUrl,
        }),

        ...(selectedTab === "poll" && {
          poll_options: pollOptions.filter((option) => option.trim() !== ""),
          poll_votes: {},
          poll_end_date: new Date(
            Date.now() + pollDuration * 24 * 60 * 60 * 1000
          ),
        }),

        ...(selectedTab === "event" && {
          event_name: eventName,
          event_description: eventDescription,
          event_image_url: eventImagePreview,
          event_stream_link: streamLink,
        }),
      };

      if (isEditing) {
        // Update existing post
        const { error: updateError } = await supabase
          .from("posts")
          .update(postData)
          .eq("id", editingPostId);

        if (updateError) throw updateError;

        // Redirect back to the post page
        router.push(`/post/${editingPostId}`);
      } else {
        // Create new post
        const { data: post, error: postError } = await supabase
          .from("posts")
          .insert(postData)
          .select()
          .single();

        if (postError) throw postError;

        router.push(`/communities/${communityData.id}`);
      }
    } catch (error) {
      console.error(
        isEditing ? "Error updating post:" : "Error creating post:",
        error
      );
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);

    // Create preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviewUrls.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreviewUrls(newPreviews);
  };

  const addPollOption = () => {
    if (pollOptions.length < 6) {
      // Maximum 6 options
      setPollOptions([...pollOptions, ""]);
    }
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      // Minimum 2 options
      const newOptions = pollOptions.filter((_, i) => i !== index);
      setPollOptions(newOptions);
    }
  };

  const updatePollOption = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleEventImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventImage(file);
      setEventImagePreview(URL.createObjectURL(file));
    }
  };

  // Define tab options with correct icons
  const tabOptions = [
    { name: "Text", icon: ChatBubbleLeftIcon },
    { name: "Images", icon: PhotoIcon },
    { name: "Link", icon: LinkIcon },
    { name: "Poll", icon: ChartBarIcon },

    { name: "Event", icon: CalendarIcon },
  ];

  // Add available tags array
  const availableTags = [
    "General Discussion",
    "News",
    "Announcement",
    "Feedback",
    "Question",
    "Opinion",
    "Debate",
    "Updates",
    "Brainstorming",
    "Resources",
    "Event",
    "Insights",
    "Help",
    "Tips",
  ];

  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community.name);
    setSelectedCommunityIcon(community.avatar_url);
    setIsDropdownOpen(false);
  };

  // Find initial community data when component mounts
  useEffect(() => {
    const initialCommunity = communities.find(
      (c) => c.name === selectedCommunity
    );
    if (initialCommunity) {
      setSelectedCommunityIcon(initialCommunity.avatar_url);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
        <h1 className="text-xl font-bold ">
          {isEditing ? "Edit post" : "Create post"}
        </h1>
      </div>

      {/* Enhanced Community Selector */}
      <div className="relative mb-4">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 w-[320px]"
        >
          <Image
            src={selectedCommunityIcon}
            alt="Community Icon"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="text-gray-100">{selectedCommunity}</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-100 ml-auto" />
        </button>

        {/* Community Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-80 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search communities"
                value={searchCommunity}
                onChange={(e) => setSearchCommunity(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="max-h-80 overflow-y-auto scrollbar-hide">
              {filteredCommunities.map((community) => (
                <button
                  key={community.id}
                  className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors"
                  onClick={() => handleCommunitySelect(community)}
                >
                  <Image
                    src={community.avatar_url}
                    alt={community.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-100 text-sm font-medium">
                        {community.name}
                      </span>
                      {community.is_verified && (
                        <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <span className="text-gray-400 text-xs">
                      {community.members_count}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Create Community Button */}
            <div className="p-2 border-t border-gray-700">
              <Link
                href="/communities/request"
                className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-800 rounded transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <PlusIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-100 text-sm">
                  Request a Community
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Post Type Tabs */}
      <div className="flex border-b border-gray-700 mb-4">
        {tabOptions.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={`px-4 py-2 flex items-center gap-2 ${
              selectedTab === name.toLowerCase()
                ? "border-b-2 border-gray-100 text-gray-100"
                : "text-gray-400 hover:text-gray-100"
            }`}
            onClick={() => setSelectedTab(name.toLowerCase())}
          >
            <Icon className="w-5 h-5" />
            {name}
          </button>
        ))}
      </div>

      <div className="bg-gray-900/50 rounded-md border border-gray-700">
        <form onSubmit={handleSubmit} className="p-4">
          {/* Common Content Field for Text, Images, Link, and Poll tabs */}
          {(selectedTab === "text" || selectedTab === "images" || selectedTab === "link" || selectedTab === "poll") && (
            <div className="mb-4">
              <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={500}
                className="w-full h-48 p-4 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
              />
              <div className="text-xs text-gray-400 text-right mt-1">
                {content.length}/500
              </div>
            </div>
          )}

          {selectedTab === "images" && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-700 rounded-md p-8 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-gray-800 bg-gray-100 px-4 py-2 rounded-full hover:bg-white transition-colors"
                >
                  Upload Images
                </label>
                <p className="text-gray-400 mt-2 pt-2">
                  Or drag and drop files
                </p>
              </div>

              {/* Image/Video Preview Grid */}
              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <TrashIcon className="w-5 h-5 text-blue-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedTab === "link" && (
            <div>
              <input
                type="url"
                placeholder="Url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {selectedTab === "poll" && (
            <div className="space-y-4">
              {pollOptions.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updatePollOption(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  {pollOptions.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removePollOption(index)}
                      className="p-2 text-blue-500 hover:bg-gray-700 rounded-md"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              {pollOptions.length < 6 && (
                <button
                  type="button"
                  onClick={addPollOption}
                  className="flex items-center gap-2 text-gray-100 hover:bg-gray-800 px-4 py-2 rounded-md"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Option
                </button>
              )}

              {/* Poll Duration */}
              <div className="mt-4">
                <label className="block text-gray-100 mb-2">
                  Poll Duration
                </label>
                <select
                  value={pollDuration}
                  onChange={(e) => setPollDuration(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                    <option key={days} value={days}>
                      {days} {days === 1 ? "day" : "days"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {selectedTab === "ama" && (
            <div className="mt-4 space-y-4">
              <textarea
                placeholder="Introduce yourself and the topic of your AMA..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-48 p-4 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
              />
              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-gray-100 font-medium mb-2">
                  AMA Guidelines:
                </h3>
                <ul className="text-gray-400 space-y-2 list-disc list-inside">
                  <li>Verify your identity if possible</li>
                  <li>Be clear about when you'll start answering questions</li>
                  <li>Try to answer questions thoroughly</li>
                  <li>Engage with your audience respectfully</li>
                </ul>
              </div>
            </div>
          )}

          {selectedTab === "event" && (
            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Event Name*"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                required
              />

              <textarea
                placeholder="Event Description*"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="w-full h-48 p-4 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                required
              />

              <div className="border-2 border-dashed border-gray-700 rounded-md p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEventImageUpload}
                  className="hidden"
                  id="event-image-upload"
                />
                <label
                  htmlFor="event-image-upload"
                  className="cursor-pointer text-gray-800 bg-gray-100 px-4 py-2 rounded-full hover:bg-white transition-colors"
                >
                  Upload Event Image
                </label>
                <p className="text-gray-400 mt-2">
                  Recommended size: 1200x800px (Max size: 5MB)
                </p>
              </div>

              {eventImagePreview && (
                <div className="relative group">
                  <img
                    src={eventImagePreview}
                    alt="Event preview"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setEventImage(null);
                      setEventImagePreview("");
                    }}
                    className="absolute top-2 right-2 p-1 bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <TrashIcon className="w-5 h-5 text-blue-500" />
                  </button>
                </div>
              )}

              <input
                type="url"
                placeholder="Live Stream Link (optional)"
                value={streamLink}
                onChange={(e) => setStreamLink(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-4 mt-4">
            {/* Tag selector button */}
            <button
              type="button"
              onClick={() => setShowTagSelector(!showTagSelector)}
              className="flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-gray-800 hover:bg-gray-700 text-gray-100"
            >
              <PlusIcon className="w-4 h-4" />
              {selectedTags.length === 0 ? "Add Tag" : "Change Tag"}
            </button>

            {/* Cancel and Post buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-1 text-gray-100 rounded-full hover:bg-gray-800"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 text-white rounded-full bg-blue-500 hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </div>

          {/* Move tag selector dropdown and selected tags display below the buttons */}
          {showTagSelector && (
            <div className="mt-4 p-4 bg-gray-800 rounded-md">
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTags([tag])}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-gray-100 hover:bg-gray-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-blue-500 text-white flex items-center gap-1"
                >
                  {tag}
                  <XMarkIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() =>
                      setSelectedTags(selectedTags.filter((t) => t !== tag))
                    }
                  />
                </span>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
