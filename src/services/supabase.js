
import { createClient } from '@supabase/supabase-js'
export  const supabaseUrl = 'https://paqvuhdsazrdqqsilqrh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhcXZ1aGRzYXpyZHFxc2lscXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwOTE0OTMsImV4cCI6MjAzNTY2NzQ5M30.qJutFAHFvSS-6kvkkrQjK71JXroSYNnMtjlXJLOUlVU'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;