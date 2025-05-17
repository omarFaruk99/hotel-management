import React, { useEffect, useState } from "react";
import { getFoodCategories } from "../api/services/foodService";
import { FoodCategory } from "../api/types/foodTypes";

const FoodCategories: React.FC = () => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoodCategories = async () => {
      try {
        setLoading(true);
        const response = await getFoodCategories();

        if (response.status && response.data.items) {
          setCategories(response.data.items);
        } else {
          setError("Failed to load food categories");
        }
      } catch (err) {
        setError("An error occurred while fetching food categories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodCategories();
  }, []);

  if (loading)
    return <div className="card p-4">Loading food categories...</div>;
  if (error) return <div className="card p-4 text-red-500">{error}</div>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Food Categories</h2>
      <div className="grid">
        {categories.map((category) => (
          <div key={category.id} className="col-12 md:col-6 lg:col-4 mb-4">
            <div className="p-4 border-1 surface-border surface-card border-round">
              <div className="flex align-items-center mb-3">
                {category.categoryphotourl && (
                  <img
                    src={`https://corerest.selopian.us${category.categoryphotourl}`}
                    alt={category.name}
                    className="w-3rem h-3rem mr-3"
                  />
                )}
                <div className="font-bold text-xl">{category.name}</div>
              </div>
              <p className="mb-3">{category.description}</p>
              <div className="text-sm text-500">
                {category.food_list.length} food items available
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCategories;
