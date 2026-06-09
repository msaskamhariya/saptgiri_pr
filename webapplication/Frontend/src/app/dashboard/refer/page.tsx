"use client";

import { useState } from "react";
import { createReferral } from "@/utils/api";
import Image from "next/image";

export default function ReferPatientPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "Male",
    phone: "",
    department: "Cardiology",
    priority: "Normal",
    notes: ""
  });

  const departments = ["Cardiology", "Orthopedics", "Neurology", "Gynecology", "Pediatrics", "Oncology", "General Medicine"];

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : { id: 1 };
      
      await createReferral({
        ...formData,
        age: parseInt(formData.age),
        agentId: user.id
      });
      
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Failed to submit referral. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Referral Submitted Successfully!</h2>
        <p className="text-gray-500">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl animate-fade-in">
      <header className="mb-8 flex items-center gap-6 bg-white dark:bg-secondary p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="hidden sm:block">
          <Image 
            src="/referral_doodle.png" 
            alt="Referral Illustration" 
            width={120} 
            height={120} 
            className="object-contain mix-blend-multiply dark:mix-blend-normal opacity-90"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Refer New Patient</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Enter patient details below to securely link them to our hospital network. We will take care of the rest.</p>
        </div>
      </header>

      <div className="panel">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Patient Name *</label>
            <input 
              type="text" 
              name="patientName"
              className="input-field" 
              required
              value={formData.patientName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age *</label>
            <input 
              type="number" 
              name="age"
              className="input-field" 
              required
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender *</label>
            <select 
              name="gender"
              className="input-field" 
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Number *</label>
            <input 
              type="tel" 
              name="phone"
              className="input-field" 
              required
              pattern="[0-9]{10}"
              placeholder="10 digit number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department *</label>
            <select 
              name="department"
              className="input-field" 
              value={formData.department}
              onChange={handleChange}
            >
              {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="priority" 
                  value="Normal" 
                  className="w-4 h-4 text-primary focus:ring-primary"
                  checked={formData.priority === "Normal"}
                  onChange={handleChange}
                /> 
                <span>Normal</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="priority" 
                  value="Urgent" 
                  className="w-4 h-4 text-red-600 focus:ring-red-600"
                  checked={formData.priority === "Urgent"}
                  onChange={handleChange}
                /> 
                <span className="text-red-600 font-medium">Urgent</span>
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Referral Notes</label>
            <textarea 
              name="notes"
              className="input-field h-24 resize-none" 
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="md:col-span-2 pt-4">
            <button type="submit" className="btn-primary w-full md:w-auto px-8" disabled={loading}>
              {loading ? "Submitting..." : "Submit Referral"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
