"use client";
import React, { FormEvent, useState } from "react";
import { handleError } from "../lib/errors";
import { loginSchema } from "../lib/validators";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, XCircle } from "lucide-react"; // nice icons
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const safelogin = loginSchema.parse({ email, password });
      await axios.post("/api/auth/login", safelogin);
      setEmail("");
      setPassword("");

      // 🎉 show success animation
      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (error) {
      setErrorMsg("Invalid email or password");
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 rounded-2xl shadow-lg border max-w-sm w-full"
      >
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <div className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign-Up
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Animate error message */}
      {errorMsg && (
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 mt-4 text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-lg"
            >
              <XCircle size={20} />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
