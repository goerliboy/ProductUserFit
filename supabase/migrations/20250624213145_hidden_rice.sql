/*
  # Create feedback table for user feedback collection

  1. New Tables
    - `feedback`
      - `id` (uuid, primary key)
      - `user_id` (text, stores anonymous user identifier)
      - `item_category` (text, category of the feedback item)
      - `item_index` (integer, index of the item within category)
      - `item_text` (text, the actual content being rated)
      - `feedback_type` (text, either 'like' or 'dislike')
      - `created_at` (timestamp, when feedback was submitted)

  2. Security
    - Enable RLS on `feedback` table
    - Add policy for anonymous users to insert feedback
    - Add policy for reading feedback (for potential analytics)

  3. Performance
    - Create indexes for common query patterns
*/

-- Create the feedback table if it doesn't exist
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  item_category text NOT NULL,
  item_index integer NOT NULL,
  item_text text NOT NULL,
  feedback_type text NOT NULL CHECK (feedback_type IN ('like', 'dislike')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Anyone can insert feedback" ON feedback;
DROP POLICY IF EXISTS "Anyone can read feedback" ON feedback;

-- Create policy to allow anyone (including anonymous users) to insert feedback
CREATE POLICY "Anyone can insert feedback"
  ON feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow anyone to read feedback (for analytics)
CREATE POLICY "Anyone can read feedback"
  ON feedback
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance (with IF NOT EXISTS to avoid conflicts)
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_category ON feedback(item_category);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);

-- Verify the table was created successfully
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'feedback') THEN
    RAISE NOTICE 'feedback table created successfully';
  ELSE
    RAISE EXCEPTION 'Failed to create feedback table';
  END IF;
END $$;