"use client";

import { useState } from "react";
import { login } from "@/utils/api";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(username, password);
      // Store token/user context here if using a real provider
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Try agent01 / saptgiri2024");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="flex flex-col md:flex-row bg-white dark:bg-secondary rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full overflow-hidden">
        
        {/* Illustration Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-50 dark:bg-blue-900/10 p-8 md:w-1/2 border-r border-gray-100 dark:border-gray-800">
          <Image 
            src="/login_doodle.png" 
            alt="Medical Illustration" 
            width={400} 
            height={400} 
            className="w-full h-auto object-contain mix-blend-multiply dark:mix-blend-normal"
            priority
          />
          <h2 className="text-xl font-bold text-primary mt-6 text-center">Empowering Care Connections</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mt-2 text-sm">Join our network to seamlessly manage and track patient referrals.</p>
        </div>

        {/* Login Form Side */}
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
          <div className="text-center md:text-left mb-8">
            <div className="text-4xl mb-4 md:hidden">🏥</div>
            <h1 className="text-2xl font-bold text-foreground">Saptgiri PR Portal</h1>
            <p className="text-gray-500 dark:text-gray-400">Sign in to manage referrals</p>
          </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md mb-6 text-sm text-center border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              required
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="agent01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              required
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary w-full flex justify-center items-center"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
