import axios from 'axios';
import { Character } from '@/shared/types';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export const fetchCharacters = async (query: string): Promise<Character[]> => {
  try {
    const res = await axios.get(API_URL, {
      params: { name: query }
    });
    return res.data.results;
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
    return [];
  }
};
