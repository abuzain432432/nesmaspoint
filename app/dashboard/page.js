"use client";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardSetting from "@/components/DashboardSetting";
import DashboardUserAds from "@/components/DashboardUserAds";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
function Page() {
  const [activeTab, setActiveTab] = useState("adds");
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  let content = <DashboardUserAds />;
  if (activeTab == "setting") {
    content = <DashboardSetting />;
  }

  return (
    <section className="min-h-[92vh] flex">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <DashboardSidebar activeTab={activeTab} onActiveTabe={handleActiveTab} />
      {content}
    </section>
  );
}

export default Page;
