"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import { getToken } from "../../../../utils/storage";


const Service: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("image", image); // Eğer bir dosya seçildiyse ekle
    formData.append("type", type);
    formData.append("description", description);

    try {
      const token = getToken();  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services/create-service`, {
        method: "POST",
        headers: {  
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Hizmet kaydı başarıyla tamamlandı.");
        setError("");

        router.push("/forms/admin/service-table");
      } else {
        setError(data.message || "Kayıt başarısız.");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Yeni Hizmet Formu" />

      <div className="">
        <div className="flex flex-col gap-9">
          {/* <!-- Add Service Form --> */}
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
                      Hizmet Türü
                    </label>
                    <input
                      type="text"
                      placeholder="Hizmet türünü giriniz."
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-6">
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
                  Yeni Hizmet Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Service;
