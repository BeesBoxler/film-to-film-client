use yew::prelude::*;

#[function_component]
pub fn Header() -> Html{
    html!{
        <header>
            <h1>
                {"Film"}
                <span class={"two"}>{"2"}</span>
                <span class={"reverse"}>{"Film"}</span>
            </h1>
        </header>
    }
}