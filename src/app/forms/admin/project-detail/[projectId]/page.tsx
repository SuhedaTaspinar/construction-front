import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProjectDetail from "@/components/Tables/Admin/ProjectDetail";

export const metadata: Metadata = {
  title: "Proje Detayı",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Proje Detayı" />

      <div className="flex flex-col gap-10">
        <ProjectDetail />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
