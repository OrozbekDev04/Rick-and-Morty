"use client";
import { useEffect, useState } from "react";
import { SearchBar } from "@/features/search-bar/ui/index";
import { CharacterList } from "@/features/character-list/ui/index";
import { Container } from "@/shared/style/style";
import Head from "next/head";
import { Character } from "@/shared/types";
import { fetchCharacters } from "@/shared/api";


export default function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const loadInitialCharacters = async () => {
      setLoading(true);
      try {
        const results = await fetchCharacters("");
        setCharacters(results);
      } catch (err) {
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    loadInitialCharacters();
  }, []);

  return (
    <Container>
      <div className="w-full flex flex-col justify-ceneter items-center relative gap-3 ">
            <Head>
              <title>Task data</title>
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            
            <main className="bg-black">
            <h1 className=" text-blue-300 text-4xl py-1 px-2">
              Welcome to Rick and Morty
            </h1>
            </main>

      <SearchBar onSearch={setCharacters} />
      {loading && <p className=" animate-pulse text-2xl mt-8">Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <CharacterList characters={characters} loading={loading} />
      </div>
    </Container>
    
  );
}
