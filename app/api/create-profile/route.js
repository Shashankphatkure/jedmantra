import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const requestUrl = new URL(request.url);
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Check if profiles table exists
    const { error: tableError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
      
    if (tableError && tableError.code === '42P01') {
      // Table doesn't exist, create it
      const { error: createError } = await supabase.rpc('create_profiles_table');
      
      if (createError) {
        console.error('Error creating profiles table:', createError);
        return NextResponse.json({ error: 'Failed to create profiles table' }, { status: 500 });
      }
    }
    
    // Check if profile already exists
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error checking profile:', profileError);
      return NextResponse.json({ error: 'Failed to check profile' }, { status: 500 });
    }
    
    if (existingProfile) {
      return NextResponse.json({ message: 'Profile already exists', profile: existingProfile });
    }
    
    // Create profile
    const { data: profile, error: createProfileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || '',
        avatar_url: user.user_metadata?.avatar_url || '',
        role: 'user',
        verification_status: 'unverified',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
      
    if (createProfileError) {
      console.error('Error creating profile:', createProfileError);
      return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
    }
    
    return NextResponse.json({ message: 'Profile created', profile });
  } catch (error) {
    console.error('Error in create-profile route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
