"use client";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardSetting from "@/components/DashboardSetting";
import DashboardUserAds from "@/components/DashboardUserAds";

import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import { useContext, useEffect, useState } from "react";
import { AppCtx } from "@/app-context/AppContext";
import { useRouter } from "next/navigation";
function Page() {
  const user = useSelector((state) => state.authReducer);
  const { appLoading } = useContext(AppCtx);
  const router = useRouter();

  useEffect(() => {
    if (!appLoading) {
      setActiveTab(user?.active ? "ads" : "setting");
    }
  }, [appLoading]);
  useEffect(() => {
    if (!appLoading && !user?.token) {
      router.replace("/");
    }
  });

  const [activeTab, setActiveTab] = useState("setting");
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  let content = <DashboardUserAds />;
  if (activeTab == "setting") {
    content = <DashboardSetting />;
  }

  return (
    <section className="min-h-[92vh] md:flex">
      {appLoading ? (
        <Loading />
      ) : (
        <>
          <DashboardSidebar
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
