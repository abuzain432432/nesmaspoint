import { Table, Pagination } from "antd";
import { useEffect, useState } from "react";

import DashboardAdminHeader from "./DashboardAdminHeader";

function DashboardAdminTable({
  columns,
  parms,
  query,
  setQuery,
  handleSort,
  dataSource,
  loading,
  totalPages,
  handlePaginationChange,
  LIMIT,
}) {
  return (
    <div className=" mb-8 max-w-[1350px] w-[95%] admin-table mx-auto md:my-16 sm:my-10 my-8">
      <DashboardAdminHeader
        onSort={handleSort}
        query={query}
        setQuery={setQuery}
        parms={parms}
      />
      <div className="mt-12">
        <Table
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
        {totalPages > 1 && (
          <div className="flex justify-center mt-5">
            <Pagination
              onChange={handlePaginationChange}
              total={LIMIT * totalPages}
              pageSize={10}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardAdminTable;
