"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Project türünü tanımladık
interface Project {
  name: string;
  image: string;
  address: string;
  features: string;
  price: string;
}

const ProjectTable: React.FC = () => {
  // Projeleri tutmak için state'e tür ekledik
  const [projects, setProjects] = useState<Project[]>([]); 
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    // Veri çekmek için async fonksiyon oluşturduk
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects/get-project", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setProjects(data); // Gelen veriler projelere atanıyor
          setSuccess("Veriler başarıyla yüklendi");
          setError("");
        } else {
          setError(data.message);
          setSuccess("");
        }
      } catch (error) {
        setError("Bir hata oluştu");
        setSuccess("");
      }
    };

    fetchData();
  }, []); // Sadece ilk render'da çalışacak

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
        <div className="col-span-3 flex items-center justify-start">
          <p className="font-medium">Bina Özellikleri</p>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <p className="font-medium">Fiyat</p>
        </div>
      </div>

      {/* Projeler listeleniyor */}
      {projects.map((project, key) => (
        <div
          className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center justify-start">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-18.75 w-20 rounded-md">
              <p className="text-sm text-black dark:text-white">
              <Image
                src={`http://localhost:5000/uploads/${project.image}`}
                width={60}
                height={50}
                alt="Product"
              />
              </p>
              </div>
              <p className="text-sm text-black dark:text-white">
                {project.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center justify-start sm:flex">
            <p className="text-sm text-black dark:text-white">
              {project.address}
            </p>
          </div>
          <div className="col-span-3 flex items-center justify-start">
            <p className="text-sm text-black dark:text-white">
              {project.features}
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-end">
            <p className="text-sm text-black dark:text-white">
              {project.price}
            </p>
          </div>
          <div>
            <div className="col-span-4 items-center justify-end sm:flex">
              {/* Buraya butonlarınızı ekleyebilirsiniz */}
              <button className="hover:text-primary">
                {/* SVG ikonlarınız */}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTable;
