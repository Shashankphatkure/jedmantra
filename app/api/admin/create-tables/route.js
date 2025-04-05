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
    
    // Create admin tables
    const { error: adminSettingsError } = await supabase.rpc('create_admin_settings_table');
    const { error: adminReportsError } = await supabase.rpc('create_admin_reports_table');
    const { error: adminNotificationsError } = await supabase.rpc('create_admin_notifications_table');
    
    // Create verification tables
    const { error: instructorVerificationsError } = await supabase.rpc('create_instructor_verifications_table');
    const { error: recruiterVerificationsError } = await supabase.rpc('create_recruiter_verifications_table');
    
    // Create reports table
    const { error: reportsError } = await supabase.rpc('create_reports_table');
    
    // Check for errors
    const errors = [];
    if (adminSettingsError) errors.push({ table: 'admin_settings', error: adminSettingsError.message });
    if (adminReportsError) errors.push({ table: 'admin_reports', error: adminReportsError.message });
    if (adminNotificationsError) errors.push({ table: 'admin_notifications', error: adminNotificationsError.message });
    if (instructorVerificationsError) errors.push({ table: 'instructor_verifications', error: instructorVerificationsError.message });
    if (recruiterVerificationsError) errors.push({ table: 'recruiter_verifications', error: recruiterVerificationsError.message });
    if (reportsError) errors.push({ table: 'reports', error: reportsError.message });
    
    if (errors.length > 0) {
      return NextResponse.json({ 
        message: 'Some tables could not be created', 
        errors 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'All tables created successfully' 
    });
    
  } catch (error) {
    console.error('Error creating tables:', error);
    return NextResponse.json({ error: 'Failed to create tables' }, { status: 500 });
  }
}
