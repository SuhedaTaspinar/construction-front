"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getToken } from "../../../utils/storage";
import Swal from "sweetalert2";

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/get-project`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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

  const deleteProject = async (id: string) => {
    const token = getToken();
    if (!token) {
      setError("Geçersiz token");
      return;
    }
  
    try {
      const result = await Swal.fire({
        title: 'Emin misiniz?',
        text: 'Bu iletişimi silmek istediğinizden emin misiniz?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet',
        cancelButtonText: 'Hayır'
      });
  
      if (result.isConfirmed) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/delete-project/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          setProjects(projects.filter(project => project._id !== id));
          Swal.fire(
            'Silindi!',
            'Proje başarıyla silindi.',
            'success'
          );
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Proje silinirken bir hata oluştu");
          Swal.fire(
            'Hata!',
            errorData.message || "Proje silinirken bir hata oluştu",
            'error'
          );
        }
      }
    } catch (error) {
      setError("Bir hata oluştu: " + (error as Error).message);
      Swal.fire(
        'Hata!',
        'İletişim silinirken bir hata oluştu.',
        'error'
      );
    }
  };
  

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
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/uploads/${project.image}`}
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
              <button className="hover:text-primary mr-2" onClick={() => deleteProject(project._id)}>
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8907 5.40039 15.4688V5.85527H12.5935L12.1091 15.4688C12.1091 15.8907 11.7091 16.2563 11.7285 16.2563ZM14.2316 5.85527H3.74039L3.97539 4.31252H14.2373L14.2316 5.85527Z"
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