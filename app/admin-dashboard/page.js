"use client";
import AdminDashboardSidebar from "@/components/admin/AdminDashboardSidebar";
import DashboardAdminAdsRequest from "@/components/DashboardAdminAdsRequest";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardAdminUsers from "@/components/DashboardAdminUsers";
import { useContext } from "react";
import { AppCtx } from "@/app-context/AppContext";
function Page() {
  const user = useSelector((state) => state.authReducer);
  const router = useRouter();
  const { appLoading } = useContext(AppCtx);
  useEffect(() => {
    console.log();
    if (
      !appLoading &&
      (!user?.token || !(user?.role === "admin") || !(user?.role === "guide"))
    ) {
      router.replace("/");
    }
  }, [user?.role, user?.token, appLoading]);

  const [activeTab, setActiveTab] = useState("ads-requests");
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  let content = <DashboardAdminAdsRequest />;

  if (activeTab == "users") {
    content = <DashboardAdminUsers />;
  }

  return (
    <section className="min-h-[100vh] md:flex">
      {appLoading ? (
        <Loading />
      ) : (
        <>
          <AdminDashboardSidebar
            activeTab={activeTab}
            onActiveTabe={handleActiveTab}
          />
          {content}
        </>
      )}
    </section>
  );
}

export default Page;
