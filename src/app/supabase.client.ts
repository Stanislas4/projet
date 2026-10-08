import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://uuzynihifagdxxgnxmrc.supabase.co/',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1enluaWhpZmFnZHh4Z254bXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0MTExMzcsImV4cCI6MjEwNjk4NzEzN30.HIKminGYtCzhtsD-vsn4ApOeS1lW3B9qGbDEdgoCoLM'
)
