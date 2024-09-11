"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveToken } from '../../../../utils/storage';

const SignIn: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        saveToken(data.token)
        setSuccess("Giriş başarılı! Yönlendiriliyorsunuz...");
        setError("");
        // Kullanıcıyı dashboard sayfasına yönlendir
        setTimeout(() => {
          router.push("/dashboard/admin"); 
        }, 2000); // 2 saniye bekle
      } else {
        setError(data.message || "Giriş başarısız");
      }
    } catch (error) {
      setError("Bir hata oluştu");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-boxdark">
        <h2 className="mb-8 text-center text-3xl font-semibold text-black dark:text-white">
          Giriş Yap
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="text-gray-700 block text-sm font-medium dark:text-white">
              E-posta
            </label>
            <input
              type="email"
              placeholder="E-posta giriniz"
              className="border-gray-300 text-gray-900 mt-1 w-full rounded-lg border bg-transparent px-4 py-3 focus:border-primary focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-700 block text-sm font-medium dark:text-white">
              Şifre
            </label>
            <input
              type="password"
              placeholder="6+ karakter, 1 büyük harf"
              className="border-gray-300 text-gray-900 mt-1 w-full rounded-lg border bg-transparent px-4 py-3 focus:border-primary focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="hover:bg-primary-dark w-full rounded-lg bg-primary py-3 font-medium text-white transition"
          >
            Giriş Yap
          </button>

          <div className="mt-6 text-center">
            <p>
              Henüz bir hesabınız yok mu?{" "}
              <Link href="/auth/admin/signup" className="text-primary">
                Kayıt Ol
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
