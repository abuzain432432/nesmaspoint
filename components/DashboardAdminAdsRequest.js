import { useState } from "react";
import { Tooltip } from "antd";
import { IoIosArrowDown } from "react-icons/io";

import DashboardAdminTable from "./DashboardAdminTable";
import useAdminTable from "@/custom-hooks/useAdminTable";

import AdminAdsStatusModal from "./admin/AdminAdsStatusModal";
import AdminAdsReportsModal from "./admin/AdminAdsReportsModal";
import Link from "next/link";
const LIMIT = 10;
function DashboardAdminAds() {
  const [reportModal, setReportModal] = useState(null);
  const [adStatusModel, setAdStatusModel] = useState(null);
  const {
    dataSource,
    totalPages,
    loading,
    setLoading,
    query,
    setQuery,
    handlePaginationChange,
    handleSort,
    setRefetchSignal,
    user,
  } = useAdminTable("ads", LIMIT);

  const handleReportsModalCancel = () => {
    setReportModal(null);
  };
  const handleAdStatusModelCancel = () => {
    setAdStatusModel(null);
  };
  const columns = [
    {
      title: "TITLE",
      dataIndex: "title",
      width: "300px",
      key: "title",
      render(title) {
        return (
          <div>
            {title?.length < 27 ? (
              title
            ) : (
              <Tooltip title={title}>{`${title.slice(0, 28)}...`}</Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: "USER",
      dataIndex: "user",
      key: "user",
      width: "300px",
      render(user) {
        return (
          <div>
            {user?.email?.length > 27 ? (
              <Tooltip title={user?.email}>
                {`${user?.email.slice(0, 27)}...`}
              </Tooltip>
            ) : (
              user?.email
            )}
          </div>
        );
      },
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "REMARKS",
      dataIndex: "reports",
      key: "reports",
      render(reports, rowData) {
        return (
          <div
            onClick={() => setReportModal(rowData)}
            className="cursor-pointer"
          >
            Reports
            <span
              className={`font-semibold ${
                !reports?.length ? "" : "text-red-500"
              }`}
            >
              {reports?.length}
            </span>
          </div>
        );
      },
    },
    {
      title: "STATUS",
      dataIndex: "active",
      key: "active",
      render(status, rowData) {
        return (
          <div
            onClick={() => setAdStatusModel(rowData)}
            className={`w-fit cursor-pointer  py-1 rounded-full flex items-center justify-center first-letter:uppercase ${
              !status ? "bg-[#DDD73D] px-4" : "bg-[#40DD3D] px-6"
            }`}
          >
            {status ? (
              <>
                Active <IoIosArrowDown />
              </>
            ) : (
              <>
                Pending <IoIosArrowDown />
              </>
            )}
          </div>
        );
      },
    },
    {
      title: "Ad",
      dataIndex: "active",
      key: "active",
      render(status, rowData) {
        return (
          <Link href={`/admin-dashboard/ad-details/${rowData._id}`}>
            <span className="text-blue-700 hover:text-blue-500">view</span>
          </Link>
        );
      },
    },
  ];
  return (
    <>
      <AdminAdsStatusModal
        loading={loading}
        adStatusModel={adStatusModel}
        onAdStatusModelCancel={handleAdStatusModelCancel}
        setLoading={setLoading}
        user={user}
        setRefetchSignal={setRefetchSignal}
      />
      <AdminAdsReportsModal
        reportModal={reportModal}
        loading={loading}
        setLoading={setLoading}
        user={user}
        onReportsModalCancel={handleReportsModalCancel}
        setRefetchSignal={setRefetchSignal}
      />
      <div className="bg-[#d9d9d98b] flex-1">
        <DashboardAdminTable
          LIMIT={LIMIT}
          query={query}
          setQuery={setQuery}
          handleSort={handleSort}
          dataSource={dataSource}
          loading={loading}
          totalPages={totalPages}
          handlePaginationChange={handlePaginationChange}
          columns={columns}
          parms={"ads"}
        />
        ;
      </div>
    </>
  );
}

export default DashboardAdminAds;
