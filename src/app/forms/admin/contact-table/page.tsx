import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ContactTable from "@/components/Tables/Admin/ContactTable";

export const metadata: Metadata = {
  title: "İletişim Listesi",
  description: "",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="İletişim Tablosu" />

      <div className="flex flex-col gap-10">
        <ContactTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
