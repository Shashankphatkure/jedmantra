
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
  UserIcon
} from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll lock
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
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </header>
  );
}
