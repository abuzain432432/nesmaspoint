import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "@/config";
import { useSelector } from "react-redux";
function useAdminTable(parms, LIMIT) {
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(false);
  const [refetchSignal, setRefetchSignal] = useState(null);
  const user = useSelector((state) => state.authReducer);
  const handleSort = () => {
    setSort((preSt) => !preSt);
  };

  const headers = {
    Authorization: `Bearer ${user?.token}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let fetchURL = `${URL}/api/v1/ads/administration?page=${page}&searchTerm=${query}&limit=${LIMIT}${
          sort ? "&sort=active" : ""
        }`;
        if (parms === "users") {
          fetchURL = `${URL}/api/v1/users/administration?page=${page}&searchTerm=${query}&limit=${LIMIT}${
            sort ? "&sort=role" : ""
          }`;
        }

        const response = await axios.get(fetchURL, {
          headers,
        });
        setDataSource(response?.data?.data);
        setTotalPages(response?.data?.pages);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page, sort, refetchSignal]);

  const handlePaginationChange = (page) => {
    setPage(page);
  };

  return {
    dataSource,
    totalPages,
    loading,
    query,
    setQuery,
    handlePaginationChange,
    handleSort,
    refetchSignal,
    setRefetchSignal,
    user,
    setLoading,
  };
}

export default useAdminTable;
