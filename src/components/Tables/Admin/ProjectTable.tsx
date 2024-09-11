"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getToken } from "../../../utils/storage";

interface Project {
  _id: string;
  name: string;
  image: string;
  address: string;
  features: string;
  price: string;
}

const ProjectTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken(); 
        if (!token) {
          setError("Geçersiz token");
          return;
        }

        const response = await fetch("http://localhost:5000/api/projects/get-project", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Proje verileri yüklenirken hata oluştu");
        }

        const data = await response.json();
        setProjects(data);
        setSuccess("Veriler başarıyla yüklendi");
        setError("");
      } catch (error) {
        setError((error as Error).message || "Bir hata oluştu");
        setSuccess("");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Başlıklar */}
      <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center justify-start">
          <p className="font-medium">İnşaat İsmi</p>
        </div>
        <div className="col-span-2 hidden items-center justify-start sm:flex">
          <p className="font-medium">Adres</p>
        </div>
        <div className="col-span-2 flex items-center justify-start">
          <p className="font-medium">Bina Özellikleri</p>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <p className="font-medium">Fiyat</p>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <p className="font-medium">İşlemler</p>
        </div>
      </div>

      {projects.length > 0 ? (
        projects.map((project) => (
          <div
            className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={project._id}
          >
            <div className="col-span-2 flex items-center justify-start">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-18.75 w-20 rounded-md">
                  <Image
                    src={`http://localhost:5000/uploads/${project.image}`}
                    width={60}
                    height={50}
                    alt={project.name}
                  />
                </div>
                <p className="text-sm text-black dark:text-white">{project.name}</p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center justify-start sm:flex">
              <p className="text-sm text-black dark:text-white">{project.address}</p>
            </div>
            <div className="col-span-2 flex items-center justify-start">
              <p className="text-sm text-black dark:text-white">{project.features}</p>
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <p className="text-sm text-black dark:text-white">{project.price}</p>
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <button
                className="hover:text-primary mr-2"
                onClick={() => router.push(`/forms/admin/project-detail/${project._id}`)}
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                  />
                  <path
                    d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4">
          {error ? <p className="text-red-500">{error}</p> : <p>Yükleniyor...</p>}
        </div>
      )}
    </div>
  );
};

export default ProjectTable;