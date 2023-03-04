use crate::item::Item;
use serde::Deserialize;

#[derive(Clone, PartialEq, Deserialize)]
pub struct Film {
    pub id: usize,
    pub title: String,
    pub poster_path: String,
}

impl Item for Film {
    fn get_id(&self) -> usize{
        self.id
    }
    fn get_display_name(&self) -> String {
        self.title.clone()
    }

    fn get_image_url(&self) -> String {
        let poster_path = &self.poster_path;

        format!("https://image.tmdb.org/t/p/original{poster_path}")
    }
}