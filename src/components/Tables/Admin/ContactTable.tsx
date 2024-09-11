"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getToken } from "../../../utils/storage";
import Swal from "sweetalert2";

interface Contact {
  _id: string;
  phone: string;
  mail: string;
  instagram: string;
  twitter: string;
  youtube: string;
  address: string;
}
const ContactTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();  /////
        const response = await fetch("http://localhost:5000/api/contacts/get-contact", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setContacts(data);
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
  }, []);

  const deleteContact = async (id: string) => {
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
        const response = await fetch(`http://localhost:5000/api/contacts/delete-contact/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setContacts(contacts.filter(contacts => contacts._id !== id));
          Swal.fire(
            'Silindi!',
            'İletişim başarıyla silindi.',
            'success'
          );
        } else {
          const data = await response.json();
          setError(data.message);
          Swal.fire(
            'Hata!',
            'İletişim silinirken bir hata oluştu.',
            'error'
          );
        }
      }
    } catch (error) {
      setError("Bir hata oluştu");
      Swal.fire(
        'Hata!',
        'İletişim silinirken bir hata oluştu.',
        'error'
      );
    }
  };

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
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contact.phone}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contact.mail}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contact.instagram}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contact.twitter}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contact.youtube}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {contact.address}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={() => deleteContact(contact._id)}>
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
