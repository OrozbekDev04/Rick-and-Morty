import { CharacterListProps } from "../types";
import { useState,useMemo } from "react";

export const CharacterList = ({ characters ,loading}: CharacterListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const maxPages = 3;
  

  const totalPages = Math.ceil(characters.length/itemsPerPage);
  

  const paginationRange = useMemo(() => {
    let startPage = Math.max(1,currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if(endPage - startPage < maxPages - 1){
      startPage = Math.max(1,endPage - maxPages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  }, [currentPage, totalPages]);

  const currentCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return characters.slice(startIndex, startIndex + itemsPerPage); 
  },[characters,currentPage]);

    return (
      <div className="flex flex-col items-center gap-5 mb-10">
        <div className="flex flex-wrap w-5/5 justify-center items-center gap-3 ">
        {currentCharacters .length > 0 ? (
          currentCharacters .map((char) => (
            <div key={char?.id} className="w-[280px] h-[430px] rounded p-2 border flex flex-col items-center justify-center hover:opacity-60 active:bg-gray-300">
              <img src={char?.image} alt={char.name} />
              <p>{char?.name}</p>
              <p>{char?.created.slice(0,10)} year</p>
              <p>{char?.status}</p>
              <p>{char?.gender}</p>
              <p>{char?.location.name}</p>
            </div>
          ))
        ) : (
          <p className="text-3xl text-center mt-8">{loading ? '' : 'Персонажи не найдены'}</p>
        )}
      </div>
      { totalPages > 1 && (
        <div className="flex gap-4 ">
          <button
            className="px-3 py-2 bg-gray-200 border rounded w-[40px] h-[40px] text-2xl"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ←
          </button>
            {paginationRange?.map((page) => (
          <button 
            key={page} 
            onClick={() => setCurrentPage(page)}
            className={`w-[40px] h-[40px] text-2xl px-3  py-2 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {page}
          </button>
        ))}

          <button
            className="px-3 py-2 bg-gray-200 border rounded w-[40px] h-[40px] text-xl font-extrabold "
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            →
          </button>
      </div>
      )}
      </div>
    );
  };
  
