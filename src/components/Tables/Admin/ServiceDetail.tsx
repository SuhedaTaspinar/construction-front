"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; 
import Image from "next/image";
import { getToken } from "../../../utils/storage";

interface Service {
  _id: string;
  image: string;
  type: string;

  description: string;
}

const ServiceDetail: React.FC = () => {
  const [service, setService] = useState<Service | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { serviceId } = useParams(); 
  const router = useRouter();

    console.log(serviceId)

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!serviceId) return; 

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services/get-service-by-id/${serviceId}`, {
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
        setService(data);
        setError("");
      } catch (error) {
        setError((error as Error).message || "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [serviceId]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
<div className="p-4 bg-white shadow rounded-lg dark:bg-boxdark">
      {service ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/uploads/${service.image}`}
              alt={service.type} 
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4">{service.type}</h1> 
            <p className="text-gray-700 mb-4">{service.description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => router.back()}
            >
              Geri Dön
            </button>
          </div>
        </div>
      ) : (
        <p>Hizmet bulunamadı.</p>
      )}
    </div>
  );
};

export default ServiceDetail;