'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminMiddleware from './middleware';
import {
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <AdminMiddleware>
    <div className="min-h-screen bg-gray-100">

      {/* Page Content */}
      <main className="">
        {children}
      </main>
    </div>
    </AdminMiddleware>
  );
}