import { Input } from "@material-tailwind/react";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchItems, setSearchItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const debounceTimeout = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/product-search?search=${search}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setSearchItems(result?.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (search.length > 3) {
      fetchItems();
    } else {
      setSearchItems([]);
    }
  }, [search]);

  const debounce = (func, delay) => {
    return (...args) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
    debounceFetch(value);
    setIsDropdownOpen(true);
  };

  const debounceFetch = debounce((value) => {
    setSearch(value);
  }, 300);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative flex lg:w-[24rem]">
        <Input
          color="pink"
          type="text"
          label="Search Toys"
          onChange={(e) => handleSearchInputChange(e.target.value)}
          value={searchInput}
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 bg-white shadow-lg w-full p-2">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading &&
            !error &&
            search.length > 3 &&
            searchItems.length === 0 && <p>No results found</p>}
          <div className="flex flex-col gap-1">
            {searchItems?.map((item, index) => (
              <Link
                to={`/singletoy/${item?._id}`}
                key={index}
                className="p-2 border-b flex gap-1 hover:bg-blue-gray-100/40"
              >
                <h4 className="text-xs text-gray-800">{item?.toyTitle}</h4>
                <img src={item?.image} alt="product" className="w-10 h-10" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
