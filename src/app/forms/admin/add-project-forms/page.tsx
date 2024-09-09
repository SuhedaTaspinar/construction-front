"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Project: React.FC = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [features, setfeatures] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/projects/create-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: image,
          name:name,
          address:address,
          features:features,
          price:price,
          description:description
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Proje kaydı başarıyla tamamlandı.");
        setError("");

        // Başarılı kayıt olduktan sonra signin sayfasına yönlendirme
        router.push("/forms/admin/project-table");
      } else {
        setError(data.message || "Kayıt başarısız.");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Yeni Proje Formu" />

      <div className="">
        <div className="flex flex-col gap-9">
          {/* <!-- Add Project Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Görsel Ekle
                    </label>
                    <input
                      type="text" /////////////////bu sonra file olarak değiştirilecek
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      İnşaat İsmi
                    </label>
                    <input
                      type="text"
                      placeholder="İnşaat ismini giriniz."
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="mb-6">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Adres
                    </label>
                    <input
                      type="text"
                      placeholder="Adres giriniz."
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Bina Özellikleri
                    </label>
                    <input
                      type="text"
                      placeholder="Bina özellikleri giriniz."
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={features}
                      onChange={(e) => setfeatures(e.target.value)}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Fiyat
                    </label>
                    <input
                      type="number."
                      placeholder="Fiyat giriniz."
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Açıklama Metni
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Açıklama metni giriniz."
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <button 
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Yeni Proje Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );

};
export default Project;
