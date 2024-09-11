import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./auth/admin/signin/page";

export const metadata: Metadata = {
  title: "fsngroupinsaat",
  description: "",
};

export default function Home() {
  return (
    <>
        <SignIn/>
    </>
  );
}
