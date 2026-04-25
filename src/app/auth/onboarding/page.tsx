"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import Link from "next/link";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateUser, isAuthenticated, isLoading } = useAuth();
  const { showToast } = useToast();
  const [step, setStep] = useState(1); // 1: Role Selection, 2: Details Form
  const [userType, setUserType] = useState<"student" | "working" | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    collegeName: "",
    semester: "",
    linkedinId: "",
    city: "",
    jobTitle: "",
    companyName: "",
    experience: "",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    } else if (!isLoading && user?.onboardingCompleted) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, user, router]);

  const handleRoleSelect = (type: "student" | "working") => {
    setUserType(type);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (userType === "student") {
      if (!formData.collegeName || !formData.semester || !formData.linkedinId || !formData.city) {
        showToast("Please fill all fields", "error");
        return;
      }
    } else {
      if (!formData.jobTitle || !formData.companyName || !formData.experience || !formData.linkedinId) {
        showToast("Please fill all fields", "error");
        return;
      }
    }

    try {
      updateUser({
        ...formData,
        userType: userType as "student" | "working",
        onboardingCompleted: true,
      });
      showToast("Onboarding completed! Welcome aboard.", "success");
      router.push("/");
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <div className="flex items-center gap-2 mb-8">
          <span className="material-symbols-outlined text-primary-container text-2xl">bubble_chart</span>
          <span className="text-xl font-bold gradient-text tracking-tight">EventSync AI</span>
        </div>
        
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <div className={`h-1.5 flex-grow rounded-full ${step >= 1 ? "bg-primary" : "bg-surface-container-high"}`}></div>
            <div className={`h-1.5 flex-grow rounded-full ${step >= 2 ? "bg-primary" : "bg-surface-container-high"}`}></div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            {step === 1 ? "Tell us about yourself" : "A few more details"}
          </h1>
          <p className="text-on-surface-variant text-sm">
            {step === 1 
              ? "Are you currently studying or working professionally?" 
              : "This helps us personalize your event experience."}
          </p>
        </div>
      </div>

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="px-6 flex flex-col gap-4">
          <button
            onClick={() => handleRoleSelect("student")}
            className="group relative overflow-hidden bg-surface-container-lowest border-2 border-transparent hover:border-primary p-6 rounded-2xl transition-all shadow-sm flex items-center gap-5"
          >
            <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold">I am a Student</h3>
              <p className="text-sm text-on-surface-variant">Looking for hackathons, workshops & internships.</p>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-primary">arrow_forward</span>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelect("working")}
            className="group relative overflow-hidden bg-surface-container-lowest border-2 border-transparent hover:border-primary p-6 rounded-2xl transition-all shadow-sm flex items-center gap-5"
          >
            <div className="w-14 h-14 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">work</span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold">I am Working</h3>
              <p className="text-sm text-on-surface-variant">Exploring professional meetups & networking.</p>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-primary">arrow_forward</span>
            </div>
          </button>
        </div>
      )}

      {/* Step 2: Form */}
      {step === 2 && (
        <form className="px-6 pb-12 flex-grow flex flex-col" onSubmit={handleSubmit}>
          <div className="space-y-4 mb-10">
            {userType === "student" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">College Name</label>
                  <input
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border-2 border-transparent rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/60"
                    placeholder="Enter your college"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Semester</label>
                    <input
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-high border-2 border-transparent rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
                      placeholder="e.g. 4th"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">City</label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-high border-2 border-transparent rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
                      placeholder="e.g. Mumbai"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Job Title</label>
                  <input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border-2 border-transparent rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/60"
                    placeholder="e.g. Software Engineer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Company Name</label>
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border-2 border-transparent rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/60"
                    placeholder="Where do you work?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Years of Experience</label>
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border-2 border-transparent rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
                    placeholder="e.g. 3 years"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">LinkedIn Profile ID / URL</label>
              <input
                name="linkedinId"
                value={formData.linkedinId}
                onChange={handleInputChange}
                className="w-full bg-surface-container-high border-2 border-transparent rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/60"
                placeholder="linkedin.com/in/username"
                required
              />
            </div>
          </div>

          <div className="mt-auto flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-grow bg-surface-container-low text-on-surface-variant py-4 rounded-full font-bold transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-[2] gradient-primary text-white py-4 rounded-full font-bold shadow-lg active:scale-95 transition-transform"
            >
              Complete Profile
            </button>
          </div>
        </form>
      )}

      <div className="h-8"></div>
    </div>
  );
}
