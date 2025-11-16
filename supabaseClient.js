import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

export const SUPABASE_URL = 'https://tyiibbtuesgiqocvoqyc.supabase.co'
// IMPORTANT: replace the placeholder below with your Supabase ANON (public) key.
// Do NOT use the service_role key in the browser.
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aWliYnR1ZXNnaXFvY3ZvcXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODkwNzksImV4cCI6MjA3ODg2NTA3OX0.ybEovmfA5RFEOLBWurNDWQ6z1ljZ_rjfVrk3EzQ_qtU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// helper to validate key is set
export function checkKeySet(){
  return SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aWliYnR1ZXNnaXFvY3ZvcXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODkwNzksImV4cCI6MjA3ODg2NTA3OX0.ybEovmfA5RFEOLBWurNDWQ6z1ljZ_rjfVrk3EzQ_qtU'
}
