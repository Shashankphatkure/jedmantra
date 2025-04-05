-- Create a function to create the course_quizzes table
CREATE OR REPLACE FUNCTION create_course_quizzes_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'course_quizzes') THEN
    RETURN true;
  END IF;

  -- Create the course_quizzes table
  CREATE TABLE public.course_quizzes (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    time_limit INTEGER, -- in minutes
    passing_score INTEGER, -- percentage
    questions JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Add RLS policies
  ALTER TABLE public.course_quizzes ENABLE ROW LEVEL SECURITY;

  -- Allow public read access
  CREATE POLICY "Allow public read access"
    ON public.course_quizzes
    FOR SELECT
    USING (true);

  -- Allow authenticated users to insert
  CREATE POLICY "Allow authenticated users to insert"
    ON public.course_quizzes
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

  -- Allow authenticated users to update
  CREATE POLICY "Allow authenticated users to update"
    ON public.course_quizzes
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  -- Allow authenticated users to delete
  CREATE POLICY "Allow authenticated users to delete"
    ON public.course_quizzes
    FOR DELETE
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;

-- Create a function to create the quiz_results table
CREATE OR REPLACE FUNCTION create_quiz_results_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'quiz_results') THEN
    RETURN true;
  END IF;

  -- Create the quiz_results table
  CREATE TABLE public.quiz_results (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    course_id INTEGER NOT NULL,
    quiz_id INTEGER NOT NULL,
    score NUMERIC NOT NULL,
    passed BOOLEAN NOT NULL,
    answers JSONB,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Add RLS policies
  ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

  -- Allow users to read their own quiz results
  CREATE POLICY "Allow users to read own quiz results"
    ON public.quiz_results
    FOR SELECT
    USING (auth.uid() = user_id);

  -- Allow users to insert their own quiz results
  CREATE POLICY "Allow users to insert own quiz results"
    ON public.quiz_results
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

  -- Allow admin to read all quiz results
  CREATE POLICY "Allow admin to read all quiz results"
    ON public.quiz_results
    FOR SELECT
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;

-- Create a function to create the certificates table
CREATE OR REPLACE FUNCTION create_certificates_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'certificates') THEN
    RETURN true;
  END IF;

  -- Create the certificates table
  CREATE TABLE public.certificates (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    course_id INTEGER NOT NULL,
    certificate_id VARCHAR(255) NOT NULL UNIQUE,
    issue_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    revoked_at TIMESTAMP WITH TIME ZONE,
    revoked_reason TEXT
  );

  -- Add RLS policies
  ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

  -- Allow users to read their own certificates
  CREATE POLICY "Allow users to read own certificates"
    ON public.certificates
    FOR SELECT
    USING (auth.uid() = user_id);

  -- Allow users to insert their own certificates
  CREATE POLICY "Allow users to insert own certificates"
    ON public.certificates
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

  -- Allow public verification of certificates
  CREATE POLICY "Allow public verification of certificates"
    ON public.certificates
    FOR SELECT
    USING (true);

  -- Allow admin to update certificates
  CREATE POLICY "Allow admin to update certificates"
    ON public.certificates
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;
