/*
  # Create questionnaire submissions table

  This migration creates the questionnaire_submissions table that is required
  for storing user questionnaire responses and scores.

  ## What this migration does:
  1. Creates the questionnaire_submissions table with proper structure
  2. Sets up Row Level Security (RLS) policies for anonymous access
  3. Creates performance indexes
  4. Ensures the table can be accessed by both anonymous and authenticated users

  ## Tables Created:
  - questionnaire_submissions: Stores user questionnaire responses and calculated scores

  ## Security:
  - Enables RLS on questionnaire_submissions table
  - Allows anonymous users to insert and read submissions
  - Creates policies for data access control
*/

-- Create the questionnaire_submissions table
CREATE TABLE IF NOT EXISTS questionnaire_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  score numeric NOT NULL,
  answers jsonb NOT NULL
);

-- Enable Row Level Security
ALTER TABLE questionnaire_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can insert questionnaire submissions" ON questionnaire_submissions;
DROP POLICY IF EXISTS "Anyone can read questionnaire submissions" ON questionnaire_submissions;

-- Create policy to allow anyone (including anonymous users) to insert submissions
CREATE POLICY "Anyone can insert questionnaire submissions"
  ON questionnaire_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow anyone to read submissions (for analytics)
CREATE POLICY "Anyone can read questionnaire submissions"
  ON questionnaire_submissions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_questionnaire_submissions_user_id ON questionnaire_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_submissions_score ON questionnaire_submissions(score);
CREATE INDEX IF NOT EXISTS idx_questionnaire_submissions_submitted_at ON questionnaire_submissions(submitted_at);

-- Verify the table was created successfully
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'questionnaire_submissions') THEN
    RAISE NOTICE 'questionnaire_submissions table created successfully';
  ELSE
    RAISE EXCEPTION 'Failed to create questionnaire_submissions table';
  END IF;
END $$;