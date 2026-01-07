import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search movies...",
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-64 sm:w-72
        rounded-md border border-gray-300
        px-4 py-2
        text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
    />
  );
};
