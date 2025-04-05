'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import {
  ChartBarIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);

        // Create tables if they don't exist
        await fetch('/api/admin/create-tables', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Fix reports table if needed
        await fetch('/api/admin/fix-reports-table', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Clean up any duplicate reports
        await fetch('/api/admin/cleanup-duplicate-reports', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check if we have any reports in the database
        const { data, error } = await supabase
          .from('admin_reports')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          // If there's an error, use default reports
          console.error('Error fetching reports:', error);
          setReports([
            {
              id: 1,
              name: "Revenue Report",
              description: "Monthly revenue breakdown by courses and categories",
              last_generated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              frequency: "Monthly",
              status: "Generated",
              type: "Financial",
              icon: "CurrencyDollarIcon"
            },
            {
              id: 2,
              name: "User Activity Report",
              description: "User engagement and activity metrics",
              last_generated: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
              frequency: "Weekly",
              status: "Pending",
              type: "Analytics",
              icon: "UserGroupIcon"
            },
            {
              id: 3,
              name: "Course Performance",
              description: "Course completion rates and student progress",
              last_generated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              frequency: "Weekly",
              status: "Generated",
              type: "Performance",
              icon: "AcademicCapIcon"
            },
          ]);
        } else if (data && data.length > 0) {
          // Use reports from database
          // Remove duplicates by name (keeping the most recent one)
          const uniqueReports = [];
          const reportNames = new Set();

          // Sort by created_at in descending order to keep the most recent
          const sortedData = [...data].sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });

          // Keep only the first occurrence of each report name
          for (const report of sortedData) {
            if (!reportNames.has(report.name)) {
              reportNames.add(report.name);
              uniqueReports.push(report);
            }
          }

          setReports(uniqueReports);
        } else {
          // No reports in database, create default ones
          const defaultReports = [
            {
              name: "Revenue Report",
              description: "Monthly revenue breakdown by courses and categories",
              last_generated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              frequency: "Monthly",
              status: "Generated",
              type: "Financial",
              icon: "CurrencyDollarIcon"
            },
            {
              name: "User Activity Report",
              description: "User engagement and activity metrics",
              last_generated: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
              frequency: "Weekly",
              status: "Pending",
              type: "Analytics",
              icon: "UserGroupIcon"
            },
            {
              name: "Course Performance",
              description: "Course completion rates and student progress",
              last_generated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              frequency: "Weekly",
              status: "Generated",
              type: "Performance",
              icon: "AcademicCapIcon"
            },
          ];

          // Check if reports with these names already exist
          for (const report of defaultReports) {
            const { data: existingReport, error: checkError } = await supabase
              .from('admin_reports')
              .select('id')
              .eq('name', report.name)
              .limit(1);

            if (checkError) {
              console.error('Error checking for existing report:', checkError);
              continue;
            }

            // Only insert if the report doesn't already exist
            if (!existingReport || existingReport.length === 0) {
              const { error: insertError } = await supabase
                .from('admin_reports')
                .insert(report)
                .select();

              if (insertError) {
                console.error('Error inserting report:', insertError);
              }
            }
          }

          // Fetch the reports after insertion
          const { data: newReports, error: fetchError } = await supabase
            .from('admin_reports')
            .select('*')
            .order('created_at', { ascending: false });

          if (fetchError) {
            console.error('Error fetching new reports:', fetchError);
          } else {
            setReports(newReports);
          }
        }
      } catch (err) {
        console.error('Error in fetchReports:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, [supabase]);

  // Helper function to get the appropriate icon
  const getReportIcon = (iconName) => {
    switch (iconName) {
      case 'CurrencyDollarIcon':
        return CurrencyDollarIcon;
      case 'UserGroupIcon':
        return UserGroupIcon;
      case 'AcademicCapIcon':
        return AcademicCapIcon;
      default:
        return DocumentTextIcon;
    }
  };

  const generateReport = async (reportId) => {
    try {
      setLoading(true);

      // First, check if the report_data column exists
      await fetch('/api/admin/fix-reports-table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Simulate report generation (in a real app, this would generate actual report data)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate some mock report data
      const reportData = {
        generatedAt: new Date().toISOString(),
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [12, 19, 3, 5, 2, 3],
          total: 44
        }
      };

      // First, try to directly add the column using SQL
      try {
        await supabase.sql(`
          ALTER TABLE public.admin_reports
          ADD COLUMN IF NOT EXISTS report_data JSONB;
        `);
      } catch (sqlError) {
        console.error('Error adding column directly:', sqlError);
        // Continue anyway, as the column might already exist
      }

      // Try to update with all fields
      try {
        const { error: updateError } = await supabase
          .from('admin_reports')
          .update({
            status: 'Generated',
            last_generated: new Date().toISOString(),
            report_data: reportData
          })
          .eq('id', reportId);

        if (updateError) {
          console.error('First update attempt failed:', updateError);

          // If the error is about the report_data column, try to store it in localStorage
          if (updateError.code === 'PGRST204' && updateError.message.includes('report_data')) {
            // Store the report data in localStorage as a fallback
            try {
              localStorage.setItem(`report_${reportId}`, JSON.stringify(reportData));
            } catch (storageError) {
              console.error('Error storing in localStorage:', storageError);
            }

            // Try without report_data
            const { error: fallbackError } = await supabase
              .from('admin_reports')
              .update({
                status: 'Generated',
                last_generated: new Date().toISOString()
              })
              .eq('id', reportId);

            if (fallbackError) throw fallbackError;
          } else {
            throw updateError;
          }
        }
      } catch (updateError) {
        console.error('Update error:', updateError);
        toast.error(`Error updating report status: ${updateError.message || 'Unknown error'}`);
        setLoading(false);
        return;
      }

      // Fetch updated reports
      const { data: updatedData, error: fetchError } = await supabase
        .from('admin_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching updated reports:', fetchError);
        toast.error('Error fetching updated reports');
        setLoading(false);
        return;
      }

      // Remove duplicates by name (keeping the most recent one)
      const uniqueReports = [];
      const reportNames = new Set();

      // Sort by created_at in descending order to keep the most recent
      const sortedData = [...updatedData].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      // Keep only the first occurrence of each report name
      for (const report of sortedData) {
        if (!reportNames.has(report.name)) {
          reportNames.add(report.name);
          uniqueReports.push(report);
        }
      }

      setReports(uniqueReports);
      toast.success('Report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error(`Failed to generate report: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = (reportId) => {
    try {
      // Find the report
      const report = reports.find(r => r.id === reportId);

      if (!report) {
        toast.error('Report not found');
        return;
      }

      // Check if we have report data in the database
      if (!report.report_data) {
        // Try to get report data from localStorage
        let reportData;
        try {
          const storedData = localStorage.getItem(`report_${reportId}`);
          if (storedData) {
            reportData = JSON.parse(storedData);
            console.log('Found report data in localStorage:', reportData);
          }
        } catch (storageError) {
          console.error('Error retrieving from localStorage:', storageError);
        }

        // If we don't have data in localStorage, create default data
        if (!reportData) {
          reportData = {
            generatedAt: new Date().toISOString(),
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              values: [5, 10, 15, 20, 25, 30],
              total: 105
            }
          };
        }

        // In a real app, you would generate a PDF or CSV file here
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        // Create a download link and click it
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', dataUri);
        downloadLink.setAttribute('download', `${report.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        toast.success('Report download started');
        return;
      }

      // In a real app, you would generate a PDF or CSV file here
      // For now, we'll just create a JSON file
      const dataStr = JSON.stringify(report.report_data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

      // Create a download link and click it
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', dataUri);
      downloadLink.setAttribute('download', `${report.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      toast.success('Report download started');
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error(`Failed to download report: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Reports</h1>
              <p className="mt-2 text-blue-100">
                Generate and manage system reports
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                onClick={() => toast.success('Custom report builder coming soon!')}
              >
                <ChartBarIcon className="w-5 h-5 mr-2" />
                Create Custom Report
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
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {reports.map((report) => {
              const ReportIcon = getReportIcon(report.icon);
              return (
                <div
                  key={report.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <div className={`
                        p-3 rounded-lg mr-4
                        ${report.type === 'Financial' ? 'bg-green-100 text-green-700' : ''}
                        ${report.type === 'Analytics' ? 'bg-blue-100 text-blue-700' : ''}
                        ${report.type === 'Performance' ? 'bg-purple-100 text-purple-700' : ''}
                      `}>
                        <ReportIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                        <div className="mt-4 flex items-center space-x-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            Last generated: {report.last_generated ? new Date(report.last_generated).toLocaleString() : 'Never'}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <ArrowPathIcon className="h-4 w-4 mr-1" />
                            Frequency: {report.frequency}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${report.status === 'Generated' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => generateReport(report.id)}
                      disabled={loading}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChartBarIcon className="h-4 w-4 mr-1" />
                      Generate
                    </button>
                    {report.status === 'Generated' && (
                      <button
                        onClick={() => downloadReport(report.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
