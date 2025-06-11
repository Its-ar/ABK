import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SUPABASE_URL + "/rest/v1", // gunakan REST API Supabase
  headers: {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
    "Content-Type": "application/json",
  },
});

export default API;
