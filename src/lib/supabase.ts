import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface FeedbackEntry {
  id?: string
  user_id: string
  item_category: string
  item_index: number
  item_text: string
  feedback_type: 'like' | 'dislike'
  created_at?: string
}

export interface QuestionnaireSubmission {
  id?: string
  user_id: string
  submitted_at?: string
  score: number
  answers: Record<number, string>
}