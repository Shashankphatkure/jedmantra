-- Create a function to create the reports table
CREATE OR REPLACE FUNCTION create_reports_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'reports') THEN
    RETURN true;
  END IF;

  -- Create the reports table
  CREATE TABLE public.reports (
    id SERIAL PRIMARY KEY,
    reporter_id UUID REFERENCES auth.users(id) NOT NULL,
    reported_type VARCHAR(50) NOT NULL, -- 'user', 'content', 'course', etc.
    reported_id TEXT NOT NULL, -- ID of the reported item
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE,
    processed_by UUID REFERENCES auth.users(id)
  );

  -- Add RLS policies
  ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

  -- Allow users to read their own reports
  CREATE POLICY "Users can read their own reports"
    ON public.reports
    FOR SELECT
    USING (auth.uid() = reporter_id);

  -- Allow users to insert reports
  CREATE POLICY "Users can insert reports"
    ON public.reports
    FOR INSERT
    WITH CHECK (auth.uid() = reporter_id);

  -- Allow authenticated users to read all reports
  CREATE POLICY "Authenticated users can read all reports"
    ON public.reports
    FOR SELECT
    USING (auth.role() = 'authenticated');

  -- Allow authenticated users to update reports
  CREATE POLICY "Authenticated users can update reports"
    ON public.reports
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;
