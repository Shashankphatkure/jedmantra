"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  InformationCircleIcon,
  PhotoIcon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  ArrowLeftIcon,
  UsersIcon,
  ShieldCheckIcon,
  BellIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function RequestCommunity() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    topic: "",
    benefits: "",
    targetAudience: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get the current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      // Insert the community request
      const { data, error } = await supabase.from("community_requests").insert([
        {
          name: formData.name,
          description: formData.description,
          topic: formData.topic,
          benefits: formData.benefits,
          target_audience: formData.targetAudience,
          user_id: user.id,
          status: "pending", // Default status
        },
      ]);

      if (error) throw error;

      // Redirect to communities page with success message
      router.push("/communities?message=Request submitted successfully");
    } catch (error) {
      console.error("Error submitting community request:", error);
      alert("Failed to submit community request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header */}

      <header className="p-4 border-b border-gray-800 backdrop-blur-md bg-black/70 sticky top-0 z-10 flex items-center justify-between">
        <h1 className="text-xl font-bold">Request a Community.</h1>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-gray-400 hover:text-white"
        >
          Cancel
        </button>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">Community Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Community Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Community Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Provide a unique and meaningful name"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Description About the Community
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Write a detailed description outlining the purpose, focus, and goals of the community"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg h-32 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Community Topic */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Community Topic
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  placeholder="specify the primary topic or category your community will belong to"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
                {/* <option value="">Select primary topic</option>
                  <option value="technology">Technology</option>
                  <option value="education">Education</option>
                  <option value="career">Career Development</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="entrepreneurship">Entrepreneurship</option>
                  <option value="personal-growth">Personal Growth</option>
                  <option value="other">Other</option>
                </select> */}
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  How Will This Community Help?
                </label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) =>
                    setFormData({ ...formData, benefits: e.target.value })
                  }
                  placeholder="Explain how this community will benefit its members or the broader audience"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg h-32 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Target Audience
                </label>
                <textarea
                  value={formData.targetAudience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      targetAudience: e.target.value,
                    })
                  }
                  placeholder="Identify the group of people the community is intended for"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg h-24 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
