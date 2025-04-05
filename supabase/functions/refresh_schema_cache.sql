-- Create a function to refresh the schema cache
CREATE OR REPLACE FUNCTION refresh_schema_cache()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This is a dummy function that doesn't actually do anything
  -- The real refresh happens when Supabase processes this RPC call
  RETURN true;
END;
$$;
