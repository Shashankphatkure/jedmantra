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
  BellIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Courses", href: "/student/", icon: AcademicCapIcon },
  { name: "Applications", href: "/student/applications", icon: BriefcaseIcon },
  { name: "Progress", href: "/student/progress", icon: ChartBarIcon },
  { name: "Certificates", href: "/student/certificates", icon: AcademicCapIcon },
  { name: "Settings", href: "/student/settings", icon: Cog6ToothIcon },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navigation Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex h-16 items-center justify-center">
            {/* Navigation Links */}
            <div className="hidden sm:flex sm:items-center space-x-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "text-white bg-indigo-700"
                        : "text-indigo-100 hover:text-white hover:bg-indigo-700"
                    }`}
                  >
                    <item.icon
                      className={`mr-2 h-5 w-5 ${
                        isActive ? "text-white" : "text-indigo-200"
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="sm:hidden bg-white shadow-lg">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? "text-indigo-600" : "text-gray-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Page Content */}
      <main className="">
        {children}
      </main>
    </div>
  );
}