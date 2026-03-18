import { SearchOutlined } from "@ant-design/icons";
import React from "react";

type SearchButtonProps = {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchButton: React.FC<SearchButtonProps> = ({ placeholder, value, onChange }) => {
  return (
    <div>
      <input
        className="border border-[#C4C4C4] rounded-[5px] outline-none pl-10 placeholder:font-medium placeholder:text-[#717171] h-10 w-80 lg:w-94.25"
        type="search"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      <span className="relative right-90">
        <SearchOutlined
          style={{
            color: "#717171",
          }}
        />
      </span>
    </div>
  );
};

export default SearchButton;
