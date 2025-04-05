import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if admin_reports table exists
    const { data: tableInfo, error: tableError } = await supabase
      .from('admin_reports')
      .select('id')
      .limit(1);

    if (tableError && tableError.code === '42P01') {
      return NextResponse.json({ error: 'Reports table does not exist' }, { status: 404 });
    }

    // Get all reports
    const { data: allReports, error: fetchError } = await supabase
      .from('admin_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
    }

    // Group reports by name
    const reportsByName = {};
    for (const report of allReports) {
      if (!reportsByName[report.name]) {
        reportsByName[report.name] = [];
      }
      reportsByName[report.name].push(report);
    }

    // For each group, keep the most recent and delete the rest
    let deletedCount = 0;
    const keepIds = [];
    const deleteIds = [];

    for (const name in reportsByName) {
      const reports = reportsByName[name];

      // Sort by created_at in descending order
      reports.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      // Keep the first one (most recent)
      keepIds.push(reports[0].id);

      // Mark the rest for deletion
      for (let i = 1; i < reports.length; i++) {
        deleteIds.push(reports[i].id);
      }
    }

    // Delete duplicate reports
    if (deleteIds.length > 0) {
      const { error: deleteError } = await supabase
        .from('admin_reports')
        .delete()
        .in('id', deleteIds);

      if (deleteError) {
        return NextResponse.json({
          error: 'Failed to delete duplicate reports',
          details: deleteError.message
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      message: 'Duplicate reports cleaned up successfully',
      deleted: deleteIds.length,
      kept: keepIds.length
    });

  } catch (error) {
    console.error('Error cleaning up duplicate reports:', error);
    return NextResponse.json({
      error: 'Failed to clean up duplicate reports',
      details: error.message
    }, { status: 500 });
  }
}
