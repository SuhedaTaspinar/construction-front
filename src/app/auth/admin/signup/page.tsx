import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
//{<Breadcrumb pageName="" />}

export const metadata: Metadata = {
  title: "Kayıt Ol",
  description: "Register to the platform", // Meta description
};

const SignUp: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-sm border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
          <div className="p-6 sm:p-12">
            <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white">
              Kayıt Formu
            </h2>

            <form>
              {/* Adı Soyadı */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Adı Soyadı
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ad soyad giriniz"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">{/* Icon */}</span>
                </div>
              </div>

              {/* E-posta */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  E-posta
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="E-posta giriniz."
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">{/* Icon */}</span>
                </div>
              </div>

              {/* Şifre */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Şifre giriniz."
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">{/* Icon */}</span>
                </div>
              </div>

              {/* Şifreyi Yeniden Gir */}
              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Şifreyi Yeniden Gir
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Şifreyi yeniden giriniz."
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">{/* Icon */}</span>
                </div>
              </div>

              {/* Kayıt Ol Butonu */}
              <div className="text-center">
                <Link href="/auth/admin/signin">
                  <button className="hover:bg-primary-dark w-full rounded-lg bg-primary py-4 font-bold text-white">
                    Kayıt Ol
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
