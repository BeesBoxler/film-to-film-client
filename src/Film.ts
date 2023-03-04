import { get, getFilm, IMG_BASE_PATH } from "./api";
import { createOptions, onMouseMoveEffects } from "./helpers";
import { Item } from "./Item";
import { Person } from "./Person";

const DEFAULT_IMAGE = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

export class Film extends Item {
    private posterPath?: string;
    private title: string;
    protected credits: Person[] = [];

    public static From(data: any): Film {
        const film = new Film();
        film.id = data.id;
        film.posterPath = data.poster_path
            ? `${IMG_BASE_PATH}${data.poster_path}`
            : DEFAULT_IMAGE;
        film.title = data.title;

        return film;
    }

    public static async Get(id: number): Promise<Film> {
        return Film.From(await getFilm(id));
    }

    public getTitle(): string {
        return this.title;
    }

    protected getDisplayName(): string {
        return this.title;
    }

    public getPosterPath(): string {
        return this.posterPath;
    }

    protected getImageUrl(): string {
        return this.posterPath;
    }

    public async getCredits(force = false): Promise<Person[]> {
        if (!this.credits.length || force) {
            this.credits.length = 0;

            const response = await get(`/movie/${this.id}/credits`);
            response.cast.forEach(async (castMember: any) => {
                this.credits.push(Person.From(castMember));
            });
        }

        return this.credits;
    }
}
