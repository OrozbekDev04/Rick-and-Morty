import { useState, useEffect } from "react";
import { fetchCharacters } from "@/shared/api";
import { Character } from "@/shared/types";

interface SearchBarProps {
  onSearch: (characters: Character[]) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [cache, setCache] = useState<{ [key: string]: Character[] }>(
    () => JSON.parse(localStorage.getItem("characterCache") || "{}")
  );

  useEffect(() => {
    const loadCharacters = async () => {
      if (cache["all"]) {
        onSearch(cache["all"]);
      } else {
        const results = await fetchCharacters("");
        const newCache = { ...cache, all: results };
        localStorage.setItem("characterCache", JSON.stringify(newCache));
        setCache(newCache);
        onSearch(results);
      }
    };
    loadCharacters();
  }, []);

  const handleSearch = () => {
    if (cache[query]) {
      onSearch(cache[query]);
      return;
    }

    const filtered = cache["all"]?.filter((char) =>
      char.name.toLowerCase().includes(query.toLowerCase())
    ) || [];

    const newCache = { ...cache, [query]: filtered };
    localStorage.setItem("characterCache", JSON.stringify(newCache));
    setCache(newCache);
    onSearch(filtered);
  };

  return (
    <div className="flex flex-col items-center justify-center  sticky top-1 gap-2">
      <input
        className="bg-amber-200 text-xl text-center border-2 rounded w-sm h-10 ml-[200px] border-b-blue-700 active:bg-amber-50 cursor:pointer placeholder:text-blue-500 placeholder:text-xl placeholder:text-center"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch();
        }}
        placeholder="Введите имя персонажа"
      />
      <button className="bg-green-300 border-2 rounded w-20 h-10 px-4 cursor:pointer" onClick={handleSearch}>Поиск</button>
    </div>
  );
};
