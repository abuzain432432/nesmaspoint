"use client";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardSetting from "@/components/DashboardSetting";
import DashboardUserAds from "@/components/DashboardUserAds";

import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

function Page() {
  const user = useSelector((state) => state.authReducer);
  const [pageBuilding, setPageBuilding] = useState(true);
  useEffect(() => {
    setPageBuilding(false);
    setActiveTab(user?.active ? "ads" : "setting");
  }, []);

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
      {pageBuilding ? (
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
