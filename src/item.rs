pub trait Item {
    fn get_id(&self) -> usize;
    fn get_display_name(&self) -> String;
    fn get_image_url(&self) -> String;
}

impl PartialEq for dyn Item {
    fn eq(&self, other: &Self) -> bool {
        self.get_id() == other.get_id()
    }
}
