import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ServiceTable from "@/components/Tables/Admin/ServiceTable";

export const metadata: Metadata = {
  title: "Hizmet Listesi",
  description: "",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Hizmet Listesi" />

      <div className="flex flex-col gap-10">
        <ServiceTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
