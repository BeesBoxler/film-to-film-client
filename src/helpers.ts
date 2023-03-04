import { Film } from "./Film";
import { Item } from "./Item";
import { Person } from "./Person";

export const history: Item[] = [];

export function onMouseMoveEffects(event: MouseEvent): void {
    const item = event.target as HTMLElement;
    const rect = item.getBoundingClientRect()
    const halfHeight = rect.height / 2;
    const halfWidth = rect.width / 2;

    const originX = event.clientX - rect.left;
    const originY = event.clientY - rect.top;

    const offsetX = (originX - halfWidth);
    const offsetY = (originY - halfHeight);

    const rotDirX = -offsetX / halfWidth;
    const rotDirY = offsetY / halfHeight;

    const rotMagnitude = (Math.sqrt(offsetX ** 2 + offsetY ** 2) / 35) * (Math.abs(rotDirX) + Math.abs(rotDirY));

    item.style.setProperty("--rot-magnitude", `${rotMagnitude}deg`)
    item.style.setProperty("--rot-dir-x", `${rotDirX}`);
    item.style.setProperty("--rot-dir-y", `${rotDirY}`);

    item.style.setProperty("--mouse-x", `${originX - halfWidth}px`)
    item.style.setProperty("--mouse-y", `${originY - halfWidth}px`)
}

export function createOptions(items: Item[], onClick: (child: HTMLElement) => void): HTMLElement {
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');

    const options = document.createElement('div');
    options.classList.add('options');

    const itemOnClick = (item: Item) => {
        optionsContainer.remove();
        onClick(item.getElement(() => { }));
        history.push(item);

        item.getCredits().then(credits => {
            const options = createOptions(credits, onClick);
            onClick(options);
            setTimeout(() => options.scrollIntoView({ behavior: "smooth" }), 800);
        })
    };

    items.forEach(item => {
        const match = history.findIndex(historyItem => historyItem.constructor.name === item.constructor.name && historyItem.getId() === item.getId());

        if (!~match) {
            options.appendChild(item.getElement(() => itemOnClick(item)))
        }
    });

    optionsContainer.appendChild(options);

    return optionsContainer;
}