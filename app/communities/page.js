"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  PlusCircleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const CommunitySection = ({ title, communities, visibleCount }) => (
  <section className="mb-8">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {communities.slice(0, visibleCount).map((community) => (
        <CommunityCard key={community.id} {...community} />
      ))}
    </div>
  </section>
);

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [communities, setCommunities] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [userMemberships, setUserMemberships] = useState(new Set());

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchCommunities() {
      try {
        // First get communities
        const { data: communitiesData, error: communitiesError } = await supabase
          .from("communities")
          .select("*, slug");

        if (communitiesError) throw communitiesError;

        // Then get member counts for each community
        const communitiesWithCounts = await Promise.all(
          communitiesData.map(async (community) => {
            const { count, error: countError } = await supabase
              .from("community_members")
              .select("*", { count: "exact" })
              .eq("community_id", community.id);

            if (countError) throw countError;

            return {
              ...community,
              members_count: count || 0
            };
          })
        );

        // Sort by member count
        const sortedCommunities = communitiesWithCounts.sort((a, b) => 
          b.members_count - a.members_count
        );

        setCommunities(sortedCommunities || []);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    }

    fetchCommunities();
  }, []);

  useEffect(() => {
    async function fetchUserMemberships() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("community_members")
          .select("community_id")
          .eq("user_id", user.id);

        if (error) throw error;

        setUserMemberships(new Set(data.map((m) => m.community_id)));
      } catch (error) {
        console.error("Error fetching user memberships:", error);
      }
    }

    fetchUserMemberships();
  }, []);

  const filteredCommunities = communities
    .filter(
      (community) =>
        activeCategory === "all" || community.category === activeCategory
    )
    .filter(
      (community) =>
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <main className="">
      <header className="p-4 border-b border-gray-800 backdrop-blur-md bg-black/70 sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold">Browse Communities</h1>
        <div className="relative flex items-center w-80">
          <input
            type="text"
            placeholder="Search Communities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 p-2 rounded-full bg-gray-700 text-gray-200 shadow-md placeholder-gray-400 pl-10"
          />
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 absolute left-3" />
        </div>
      </header>

      <div className="p-3 overflow-hidden">
        {/* Categories */}
        <div
          className="flex gap-1.5 overflow-x-auto pb-3"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#111827 #000000" }}
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 ${
              activeCategory === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-900 text-gray-300 hover:bg-gray-800"
            }`}
          >
            <UsersIcon className="w-5 h-5 border border-white rounded-full p-0.5" />
            All Communities
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800"
              }`}
            >
              <ArrowTrendingUpIcon className="w-5 h-5 border border-white rounded-full p-0.5" />
              {category}
            </button>
          ))}
        </div>

        <div className="pt-3 space-y-6 minimal-scrollbar">
          {filteredCommunities.length > 0 ? (
            <>
              <CommunitySection
                title="All Communities"
                communities={filteredCommunities.map((community) => ({
                  ...community,
                  isMember: userMemberships.has(community.id),
                }))}
                visibleCount={visibleCount}
              />
              {filteredCommunities.length > visibleCount && (
                <button
                  className="mt-4 px-6 py-2 bg-gray-900 hover:bg-gray-800 rounded-xl text-gray-300 font-medium mx-auto block"
                  onClick={handleShowMore}
                >
                  Show More
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">
                No communities found
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery ? (
                  <>
                    No communities found for "{searchQuery}".
                    {activeCategory !== "all" && ` in ${activeCategory}`}
                  </>
                ) : (
                  "No communities available in this category."
                )}
              </p>
              <Link
                href="/communities/request"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-medium"
              >
                <PlusCircleIcon className="w-5 h-5" />
                Request a {searchQuery ? `"${searchQuery}"` : ""} Community
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const CommunityCard = ({
  id,
  slug,
  name,
  description,
  members_count,
  posts_per_day,
  cover_url,
  category,
  is_verified,
  isMember,
}) => (
  <div className="flex items-center justify-between bg-gray-900 p-3 rounded-lg hover:bg-gray-800 transition-all duration-200">
    <Link
      href={`/communities/${slug}`}
      className="flex items-center gap-3 flex-grow cursor-pointer"
    >
      <div
        className="w-10 h-10 rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url(${cover_url})` }}
      />
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{name}</h3>
          {is_verified && (
            <div className="relative group">
              <CheckBadgeIcon className="w-4 h-4 text-blue-500 cursor-pointer" />
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-max bg-black text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Verified Community
              </div>
            </div>
          )}
        </div>
        <p className="text-gray-400 text-sm">
          {members_count?.toLocaleString()} members
        </p>
      </div>
    </Link>
    <Link
      href={`/communities/${slug}`}
      className={`px-4 py-1.5 rounded-full text-sm font-medium ${
        isMember
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-gray-800 hover:bg-gray-700"
      }`}
    >
      {isMember ? "View" : "Join"}
    </Link>
  </div>
);

const categories = [
  "Technology",
  "Social Science",
  "Law",
  "Psychology",
  "Engineering",
  "Physics",
  "Business",
  "Finance",
  "Medicine",
];
