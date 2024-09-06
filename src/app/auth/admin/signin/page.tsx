import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
//      <Breadcrumb pageName="" />
export const metadata: Metadata = {
  title: "Oturum Aç",
  description: "",
};

const SignIn: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-boxdark">
          <h2 className="mb-8 text-center text-3xl font-semibold text-black dark:text-white">
            Giriş Yap
          </h2>

          <form>
            <div className="mb-6">
              <label className="text-gray-700 block text-sm font-medium dark:text-white">
                E-posta
              </label>
              <input
                type="email"
                placeholder="E-posta giriniz"
                className="border-gray-300 text-gray-900 mt-1 w-full rounded-lg border bg-transparent px-4 py-3 focus:border-primary focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
              />
            </div>

            <button className="hover:bg-primary-dark w-full rounded-lg bg-primary py-3 font-medium text-white transition">
              <Link href="/">Giriş Yap</Link>
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
    </>
  );
};

export default SignIn;
