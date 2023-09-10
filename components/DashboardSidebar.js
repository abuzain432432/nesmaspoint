import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
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
import { IoIosArrowBack } from "react-icons/io";
import ProtectComponent from "./ProtectComponent";

function DashboardSidebar({ onActiveTabe, activeTab }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authReducer);

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
    <>
      <aside className="md:block hidden gradient-sidebar relative 2xl:w-[350px] lg:w-[300px] md:w-[250px] sm:w-[230px] md:pt-14 sm:pt-10 text-white">
        <ul className="flex  flex-col relative">
          {user?.active && (
            <li
              className={`active-sidebar-tab ${
                activeTab === "ads" && "active-tab"
              } cursor-pointer lg:w-[80%] md:w-[75%] sm:w-[80%] mb-2 mx-auto rounded-lg lg:h-[50px] sm:h-[40px] flex items-center px-4`}
              onClick={() => onActiveTabe("ads")}
            >
              <p className="flex items-center xl:gap-6 md:gap-4 sm:gap-2">
                <span>
                  <MdOutlineAddShoppingCart fontSize={20} />
                </span>
                <span className="uppercase xl:text-base text-sm ">
                  My Adverts
                </span>
              </p>
            </li>
          )}
          <li
            className={`active-sidebar-tab ${
              activeTab === "setting" && "active-tab"
            } cursor-pointer lg:w-[80%] md:w-[75%] sm:w-[80%] mb-2 mx-auto rounded-lg lg:h-[50px] sm:h-[40px] flex items-center px-4`}
            onClick={() => onActiveTabe("setting")}
          >
            <p className="flex items-center xl:gap-6 md:gap-4 sm:gap-2">
              <span>
                <FiSettings fontSize={20} />
              </span>
              <span className="uppercase xl:text-base text-sm">Setting</span>
            </p>
          </li>
          <li
            onClick={handleLogout}
            className="cursor-pointer lg:w-[80%] md:w-[75%] sm:w-[80%] mb-2 mx-auto rounded-lg lg:h-[50px] sm:h-[40px] flex items-center px-4"
          >
            <p className="flex items-center xl:gap-6 md:gap-4 sm:gap-2">
              <span>
                <FiLogOut fontSize={20} />
              </span>
              <span className="uppercase xl:text-base text-sm">Logout</span>
              {loading && <Loading />}
            </p>
          </li>
        </ul>
      </aside>
      <aside className="mt-6 md:hidden px-3  sm:mb-8">
        <ul className="flex  relative ">
          {user?.active && (
            <li
              className={`active-sidebar-tab ${
                activeTab === "ads" && "active-tab"
              } cursor-pointer rounded-lg flex py-2 items-center px-4`}
              onClick={() => onActiveTabe("ads")}
            >
              <p className="flex items-center ">
                <span className="uppercase text-[12px]">Adverts</span>
              </p>
            </li>
          )}

          <li
            className={`active-sidebar-tab ${
              activeTab === "setting" && "active-tab"
            } cursor-pointer  rounded-lg py-2 flex items-center px-4`}
            onClick={() => onActiveTabe("setting")}
          >
            <p className="flex items-center ">
              <span className="uppercase text-[12px]">Setting</span>
            </p>
          </li>
          <li
            onClick={handleLogout}
            className="cursor-pointer  rounded-lg py-2  flex items-center px-4"
          >
            <p className="flex items-center ">
              <span className="uppercase text-[12px]">Logout</span>
              {loading && <Loading />}
            </p>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default DashboardSidebar;
