'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "../utils/supabase";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Settings", href: "/instructor/settings", icon: Cog6ToothIcon },
];

export default function InstructorLayout({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      setIsLoading(true);
      const supabase = createClient();
      
      const { data: { user: authUser }, error } = await supabase.auth.getUser();
      
      if (error || !authUser) {
        // Redirect to login if not authenticated
        window.location.href = '/login?redirect=/instructor';
        return;
      }
      
      setUser(authUser);
      setIsLoading(false);
    }
    
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading instructor dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Content */}
      <main className="">
        {children}
      </main>
    </div>
  );
}