export interface SizeOption {
  id: number;
  food_item_id: number;
  size_name: string;
  price: number;
  discount_amount: number;
}

export interface AddOn {
  id: number;
  name: string;
  price: number;
  status: number;
}

export interface AddOnItem {
  id: number;
  food_item_id: number;
  add_on_id: number;
  add_on: AddOn;
}

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  food_category_id: number;
  sold_count: number;
  food_photo_url: string;
  cooking_time: number;
  status: number;
  contains_ingredient_list: any;
  contains_size_list: SizeOption[];
  contains_addon_list: AddOnItem[];
}

export interface FoodCategory {
  id: number;
  name: string;
  description: string;
  categoryphotourl: string;
  food_list: FoodItem[];
}

export interface FoodCategoryResponse {
  status: boolean;
  data: {
    items: FoodCategory[];
    last_page: number;
    total: number;
    visible: number;
  };
}
