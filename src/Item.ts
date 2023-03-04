import { createOptions, history, onMouseMoveEffects } from "./helpers";

export class Item {
    protected id: number;
    protected credits: Item[] = [];

    public getId(): number {
        return this.id;
    }

    public async getCredits(): Promise<Item[]> {
        return this.credits;
    }

    protected getDisplayName(): string {
        return '';
    }

    protected getImageUrl(): string {
        return '';
    }

    public getElement(onClick: () => void): HTMLElement {
        const item = document.createElement("div");
        item.classList.add("film", "item");

        item.style.setProperty("--rotate", `${Math.random() * 20 - 10}deg`)
        item.style.setProperty("--translate-x", `${Math.random() * 4 - 2}em`);
        item.style.setProperty("--translate-y", `${Math.random() * 4 - 2}em`);

        item.addEventListener('mousemove', onMouseMoveEffects);

        const onItemClick = async () => {
            if (history.length > 1) {
                const index = history.indexOf(this);
                item.remove();

                if (~index) {
                    history.splice(index);
                }
            }
            onClick();
        }

        item.addEventListener("click", onItemClick);

        const img = document.createElement("img");
        img.src = this.getImageUrl();

        const info = document.createElement("div");
        info.classList.add("info");

        const title = document.createElement("h2");
        title.innerText = this.getDisplayName();

        info.appendChild(title);
        item.appendChild(img);
        item.appendChild(info);

        return item;
    }
}