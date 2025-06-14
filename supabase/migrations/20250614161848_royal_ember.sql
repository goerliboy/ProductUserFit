/*
  # Create feedback table

  1. New Tables
    - `feedback`
      - `id` (uuid, primary key)
      - `user_id` (text, stores anonymous user identifier)
      - `item_category` (text, category of the feedback item like 'growthTactics')
      - `item_index` (integer, index of the item within the category)
      - `item_text` (text, the actual content being rated)
      - `feedback_type` (text, either 'like' or 'dislike')
      - `created_at` (timestamp, when feedback was given)

  2. Security
    - Enable RLS on `feedback` table
    - Add policy for anyone to insert feedback (anonymous feedback collection)
    - Add policy for reading feedback (for potential analytics)
*/

CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  item_category text NOT NULL,
  item_index integer NOT NULL,
  item_text text NOT NULL,
  feedback_type text NOT NULL CHECK (feedback_type IN ('like', 'dislike')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert feedback (anonymous feedback collection)
CREATE POLICY "Anyone can insert feedback"
  ON feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow reading feedback for potential analytics
CREATE POLICY "Anyone can read feedback"
  ON feedback
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_category ON feedback(item_category);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);