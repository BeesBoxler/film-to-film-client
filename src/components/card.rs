use std::rc::Rc;

use yew::prelude::*;

use crate::item::Item;

#[derive(Properties)]
pub struct CardProps {
    pub item: Rc<dyn Item>,
    pub on_card_select: Callback<Rc<dyn Item>>,
}

impl PartialEq for CardProps {
    fn eq(&self, other: &Self) -> bool {
        self.item.get_id() == other.item.get_id()
    }
}

#[function_component]
pub fn Card(CardProps {item, ..}: &CardProps) -> Html {

    html! {
        <div class={"item"} >
            <img src={item.get_image_url()}/>
            <div class={"info"}>
                <h2>{item.get_display_name()}</h2>
            </div>
        </div>
    }
}