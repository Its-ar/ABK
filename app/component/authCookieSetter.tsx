"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabese";

export default function AuthCookieSetter() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        document.cookie = `sb-access-token=${data.session.access_token}; path=/`;
      }
    });
  }, []);

  return null; // tidak perlu render apa pun
}
