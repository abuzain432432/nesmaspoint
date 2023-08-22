import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "./LoadingSpinner";
import { useSelector } from "react-redux";

function DashboardSidebar({ onActiveTabe, activeTab }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authReducer);

  let top = "top-[0px]";
  if (activeTab === "setting") {
    top = `top-[50px] mt-2`;
  }
  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get(`${URL}/api/v1/users/logout`);
      dispatch(logout());
      router.replace("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong please try again later",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <aside className=" gradient-sidebar w-[350px] pt-14 text-white">
      <ul className="flex flex-col relative ">
        <div
          className={`active-tab absolute transition duration-200 ${top} left-0 w-1 h-[50px]`}
        ></div>
        {user?.active && (
          <li
            className={`active-sidebar-tab ${
              activeTab === "ads" && "active-tab"
            } cursor-pointer w-[80%] mb-2 mx-auto rounded-lg h-[50px] flex items-center px-4`}
            onClick={() => onActiveTabe("ads")}
          >
            <p className="flex items-center gap-6">
              <span>
                <MdOutlineAddShoppingCart fontSize={20} />
              </span>
              <span className="uppercase text-base">My Adverts</span>
            </p>
          </li>
        )}

        <li
          className={`active-sidebar-tab ${
            activeTab === "setting" && "active-tab"
          } cursor-pointer w-[80%] mb-1 mx-auto rounded-lg h-[50px] flex items-center px-4`}
          onClick={() => onActiveTabe("setting")}
        >
          <p className="flex items-center gap-6">
            <span>
              <FiSettings fontSize={20} />
            </span>
            <span className="uppercase text-base">Setting</span>
          </p>
        </li>
        <li
          onClick={handleLogout}
          className="active-sidebar-tab cursor-pointer w-[80%] mx-auto rounded-lg h-[50px] flex items-center px-4"
        >
          <p className="flex items-center gap-6">
            <span>
              <FiLogOut fontSize={20} />
            </span>
            <span className="uppercase text-base">Logout</span>
            {loading && <Loading />}
          </p>
        </li>
      </ul>
    </aside>
  );
}

export default DashboardSidebar;
