import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProjectDetail from "@/components/Tables/Admin/ProjectDetail";
import ServiceDetail from "@/components/Tables/Admin/ServiceDetail";

export const metadata: Metadata = {
  title: "Hizmet Detayı",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Proje Detayı" />

      <div className="flex flex-col gap-10">
        <ServiceDetail />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
