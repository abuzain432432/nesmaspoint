import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
function DashboardSidebar({ onActiveTabe, activeTab }) {
  let top = "top-[0px]";
  if (activeTab === "setting") {
    top = `top-[50px] mt-2`;
  }
  return (
    <aside className=" bg-blue-500 w-[350px] pt-14 text-white">
      <ul className="flex flex-col relative ">
        <div
          className={`bg-blue-300 absolute transition duration-200 ${top} left-0 w-1 h-[50px]`}
        ></div>
        <li
          className="hover:bg-blue-700  cursor-pointer w-[80%] mb-2 mx-auto rounded-lg h-[50px] flex items-center px-4"
          onClick={() => onActiveTabe("ads")}
        >
          <p className="flex items-center gap-6">
            <span>
              <MdOutlineAddShoppingCart fontSize={20} />
            </span>
            <span className="uppercase text-base">My Adverts</span>
          </p>
        </li>
        <li
          className="hover:bg-blue-700 cursor-pointer w-[80%] mb-1 mx-auto rounded-lg h-[50px] flex items-center px-4"
          onClick={() => onActiveTabe("setting")}
        >
          <p className="flex items-center gap-6">
            <span>
              <FiSettings fontSize={20} />
            </span>
            <span className="uppercase text-base">Setting</span>
          </p>
        </li>
        <li className="hover:bg-blue-700 cursor-pointer w-[80%] mx-auto rounded-lg h-[50px] flex items-center px-4">
          <p className="flex items-center gap-6">
            <span>
              <FiLogOut fontSize={20} />
            </span>
            <span className="uppercase text-base">Logout</span>
          </p>
        </li>
      </ul>
    </aside>
  );
}

export default DashboardSidebar;
