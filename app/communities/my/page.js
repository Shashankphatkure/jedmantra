"use client";

import Link from "next/link";
import {
  UsersIcon,
  PlusCircleIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function MyCommunitiesPage() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchMyCommunities() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("community_members")
          .select(
            `
            role,
            communities (
              id,
              name,
              description,
              cover_url,
              is_verified,
              slug
            )
          `
          )
          .eq("user_id", user.id);

        if (error) throw error;

        // Get member counts for each community
        const communitiesWithCounts = await Promise.all(
          data.map(async (item) => {
            const { count: membersCount } = await supabase
              .from("community_members")
              .select("*", { count: "exact" })
              .eq("community_id", item.communities.id);

            return {
              id: item.communities.id,
              slug: item.communities.slug,
              name: item.communities.name,
              description: item.communities.description,
              members: membersCount,
              role: item.role,
              coverImage:
                item.communities.cover_url ||
                "https://picsum.photos/800/400?random=1",
              isVerified: item.communities.is_verified,
            };
          })
        );

        setCommunities(communitiesWithCounts);
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMyCommunities();
  }, [supabase]);

  return (
    <main className="">
      {/* Header */}
      <header className="p-4 border-b border-gray-800 backdrop-blur-md bg-black/70 sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold">My Communities</h1>
        <Link
          href="/communities/request"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-sm font-medium transition-colors"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Request a Community
        </Link>
      </header>

      <div className="p-3 overflow-hidden">
        {/* Communities Grid */}
        <div className="pt-3 space-y-6 minimal-scrollbar">
          {loading ? (
            // Loading state
            <div className="text-center py-8 text-gray-400">
              Loading communities...
            </div>
          ) : communities.length === 0 ? (
            // Empty state
            <div className="text-center py-8 text-gray-400">
              <p>You haven't joined any communities yet.</p>
              <Link
                href="/communities/explore"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Explore communities
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((community) => (
                <div
                  key={community.id}
                  className="flex items-center justify-between bg-gray-900 p-3 rounded-lg hover:bg-gray-800 transition-all duration-200"
                >
                  <Link
                    href={`/communities/${community.slug}`}
                    className="flex items-center gap-3 flex-grow cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${community.coverImage})`,
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{community.name}</h3>
                        {community.isVerified && (
                          <div className="relative group">
                            <CheckBadgeIcon className="w-4 h-4 text-blue-500 cursor-pointer" />
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-max bg-black text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              Verified Community
                            </div>
                          </div>
                        )}
                        {community.role === "moderator" && (
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs">
                            Moderator
                          </span>
                        )}
                        {community.role === "admin" && (
                          <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">
                        {community.members?.toLocaleString()} members
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={`/communities/${community.slug}`}
                    className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm font-medium"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
