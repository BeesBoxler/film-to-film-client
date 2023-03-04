mod components;
mod film;
mod item;

use std::rc::Rc;

use components::{Card, Header};
use film::Film;
use gloo_net::http::Request;
use item::Item;
use yew::prelude::*;

fn main() {
    dotenv::dotenv().ok();
    yew::Renderer::<App>::new().render();
}

async fn fetch_film(id: usize) -> Rc<dyn Item> {
    let api_key = env!("API_KEY");
    let fetch_film: Film = Request::get(
        &format!("https://api.themoviedb.org/3/movie/{id}?api_key={api_key}"),
    )
    .send()
    .await
    .unwrap()
    .json()
    .await
    .unwrap();

    Rc::new(fetch_film)
}

#[function_component(App)]
fn app() -> Html {
    let films: UseStateHandle<Vec<Rc<dyn Item>>> = use_state(|| vec![]);

    {
        let films = films.clone();
        use_effect_with_deps(
            move |_| {
                let films = films.clone();
                wasm_bindgen_futures::spawn_local(async move {
                    let fetch_film = fetch_film(906221).await;

                    films.set(vec![fetch_film]);
                });
            },
            (),
        )
    }

    let cards = films
        .iter()
        .map(|item| html! {<Card item={item} on_card_select={Callback::from(|_|())}/>})
        .collect::<Vec<Html>>();

    html! {<>
        <Header/>
        <div class={"container"}>
            {cards}
        </div>
        </>
    }
}
