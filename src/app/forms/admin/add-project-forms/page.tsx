"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";

const Project: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
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
  
    const formData = new FormData();
    if (image) formData.append("image", image); 
    formData.append("name", name);
    formData.append("address", address);
    formData.append("features", features);
    formData.append("price", price);
    formData.append("description", description);
  
    try {
      const response = await fetch("http://localhost:5000/api/projects/create-project", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccess("Proje kaydı başarıyla tamamlandı.");
        setError("");
        router.push("/forms/admin/project-table");
      } else {
        setError(data.message || "Kayıt başarısız.");
      }
    } catch (error) {
      setError("Bir hata oluştu.");
    }
  };
  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Yeni Proje Formu" />

      <div className="">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Görsel Ekle
                    </label>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setImage(file);
                      }}
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
                      type="number"
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
