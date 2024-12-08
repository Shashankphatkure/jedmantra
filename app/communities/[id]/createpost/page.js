"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChatBubbleLeftIcon,
  PhotoIcon,
  LinkIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  PlusIcon,
  XMarkIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export default function CreatePost({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("text");
  const [selectedImages, setSelectedImages] = useState([]);
  const [url, setUrl] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState(1);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [linkUrl, setLinkUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      communityId: id,
      title,
      content:
        selectedTab === "text" ? content : selectedTab === "link" ? url : "",
      images: selectedImages,
      type: selectedTab,
      pollOptions: selectedTab === "poll" ? pollOptions : undefined,
      pollDuration: selectedTab === "poll" ? pollDuration : undefined,
    };

    console.log("Submitting post:", postData);
    // TODO: Add API call

    router.push(`/communities/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <Link
          href={`/communities/${id}`}
          className="text-gray-400 hover:text-white flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Community
        </Link>
      </div>

      {/* Rest of your JSX */}
      {/* ... */}
    </div>
  );
}
