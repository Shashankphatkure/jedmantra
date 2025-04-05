import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// SQL to add report_data column if it doesn't exist
const ADD_REPORT_DATA_COLUMN_SQL = `
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'admin_reports'
    AND column_name = 'report_data'
  ) THEN
    ALTER TABLE public.admin_reports ADD COLUMN report_data JSONB;
  END IF;
END $$;
`;

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
      // Table doesn't exist, create it
      await supabase.rpc('create_admin_reports_table');

      // Insert default reports
      const defaultReports = [
        {
          name: "Revenue Report",
          description: "Monthly revenue breakdown by courses and categories",
          frequency: "Monthly",
          status: "Pending",
          type: "Financial",
          icon: "CurrencyDollarIcon",
          created_by: user.id
        },
        {
          name: "User Activity Report",
          description: "User engagement and activity metrics",
          frequency: "Weekly",
          status: "Pending",
          type: "Analytics",
          icon: "UserGroupIcon",
          created_by: user.id
        },
        {
          name: "Course Performance",
          description: "Course completion rates and student progress",
          frequency: "Weekly",
          status: "Pending",
          type: "Performance",
          icon: "AcademicCapIcon",
          created_by: user.id
        }
      ];

      // Insert default reports, but only once
      for (const report of defaultReports) {
        // Check if a report with this name already exists
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
          await supabase.from('admin_reports').insert(report);
        }
      }

      return NextResponse.json({ message: 'Table created and populated' });
    }

    // Directly execute SQL to add the report_data column if it doesn't exist
    try {
      const { error: sqlError } = await supabase.sql(ADD_REPORT_DATA_COLUMN_SQL);

      if (sqlError) {
        console.error('Error adding report_data column:', sqlError);
        return NextResponse.json({ error: 'Failed to add report_data column' }, { status: 500 });
      }

      // Force a refresh of the schema cache
      await supabase.rpc('refresh_schema_cache');
    } catch (error) {
      console.error('Error executing SQL:', error);

      // Try a different approach if the first one fails
      try {
        const { error: alterError } = await supabase.sql(`
          ALTER TABLE public.admin_reports
          ADD COLUMN IF NOT EXISTS report_data JSONB;
        `);

        if (alterError) {
          console.error('Error with direct ALTER TABLE:', alterError);
        }
      } catch (alterError) {
        console.error('Error with fallback approach:', alterError);
      }
    }

    return NextResponse.json({ message: 'Table checked and fixed if needed' });
  } catch (error) {
    console.error('Error fixing reports table:', error);
    return NextResponse.json({ error: 'Failed to fix reports table' }, { status: 500 });
  }
}
