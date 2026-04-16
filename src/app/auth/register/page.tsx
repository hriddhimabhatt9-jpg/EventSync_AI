"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"attendee" | "organizer">("attendee");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Min 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const ok = await register(name, email, password, role);
      if (ok) {
        showToast("Account created! Welcome to EventSync AI.", "success");
        router.push("/profile");
      } else {
        showToast("Registration failed. Check your details.", "error");
      }
    } catch {
      showToast("Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const ok = await loginWithGoogle();
      if (ok) {
        showToast("Signed up with Google!", "success");
        router.push("/profile");
      }
    } catch {
      showToast("Google sign-up failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof typeof errors) =>
    `w-full bg-surface-container-high border-2 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/60 transition-colors ${
      errors[field] ? "border-error" : "border-transparent"
    }`;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="px-6 pt-12 pb-6">
        <Link href="/" className="flex items-center gap-2 mb-10">
          <span className="material-symbols-outlined text-primary-container text-2xl">bubble_chart</span>
          <span className="text-xl font-bold gradient-text tracking-tight">EventSync AI</span>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Create Account</h1>
        <p className="text-on-surface-variant text-sm">Join 50,000+ event goers on the platform.</p>
      </div>

      <form className="px-6 flex-grow" onSubmit={handleSubmit} noValidate>
        {/* Google */}
        <button
          type="button"
          disabled={loading}
          onClick={handleGoogle}
          className="w-full bg-surface-container-lowest py-4 rounded-full font-bold flex items-center justify-center gap-3 shadow-sm mb-6 hover:bg-surface-container-low transition-colors disabled:opacity-60"
          style={{ border: "1px solid rgba(195,198,215,0.2)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          {loading ? "Creating account..." : "Sign up with Google"}
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-grow h-px bg-outline-variant/30"></div>
          <span className="text-xs text-on-surface-variant font-medium">or register with email</span>
          <div className="flex-grow h-px bg-outline-variant/30"></div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-on-surface mb-2">Full Name</label>
          <input id="name" type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }} className={inputClass("name")} placeholder="John Doe" autoComplete="name" aria-invalid={!!errors.name} />
          {errors.name && <p className="text-error text-xs mt-1.5 flex items-center gap-1"><span className="material-symbols-outlined text-xs">error</span>{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="reg-email" className="block text-sm font-medium text-on-surface mb-2">Email</label>
          <input id="reg-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }} className={inputClass("email")} placeholder="you@example.com" autoComplete="email" aria-invalid={!!errors.email} />
          {errors.email && <p className="text-error text-xs mt-1.5 flex items-center gap-1"><span className="material-symbols-outlined text-xs">error</span>{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="reg-password" className="block text-sm font-medium text-on-surface mb-2">Password</label>
          <div className="relative">
            <input id="reg-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }} className={`${inputClass("password")} pr-14`} placeholder="••••••••" autoComplete="new-password" aria-invalid={!!errors.password} />
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
              <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
          {errors.password && <p className="text-error text-xs mt-1.5 flex items-center gap-1"><span className="material-symbols-outlined text-xs">error</span>{errors.password}</p>}
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-on-surface mb-3">I am a...</label>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setRole("attendee")} className={`py-3 rounded-xl font-medium text-sm transition-colors ${role === "attendee" ? "bg-primary-container text-white" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
              Attendee
            </button>
            <button type="button" onClick={() => setRole("organizer")} className={`py-3 rounded-xl font-medium text-sm transition-colors ${role === "organizer" ? "bg-primary-container text-white" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
              Organizer
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full gradient-primary text-white py-4 rounded-full font-bold shadow-lg active:scale-95 transition-transform mb-6 disabled:opacity-60 flex items-center justify-center gap-2">
          {loading && <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>}
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-on-surface-variant mb-8">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-bold">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
