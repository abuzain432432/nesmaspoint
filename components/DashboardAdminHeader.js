import { FiArrowDown, FiSearch } from "react-icons/fi";

function DashboardAdminHeader({ query, setQuery, parms, onSort }) {
  return (
    <div className="flex justify-between items-center w-full ">
      <h2 className="text-3xl">{parms === "users" ? "USERS" : "ADS"}</h2>
      <div className="h-[50px] border-2 border-blue-500 bg-white w-[400px] relative rounded-full overflow-hidden ">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full placeholder:text-gray-500  text-gray-700 h-full text-lg font-semibold bg-transparent px-6 focus-visible:outline-none"
        />
        <div className="  absolute top-[50%] px-3 flex justify-center items-center rounded-full w-[60px] h-[50px] translate-y-[-50%] right-[-4px] bg-blue-500">
          <FiSearch size={34} color="white" />
        </div>
      </div>
      <div
        onClick={onSort}
        className="flex gap-2 font-semibold text-base cursor-pointer items-center uppercase"
      >
        <span>Sort by</span> <FiArrowDown />
        <span>{parms === "users" ? "role" : "Pending"}</span>
      </div>
    </div>
  );
}

export default DashboardAdminHeader;
