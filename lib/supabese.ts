import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uoywrlwvwfsbemntbbko.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVveXdybHd2d2ZzYmVtbnRiYmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1OTU3NzIsImV4cCI6MjA2MDE3MTc3Mn0.wfO7SCR1V_kEx95VNNdPOCSKT60HRpxY6NTa8RyBFOY";

export const supabase = createClient(supabaseUrl, supabaseKey);
