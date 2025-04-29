"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUser } from "../utils/api";

export default function LoginPage() {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(rollNumber, name);
      router.push(`/form?rollNumber=${rollNumber}`);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
            />
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
