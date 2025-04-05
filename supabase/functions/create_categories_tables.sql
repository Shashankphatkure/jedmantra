-- Create a function to create the course_categories table
CREATE OR REPLACE FUNCTION create_course_categories_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'course_categories') THEN
    RETURN true;
  END IF;

  -- Create the course_categories table
  CREATE TABLE public.course_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) NOT NULL,
    icon VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Add RLS policies
  ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;

  -- Allow public read access
  CREATE POLICY "Allow public read access"
    ON public.course_categories
    FOR SELECT
    USING (true);

  -- Allow authenticated users to insert
  CREATE POLICY "Allow authenticated users to insert"
    ON public.course_categories
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

  -- Allow authenticated users to update
  CREATE POLICY "Allow authenticated users to update"
    ON public.course_categories
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  -- Allow authenticated users to delete
  CREATE POLICY "Allow authenticated users to delete"
    ON public.course_categories
    FOR DELETE
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;

-- Create a function to create the job_categories table
CREATE OR REPLACE FUNCTION create_job_categories_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'job_categories') THEN
    RETURN true;
  END IF;

  -- Create the job_categories table
  CREATE TABLE public.job_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) NOT NULL,
    icon VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Add RLS policies
  ALTER TABLE public.job_categories ENABLE ROW LEVEL SECURITY;

  -- Allow public read access
  CREATE POLICY "Allow public read access"
    ON public.job_categories
    FOR SELECT
    USING (true);

  -- Allow authenticated users to insert
  CREATE POLICY "Allow authenticated users to insert"
    ON public.job_categories
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

  -- Allow authenticated users to update
  CREATE POLICY "Allow authenticated users to update"
    ON public.job_categories
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  -- Allow authenticated users to delete
  CREATE POLICY "Allow authenticated users to delete"
    ON public.job_categories
    FOR DELETE
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;

-- Create a function to create the internship_categories table
CREATE OR REPLACE FUNCTION create_internship_categories_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'internship_categories') THEN
    RETURN true;
  END IF;

  -- Create the internship_categories table
  CREATE TABLE public.internship_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) NOT NULL,
    icon VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Add RLS policies
  ALTER TABLE public.internship_categories ENABLE ROW LEVEL SECURITY;

  -- Allow public read access
  CREATE POLICY "Allow public read access"
    ON public.internship_categories
    FOR SELECT
    USING (true);

  -- Allow authenticated users to insert
  CREATE POLICY "Allow authenticated users to insert"
    ON public.internship_categories
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

  -- Allow authenticated users to update
  CREATE POLICY "Allow authenticated users to update"
    ON public.internship_categories
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  -- Allow authenticated users to delete
  CREATE POLICY "Allow authenticated users to delete"
    ON public.internship_categories
    FOR DELETE
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;
