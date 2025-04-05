-- Create a function to create the admin_settings table
CREATE OR REPLACE FUNCTION create_admin_settings_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_settings') THEN
    RETURN true;
  END IF;

  -- Create the admin_settings table
  CREATE TABLE public.admin_settings (
    id SERIAL PRIMARY KEY,
    settings JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES auth.users(id)
  );

  -- Add RLS policies
  ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

  -- Allow authenticated users to read settings
  CREATE POLICY "Allow authenticated users to read settings"
    ON public.admin_settings
    FOR SELECT
    USING (auth.role() = 'authenticated');

  -- Allow authenticated users to insert settings
  CREATE POLICY "Allow authenticated users to insert settings"
    ON public.admin_settings
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

  -- Allow authenticated users to update settings
  CREATE POLICY "Allow authenticated users to update settings"
    ON public.admin_settings
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;

-- Create a function to create the admin_reports table
CREATE OR REPLACE FUNCTION create_admin_reports_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_reports') THEN
    RETURN true;
  END IF;

  -- Create the admin_reports table
  CREATE TABLE public.admin_reports (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    last_generated TIMESTAMP WITH TIME ZONE,
    frequency VARCHAR(50),
    status VARCHAR(50),
    type VARCHAR(50),
    icon VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Add RLS policies
  ALTER TABLE public.admin_reports ENABLE ROW LEVEL SECURITY;

  -- Allow authenticated users to read reports
  CREATE POLICY "Allow authenticated users to read reports"
    ON public.admin_reports
    FOR SELECT
    USING (auth.role() = 'authenticated');

  -- Allow authenticated users to insert reports
  CREATE POLICY "Allow authenticated users to insert reports"
    ON public.admin_reports
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

  -- Allow authenticated users to update reports
  CREATE POLICY "Allow authenticated users to update reports"
    ON public.admin_reports
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;

-- Create a function to create the admin_notifications table
CREATE OR REPLACE FUNCTION create_admin_notifications_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_notifications') THEN
    RETURN true;
  END IF;

  -- Create the admin_notifications table
  CREATE TABLE public.admin_notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    status VARCHAR(50) DEFAULT 'unread',
    target VARCHAR(50) DEFAULT 'all',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Add RLS policies
  ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

  -- Allow authenticated users to read notifications
  CREATE POLICY "Allow authenticated users to read notifications"
    ON public.admin_notifications
    FOR SELECT
    USING (auth.role() = 'authenticated');

  -- Allow authenticated users to insert notifications
  CREATE POLICY "Allow authenticated users to insert notifications"
    ON public.admin_notifications
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

  -- Allow authenticated users to update notifications
  CREATE POLICY "Allow authenticated users to update notifications"
    ON public.admin_notifications
    FOR UPDATE
    USING (auth.role() = 'authenticated');

  -- Allow authenticated users to delete notifications
  CREATE POLICY "Allow authenticated users to delete notifications"
    ON public.admin_notifications
    FOR DELETE
    USING (auth.role() = 'authenticated');

  RETURN true;
END;
$$;
