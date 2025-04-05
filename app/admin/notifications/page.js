'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import {
  BellIcon,
  BellSlashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [availableTypes, setAvailableTypes] = useState(['course', 'issue', 'payment']);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchNotifications() {
      try {
        setLoading(true);

        // Create tables if they don't exist
        await fetch('/api/admin/create-tables', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check if we have any notifications in the database
        const { data, error } = await supabase
          .from('admin_notifications')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          // If there's an error, use default notifications
          console.error('Error fetching notifications:', error);
          const defaultNotifications = [
            {
              id: 1,
              title: "New Course Published",
              message: "React Fundamentals course has been published by Mike Chen",
              type: "course",
              status: "unread",
              created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              avatar_url: "https://via.placeholder.com/40",
            },
            {
              id: 2,
              title: "User Report",
              message: "Multiple users reported issues with video playback",
              type: "issue",
              status: "read",
              created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
              avatar_url: "https://via.placeholder.com/40",
            },
            {
              id: 3,
              title: "Payment Failed",
              message: "Payment processing failed for subscription renewal",
              type: "payment",
              status: "unread",
              created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
              avatar_url: "https://via.placeholder.com/40",
            },
          ];
          setNotifications(defaultNotifications);
        } else if (data && data.length > 0) {
          // Use notifications from database
          setNotifications(data);

          // Extract available types
          const types = [...new Set(data.map(notification => notification.type))];
          setAvailableTypes(types);
        } else {
          // No notifications in database, create default ones
          const defaultNotifications = [
            {
              title: "New Course Published",
              message: "React Fundamentals course has been published by Mike Chen",
              type: "course",
              status: "unread",
              avatar_url: "https://via.placeholder.com/40",
            },
            {
              title: "User Report",
              message: "Multiple users reported issues with video playback",
              type: "issue",
              status: "read",
              avatar_url: "https://via.placeholder.com/40",
            },
            {
              title: "Payment Failed",
              message: "Payment processing failed for subscription renewal",
              type: "payment",
              status: "unread",
              avatar_url: "https://via.placeholder.com/40",
            },
          ];

          // Insert default notifications into database
          for (const notification of defaultNotifications) {
            const { error: insertError } = await supabase
              .from('admin_notifications')
              .insert(notification);

            if (insertError) {
              console.error('Error inserting notification:', insertError);
            }
          }

          // Fetch the newly inserted notifications
          const { data: newNotifications, error: fetchError } = await supabase
            .from('admin_notifications')
            .select('*')
            .order('created_at', { ascending: false });

          if (fetchError) {
            console.error('Error fetching new notifications:', fetchError);
          } else {
            setNotifications(newNotifications);
          }
        }
      } catch (err) {
        console.error('Error in fetchNotifications:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [supabase]);

  useEffect(() => {
    // Filter notifications based on search term and filters
    const filtered = notifications.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === 'All Types' ||
                         notification.type.toLowerCase() === typeFilter.toLowerCase();

      const matchesStatus = statusFilter === 'All Status' ||
                           notification.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesType && matchesStatus;
    });

    setFilteredNotifications(filtered);
  }, [notifications, searchTerm, typeFilter, statusFilter]);

  const markAsRead = async (id) => {
    try {
      // Update notification in database
      const { error } = await supabase
        .from('admin_notifications')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id ? { ...notification, status: 'read' } : notification
        )
      );

      toast.success('Notification marked as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark notification as read');
    }
  };

  const deleteNotification = async (id) => {
    try {
      // Delete notification from database
      const { error } = await supabase
        .from('admin_notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setNotifications(prev => prev.filter(notification => notification.id !== id));

      toast.success('Notification deleted');
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('Failed to delete notification');
    }
  };

  const markAllAsRead = async () => {
    try {
      // Update all notifications in database
      const { error } = await supabase
        .from('admin_notifications')
        .update({ status: 'read' })
        .eq('status', 'unread');

      if (error) throw error;

      // Update local state
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, status: 'read' }))
      );

      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to mark all notifications as read');
    }
  };

  // Helper function to format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
      return 'Just now';
    } else if (diffMin < 60) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else if (diffHour < 24) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffDay < 7) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Notifications</h1>
              <p className="mt-2 text-blue-100">
                Manage and monitor all system notifications
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Mark All as Read
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>All Types</option>
              {availableTypes.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>All Status</option>
              <option>read</option>
              <option>unread</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <BellSlashIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || typeFilter !== 'All Types' || statusFilter !== 'All Status' ?
                  'Try adjusting your filters' : 'You don\'t have any notifications at the moment.'}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 ${
                    notification.status === "unread" ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          className="h-10 w-10 rounded-full"
                          src={notification.avatar_url || "https://via.placeholder.com/40"}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h2 className="text-sm font-medium text-gray-900">
                            {notification.title}
                            {notification.status === "unread" && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                          </h2>
                          <span
                            className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              notification.type === "course"
                                ? "bg-green-100 text-green-800"
                                : notification.type === "issue"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {notification.type}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {notification.created_at ? formatTime(notification.created_at) : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {notification.status === "unread" && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Mark as read"
                        >
                          <CheckCircleIcon className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete notification"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">45</span> notifications
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Notification Settings
            </h2>
            <div className="mt-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email_notifications"
                      name="email_notifications"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="email_notifications"
                      className="font-medium text-gray-700"
                    >
                      Email Notifications
                    </label>
                    <p className="text-sm text-gray-500">
                      Receive email notifications for important updates and
                      alerts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="browser_notifications"
                      name="browser_notifications"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="browser_notifications"
                      className="font-medium text-gray-700"
                    >
                      Browser Notifications
                    </label>
                    <p className="text-sm text-gray-500">
                      Show browser notifications when new events occur.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="notification_sound"
                      name="notification_sound"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="notification_sound"
                      className="font-medium text-gray-700"
                    >
                      Notification Sound
                    </label>
                    <p className="text-sm text-gray-500">
                      Play a sound when new notifications arrive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
