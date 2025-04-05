-- Create a function to create the profiles table
CREATE OR REPLACE FUNCTION create_profiles_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    RETURN true;
  END IF;

  -- Create the profiles table
  CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user',
    verification_status TEXT DEFAULT 'unverified',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Add RLS policies
  ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

  -- Allow users to read their own profile
  CREATE POLICY "Users can read their own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

  -- Allow users to update their own profile
  CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id);

  -- Allow authenticated users to insert their own profile
  CREATE POLICY "Users can insert their own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

  -- Allow service role to read all profiles
  CREATE POLICY "Service role can read all profiles"
    ON public.profiles
    FOR SELECT
    USING (auth.role() = 'service_role');

  -- Allow service role to update all profiles
  CREATE POLICY "Service role can update all profiles"
    ON public.profiles
    FOR UPDATE
    USING (auth.role() = 'service_role');

  -- Allow service role to insert profiles
  CREATE POLICY "Service role can insert profiles"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.role() = 'service_role');

  RETURN true;
END;
$$;
