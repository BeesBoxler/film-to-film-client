import { Film } from "./Film";
import { Person } from "./Person";

const API_TOKEN = '';
const API_BASE_PATH = 'https://api.themoviedb.org/3';
export const IMG_BASE_PATH = 'https://image.tmdb.org/t/p/original';


export async function get(url: string): Promise<any> {
    let request = await fetch(`${API_BASE_PATH}${url}?api_key=${API_TOKEN}`);

    return request.json();
}

export async function getFilm(id: number): Promise<any> {
    const data = await get(`/movie/${id}`);

    return data;
}

export async function getPerson(id: number): Promise<any> {
    const data = await get(`/movie/${id}`);

    return data;
}