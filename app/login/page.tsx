"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../redux/store";
// import { loginUser } from "../redux/slice/authslice";
import AuthCookieSetter from "../component/authCookieSetter";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Redirect ke dashboard kalau sudah login (token di cookie)
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      router.push("/dashboard");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.session) {
      console.log("Login success:", data.session);
      // Simpan session di Redux/localStorage jika perlu
      router.push("/dashboard");
    }

    if (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-900">
      <AuthCookieSetter />
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input type="email" placeholder="Email" className="border px-3 py-2 mb-3 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border px-3 py-2 mb-4 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded disabled:opacity-60" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
