"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Contact {
  phone: String;
  mail: String;
  instagram: String;
  twitter: String;
  youtube: String;
  address: String;
}

const ContactTable: React.FC = () => {
  const [contacts, setContact] = useState<Contact[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contacts/get-contact", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setContact(data); // Gelen veriler projelere atanıyor
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
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                Telefon Numarası
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                E-mail
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                İnstagram
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Twitter
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                YouTube
              </th>
              <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                Adres
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white"></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contacts, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contacts.phone}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contacts.mail}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contacts.instagram}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contacts.twitter}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contacts.youtube}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contacts.address}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
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
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5681 2.47502 13.7535 2.47502ZM8.28035 1.9969C8.28035 1.87815 8.37035 1.79002 8.4599 1.79002H10.5694C10.659 1.79002 10.7485 1.87815 10.7485 1.9969V2.47502H8.28035V1.9969ZM13.0664 4.69252H12.2684V7.00602H9.65937C9.23536 7.00602 8.92737 7.30402 8.92737 7.72802V9.6394H12.5814L12.1874 15.1094H7.38315L7.04035 9.6394H9.65937V6.69002H12.5364L12.7839 4.69252H13.0664Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;
