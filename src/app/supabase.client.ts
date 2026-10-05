import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://fyradqejqdlumwiatdkn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cmFkcWVqcWRsdW13aWF0ZGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNjk4ODEsImV4cCI6MjEwNjc0NTg4MX0.Yt6HJham18vdm3Froa4VL5pmE5_5poJz-rhTIxZIh5g'
)
