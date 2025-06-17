
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  LightBulbIcon,
  UserIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from './AuthProvider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, profile, loading, isAuthenticated } = useAuth();
  const supabase = createClientComponentClient();

  // Handle scroll lock and click outside
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    if (profile?.first_name && profile?.last_name) return `${profile.first_name} ${profile.last_name}`;
    if (profile?.first_name) return profile.first_name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getUserAvatar = () => {
    if (profile?.avatar_url) return profile.avatar_url;
    return null;
  };

  const navigation = [
    { name: 'HOME', href: '/', icon: HomeIcon },
    { name: 'COURSES', href: '/courses', icon: AcademicCapIcon },
    { name: 'PRICING', href: '/pricing', icon: CurrencyDollarIcon },
    { name: 'JOBS', href: '/jobs', icon: BriefcaseIcon },
    { name: 'COMPANIES', href: '/companies', icon: BuildingOfficeIcon },
    { name: 'CAREER ADVICE', href: '/career-advice', icon: LightBulbIcon },
  ];

  return (
    <header className="bg-white py-3 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo.png"
              alt="JedMantra"
              width={150}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-[#2563eb] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {!loading && (
              <>
                {isAuthenticated ? (
                  <div className="hidden md:flex items-center space-x-3">
                    <div className="relative user-menu">
                      <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {getUserAvatar() ? (
                            <Image
                              src={getUserAvatar()}
                              alt="Profile"
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {getUserDisplayName()}
                        </span>
                        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                      </button>

                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                          <div className="py-1">
                            <Link
                              href="/profile"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <UserIcon className="w-4 h-4 mr-3" />
                              Profile
                            </Link>
                            <Link
                              href="/settings"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Cog6ToothIcon className="w-4 h-4 mr-3" />
                              Settings
                            </Link>
                            <button
                              onClick={handleSignOut}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center space-x-3">
                    <Link 
                      href="/login"
                      className="px-6 py-2 text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                    >
                      LOGIN
                    </Link>
                    <Link 
                      href="/signup"
                      className="px-6 py-2 text-sm font-bold text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] transition-colors"
                    >
                      SIGN UP
                    </Link>
                  </div>
                )}
              </>
            )}
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Bars3Icon className="h-6 w-6 text-gray-600" />
            </button>

            {/* Mobile menu */}
            <div 
              className={`fixed inset-y-0 right-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-lg transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex flex-col h-full p-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
                <nav className="flex-1 space-y-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-sm font-bold text-gray-600 hover:text-[#2563eb] transition-colors rounded-lg hover:bg-gray-50"
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="pt-6 space-y-3 border-t">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {getUserAvatar() ? (
                            <Image
                              src={getUserAvatar()}
                              alt="Profile"
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon className="w-6 h-6 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                          <p className="text-xs text-gray-600">{user?.email}</p>
                        </div>
                      </div>
                      <Link 
                        href="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center w-full px-6 py-3 text-sm font-bold text-[#2563eb] border-2 border-[#2563eb] rounded-lg hover:bg-[#2563eb] hover:text-white transition-colors"
                      >
                        <UserIcon className="w-4 h-4 mr-2" />
                        PROFILE
                      </Link>
                      <Link 
                        href="/settings"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center w-full px-6 py-3 text-sm font-bold text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Cog6ToothIcon className="w-4 h-4 mr-2" />
                        SETTINGS
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center justify-center w-full px-6 py-3 text-sm font-bold text-red-600 border-2 border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                        SIGN OUT
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center w-full px-6 py-3 text-sm font-bold text-[#2563eb] border-2 border-[#2563eb] rounded-lg hover:bg-[#2563eb] hover:text-white transition-colors"
                      >
                        LOGIN
                      </Link>
                      <Link 
                        href="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center w-full px-6 py-3 text-sm font-bold text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] transition-colors"
                      >
                        SIGN UP
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </header>
  );
}
