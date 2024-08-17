import { useContext, useState } from "react";
import { PhotoContext } from "../../store/PhotoContext";

const SearchPhotos = () => {
  const [query, setQuery] = useState("");
  const { state, searchPhotos, photoDispatch } = useContext(PhotoContext);
  const { loading } = state;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      photoDispatch({ type: "SEARCH_PHOTOS_REQUEST", payload: { searchQuery: query }, });
      searchPhotos(query);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="container grid md:grid-cols-12 sm:grid-col gap-4 p-4 mx-auto">
        <div className="md:col-span-11">
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Search for photos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
        </div>
        <div className="">
          <button className="w-full border rounded p-2 bg-slate-200 shadow-sm">
             {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchPhotos;
