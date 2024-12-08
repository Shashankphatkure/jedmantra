import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      
      // Exchange the code for a session
      const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      if (sessionError) throw sessionError

      // Get the user details from the session
      const { data: { user } } = await supabase.auth.getUser()

      // Check if user already exists in our users table
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', user.email)
        .single()

      // If user doesn't exist, create a new record
      if (!existingUser) {
        // Generate a unique username from email
        const baseUsername = user.email.split('@')[0]
        let username = baseUsername
        let counter = 1

        // Keep checking until we find a unique username
        while (true) {
          const { data: usernameCheck } = await supabase
            .from('users')
            .select('username')
            .eq('username', username)
            .single()

          if (!usernameCheck) break
          username = `${baseUsername}${counter}`
          counter++
        }

        // Insert new user
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            username: username,
            name: user.user_metadata.full_name || user.email.split('@')[0],
            avatar_url: user.user_metadata.avatar_url,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            first_name: user.user_metadata.given_name || null,
            last_name: user.user_metadata.family_name || null
          })

        if (insertError) throw insertError
      }
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(new URL('/', requestUrl.origin))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(
      new URL('/auth/auth-code-error', requestUrl.origin)
    )
  }
}

// Ensure middleware runs only on the paths you specify
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}