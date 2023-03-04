import { Film } from './Film';
import { createOptions, history } from './helpers';
import './styles/main.less';

const container = document.querySelector('.container');
const appendChild = (child: HTMLElement) => container.appendChild(child);

function createSearch(id: number = 906221) {
    const search = document.createElement('input');
    search.value = `${id}`;

    const submit = document.createElement('button');
    submit.innerText = "begin";
    submit.addEventListener('click', () => {
        const id = parseInt(search.value);

        if (!isNaN(id)) {
            container.innerHTML = ''
            createSearch(id);
            bootstrapFilm(id);
        }
    })

    appendChild(search);
    appendChild(submit);
}

function bootstrapFilm(id: number) {
    Film.Get(id).then(film => {

        history.push(film);

        appendChild(film.getElement(() => { }));
        film.getCredits().then(credits => {
            appendChild(createOptions(credits, appendChild));
        })
    });
}

createSearch();
bootstrapFilm(906221);