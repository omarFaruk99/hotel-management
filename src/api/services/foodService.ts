import { apiClient } from "../config/apiConfig";
import { FoodCategoryResponse } from "../types/foodTypes";

// Get all food categories with their items
export const getFoodCategories = async (
  page = 0,
  size = 1100
): Promise<FoodCategoryResponse> => {
  try {
    const response = await apiClient.get<FoodCategoryResponse>(
      `/api/food_category?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching food categories:", error);
    throw error;
  }
};

// Get food item details by ID
export const getFoodItemById = async (id: number) => {
  try {
    const filters = encodeURIComponent(JSON.stringify([["id", id]]));
    const response = await apiClient.get(`/api/food_item?filters=${filters}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching food item with ID ${id}:`, error);
    throw error;
  }
};
