"use client";
import AdminDashboardSidebar from "@/components/admin/AdminDashboardSidebar";
import DashboardAdminAdsRequest from "@/components/DashboardAdminAdsRequest";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardAdminUsers from "@/components/DashboardAdminUsers";
function Page() {
  const user = useSelector((state) => state.authReducer);
  const router = useRouter();
  const [pageBuilding, setPageBuilding] = useState(true);
  useEffect(() => {
    if (
      !pageBuilding &&
      (!user?.token || !user?.role === "admin" || !user?.role === "guide")
    ) {
      router.replace("/");
    }
  }, [user?.role, user?.token, pageBuilding]);

  useEffect(() => {
    setPageBuilding(false);
  }, []);

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
      {pageBuilding ? (
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
