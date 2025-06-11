"use client";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slice/authslice";
import { useState } from "react";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import AuthCookieSetter from "../component/authCookieSetter";
import { supabase } from "@/lib/supabese";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff"); // default role misalnya

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data.user) {
      console.log("Register success:", data.user);
      // Redirect ke halaman login atau dashboard
    }

    if (error) {
      console.error("Register error:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-900">
      <AuthCookieSetter />
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        {error && <p className="text-red-500 text-sm mb-2">{typeof error === "string" ? error : error.message}</p>}
        <input type="text" placeholder="Name" className="border px-3 py-2 mb-3 w-full" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="border px-3 py-2 mb-3 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border px-3 py-2 mb-4 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select className="border px-3 py-2 mb-4 w-full" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <button type="submit" className="bg-green-500 text-white w-full py-2 rounded disabled:opacity-60" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
