'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, PlayCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function CourseContent({ courseSections, courseId, isEnrolled }) {
  const [expandedSections, setExpandedSections] = useState(new Set());
  const supabase = createClientComponentClient();

  const toggleSection = (sectionIndex) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionIndex)) {
      newExpanded.delete(sectionIndex);
    } else {
      newExpanded.add(sectionIndex);
    }
    setExpandedSections(newExpanded);
  };

  const handleLectureClick = async (sectionIndex, lectureIndex) => {
    if (!isEnrolled) {
      alert('Please enroll in the course to access this content');
      return;
    }

    // Here you would typically navigate to the lecture content
    // router.push(`/courses/${courseId}/learn/${sectionIndex}/${lectureIndex}`);
  };

  return (
    <div className="space-y-4">
      {courseSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection(sectionIndex)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                {sectionIndex + 1}
              </span>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {section.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {section.lectures} lectures • {section.duration}
                </p>
              </div>
            </div>
            {expandedSections.has(sectionIndex) ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {expandedSections.has(sectionIndex) && (
            <div className="px-5 pb-4 border-t border-gray-100">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => handleLectureClick(sectionIndex, itemIndex)}
                  className="w-full flex items-center py-3 hover:bg-gray-50 rounded-lg px-3"
                >
                  {isEnrolled ? (
                    <PlayCircleIcon className="h-5 w-5 text-gray-400 mr-3" />
                  ) : (
                    <LockClosedIcon className="h-5 w-5 text-gray-400 mr-3" />
                  )}
                  <span className="text-sm text-gray-600 text-left">
                    {itemIndex + 1}. {item}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 