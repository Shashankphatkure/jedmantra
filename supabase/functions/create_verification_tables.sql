-- Create a function to create the instructor_verifications table
CREATE OR REPLACE FUNCTION create_instructor_verifications_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'instructor_verifications') THEN
    RETURN true;
  END IF;

  -- Create the instructor_verifications table
  CREATE TABLE public.instructor_verifications (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    specialization VARCHAR(255),
    qualification VARCHAR(255),
    institution VARCHAR(255),
    years_of_experience VARCHAR(50),
    linkedin_profile VARCHAR(255),
    website VARCHAR(255),
    biography TEXT,
    teaching_experience TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES auth.users(id)
  );

  -- Add RLS policies
  ALTER TABLE public.instructor_verifications ENABLE ROW LEVEL SECURITY;

  -- Allow users to read their own verification records
  CREATE POLICY "Allow users to read own verifications"
    ON public.instructor_verifications
    FOR SELECT
    USING (auth.uid() = user_id);

  -- Allow users to insert their own verification records
  CREATE POLICY "Allow users to insert own verifications"
    ON public.instructor_verifications
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

  -- Allow admin to read all verification records
  CREATE POLICY "Allow admin to read all verifications"
    ON public.instructor_verifications
    FOR SELECT
    USING (auth.role() = 'authenticated');

  -- Allow admin to update verification records
  CREATE POLICY "Allow admin to update verifications"
    ON public.instructor_verifications
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;

-- Create a function to create the recruiter_verifications table
CREATE OR REPLACE FUNCTION create_recruiter_verifications_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'recruiter_verifications') THEN
    RETURN true;
  END IF;

  -- Create the recruiter_verifications table
  CREATE TABLE public.recruiter_verifications (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company_name VARCHAR(255) NOT NULL,
    company_website VARCHAR(255),
    job_title VARCHAR(255),
    years_of_experience VARCHAR(50),
    linkedin_profile VARCHAR(255),
    company_size VARCHAR(50),
    industry VARCHAR(100),
    reason_for_joining TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES auth.users(id)
  );

  -- Add RLS policies
  ALTER TABLE public.recruiter_verifications ENABLE ROW LEVEL SECURITY;

  -- Allow users to read their own verification records
  CREATE POLICY "Allow users to read own verifications"
    ON public.recruiter_verifications
    FOR SELECT
    USING (auth.uid() = user_id);

  -- Allow users to insert their own verification records
  CREATE POLICY "Allow users to insert own verifications"
    ON public.recruiter_verifications
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

  -- Allow admin to read all verification records
  CREATE POLICY "Allow admin to read all verifications"
    ON public.recruiter_verifications
    FOR SELECT
    USING (auth.role() = 'authenticated');

  -- Allow admin to update verification records
  CREATE POLICY "Allow admin to update verifications"
    ON public.recruiter_verifications
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;
