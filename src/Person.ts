import { get, getPerson, IMG_BASE_PATH } from "./api";
import { Film } from "./Film";
import { createOptions, onMouseMoveEffects } from "./helpers";
import { Item } from "./Item";

const DEFAULT_IMAGE = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg';

export class Person extends Item {
    private profilePath?: string;
    private name: string;
    protected credits: Film[] = [];

    public static From(data: any): Person {
        const person = new Person();
        person.id = data.id;
        person.profilePath = data.profile_path
            ? `${IMG_BASE_PATH}${data.profile_path}`
            : DEFAULT_IMAGE;
        person.name = data.name;

        return person;
    }

    public static async Get(id: number): Promise<Person> {
        return Person.From(await getPerson(id));
    }

    public getProfilePath(): string {
        return this.profilePath;
    }

    protected getImageUrl(): string {
        return this.profilePath;
    }

    public getName(): string {
        return this.name;
    }

    protected getDisplayName(): string {
        return this.name;
    }

    public async getCredits(force = false): Promise<Film[]> {
        if (!this.credits.length || force) {
            this.credits.length = 0;

            const response = await get(`/person/${this.id}/movie_credits`);
            response.cast.forEach(async (film: any) => {
                this.credits.push(Film.From(film));
            });
        }

        return this.credits;
    }
}
