import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import ProtectComponent from "../ProtectComponent";

function AdminDashboardSidebar({ onActiveTabe, activeTab }) {
  const router = useRouter();
  const user = useSelector((state) => state.authReducer);

  return (
    <>
      <aside className="md:block hidden gradient-sidebar relative 2xl:w-[350px] lg:w-[300px] md:w-[250px] sm:w-[230px] md:pt-14 sm:pt-10 text-white">
        <div
          onClick={() => router.back()}
          className="px-2 py-2 rounded-full absolute top-[10px] cursor-pointer left-[10px] bg-white w-fit"
        >
          <IoIosArrowBack color="blue" />
        </div>

        <ul className="flex  flex-col relative">
          <ProtectComponent
            userRole={user.role}
            allowedRoles={["admin", "guide"]}
          >
            <li
              className={`bg-white hover:opacity-95   cursor-pointer lg:w-[80%] md:w-[75%] sm:w-[80%] mb-10 mx-auto rounded-full lg:h-[50px] sm:h-[40px] flex items-center px-4`}
            >
              <p className="flex justify-center w-full items-center xl:gap-6 md:gap-4 sm:gap-2">
                <span className="uppercase text-[#016195] xl:text-base text-sm font-bold">
                  Nesmaspoint
                </span>
              </p>
            </li>
            <li
              className={`active-sidebar-tab ${
                activeTab === "ads-requests" && "active-tab"
              } cursor-pointer lg:w-[80%] md:w-[75%] sm:w-[80%] mb-3 mx-auto rounded-full lg:h-[50px] sm:h-[40px] flex items-center px-4`}
              onClick={() => onActiveTabe("ads-requests")}
            >
              <p className="flex items-center xl:gap-6 md:gap-4 sm:gap-2">
                <span>
                  <MdOutlineAddShoppingCart fontSize={20} />
                </span>
                <span className="uppercase xl:text-base text-sm ">Ads</span>
              </p>
            </li>
          </ProtectComponent>
          <ProtectComponent userRole={user.role} allowedRoles={["admin"]}>
            <li
              className={`active-sidebar-tab ${
                activeTab === "users" && "active-tab"
              } cursor-pointer lg:w-[80%] md:w-[75%] sm:w-[80%] mb-3 mx-auto rounded-full lg:h-[50px] sm:h-[40px] flex items-center px-4`}
              onClick={() => onActiveTabe("users")}
            >
              <p className="flex items-center xl:gap-6 md:gap-4 sm:gap-2">
                <span>
                  <FaRegUser fontSize={18} />
                </span>
                <span className="uppercase xl:text-base text-sm ">users</span>
              </p>
            </li>
          </ProtectComponent>
        </ul>
      </aside>
      {/* <aside className="mt-6 md:hidden px-3  sm:mb-8">
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
      </aside> */}
    </>
  );
}

export default AdminDashboardSidebar;
