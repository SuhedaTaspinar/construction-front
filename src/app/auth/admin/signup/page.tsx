"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // useRouter'ı import et
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const router = useRouter(); // useRouter hook'unu kullan

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          mail: email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Kayıt başarıyla tamamlandı.");
        setError("");

        // Başarılı kayıt olduktan sonra signin sayfasına yönlendirme
        router.push("/signin");
      } else {
        setError(data.message || "Kayıt başarısız.");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-sm border bg-white shadow-lg">
        <div className="p-6 sm:p-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-black">
            Kayıt Formu
          </h2>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium">Adı Soyadı</label>
              <input
                type="text"
                placeholder="Ad soyad giriniz"
                className="w-full rounded-lg border py-4 px-6"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">E-posta</label>
              <input
                type="email"
                placeholder="E-posta giriniz."
                className="w-full rounded-lg border py-4 px-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Şifre</label>
              <input
                type="password"
                placeholder="Şifre giriniz."
                className="w-full rounded-lg border py-4 px-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block font-medium">Şifreyi Yeniden Gir</label>
              <input
                type="password"
                placeholder="Şifreyi yeniden giriniz."
                className="w-full rounded-lg border py-4 px-6"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-4 font-bold text-white"
              >
                Kayıt Ol
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
