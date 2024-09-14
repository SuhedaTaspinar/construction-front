"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // useParams kullanarak parametreleri alıyoruz
import Image from "next/image";
import { getToken } from "../../../utils/storage";

interface Project {
  _id: string;
  name: string;
  image: string;
  address: string;
  features: string;
  price: string;
  description: string;
}

const ProjectDetail: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { projectId } = useParams();
  const router = useRouter();

    console.log(projectId)

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!projectId) return; 

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/get-project-by-id/${projectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response)

        if (!response.ok) {
          throw new Error("Proje verisi yüklenirken hata oluştu");
        }

        const data = await response.json();
        setProject(data);
        setError("");
      } catch (error) {
        setError((error as Error).message || "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg dark:bg-boxdark">
      {project ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/uploads/${project.image}`}
              alt={project.name}
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <p className="text-gray-700 mb-4">
              <strong>Adres:</strong> {project.address}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Bina Özellikleri:</strong> {project.features}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Fiyat:</strong> {project.price}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => router.back()}
            >
              Geri Dön
            </button>
          </div>
        </div>
      ) : (
        <p>Proje bulunamadı.</p>
      )}
    </div>
  );
};

export default ProjectDetail;