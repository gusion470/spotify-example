import { MdOutlineShortText } from "react-icons/md";
function Search({ search, setSearch }) {
  return (
    <div className="w-[100%] md:max-w-[992px] bg-[#1A1A1A] rounded-full overflow-hidden border-2 border-[#333333] md:p-1.5 md:px-5 md:pr-8 flex items-center">
      <div className="ml-3 md:ml-0 h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse " />
      <input
        type="text"
        className=" bg-[#1A1A1A] text-white border-none lg:w-full focus:ring-0 outline-none placeholder-[#FAFAFA] text-xs lg:text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <div className="hidden md:inline">
        <div className="flex items-center divide-solid divide-x-2 divide-[#333333] ml-auto">
          <div className="flex space-x-2 pr-5">
            <button className="tag">Minimal</button>
            <button className="tag">House</button>
            <button className="tag">Minimal</button>
          </div>

          <div className="flex items-center space-x-1.5 text-[#CECECE] pl-4">
            <MdOutlineShortText className="text-2xl animate-pulse" />
            <span className="font-medium text-sm">Filters</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
