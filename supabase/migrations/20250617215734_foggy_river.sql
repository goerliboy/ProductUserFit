/*
  # Create questionnaire submissions table

  1. New Tables
    - `questionnaire_submissions`
      - `id` (uuid, primary key)
      - `user_id` (text, stores anonymous user identifier)
      - `submitted_at` (timestamp, when submission was made)
      - `score` (numeric, calculated friction index score)
      - `answers` (jsonb, stores the user's answers as key-value pairs)

  2. Security
    - Enable RLS on `questionnaire_submissions` table
    - Add policy for anonymous users to insert submissions
    - Add policy for reading submissions (for potential analytics)
*/

CREATE TABLE IF NOT EXISTS questionnaire_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  score numeric NOT NULL,
  answers jsonb NOT NULL
);

ALTER TABLE questionnaire_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert questionnaire submissions (anonymous data collection)
CREATE POLICY "Anyone can insert questionnaire submissions"
  ON questionnaire_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow reading submissions for potential analytics
CREATE POLICY "Anyone can read questionnaire submissions"
  ON questionnaire_submissions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_questionnaire_submissions_user_id ON questionnaire_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_submissions_score ON questionnaire_submissions(score);
CREATE INDEX IF NOT EXISTS idx_questionnaire_submissions_submitted_at ON questionnaire_submissions(submitted_at);