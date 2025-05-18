import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFoodCategoryById } from "../api/services/foodService";
import { FoodCategory, FoodItem } from "../api/types/foodTypes";

const FoodItems: React.FC = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<FoodCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const loadCategory = async () => {
      if (!categoryId) {
        navigate("/");
        return;
      }

      try {
        setIsLoading(true);
        const data = await getFoodCategoryById(categoryId);
        if (!data) {
          setError("Category not found");
          return;
        }
        setCategory(data);
      } catch (error) {
        setError("Error loading category");
        console.error("Error loading category:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategory();
  }, [categoryId, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !category) {
    return <div>Error: {error || "Category not found"}</div>;
  }

  const handleItemClick = (item: FoodItem) => {
    setSelectedItem(item);
    setVisible(true);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">{category.name} - Food Items</h3>
      {category.food_list.length > 0 ? (
        <div className="grid">
          {category.food_list.map((item) => (
            <div key={item.id} className="col-12 md:col-6 lg:col-4 mb-4">
              <div
                className="p-3 border-1 surface-border surface-card border-round cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex align-items-center mb-3">
                  {item.food_photo_url && (
                    <img
                      src={`https://corerest.selopian.us${item.food_photo_url}`}
                      alt={item.name}
                      className="w-6rem h-6rem mr-3 border-round"
                    />
                  )}
                  <div>
                    <div className="font-bold text-lg">{item.name}</div>
                    <div className="text-sm">{item.description}</div>
                  </div>
                </div>
                <div className="flex align-items-center justify-content-between">
                  <span className="font-bold text-lg">
                    {item.contains_size_list.length > 0
                      ? `${item.contains_size_list[0].price} Tk`
                      : "Price not available"}
                  </span>
                  <span className="text-sm">
                    Sold: {item.sold_count} | Cook time: {item.cooking_time} min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div> No Foods found</div>
      )}

      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        header={selectedItem?.name}
        style={{ width: "90%", maxWidth: "800px" }}
        modal
        className="p-fluid"
      >
        {selectedItem && (
          <div className="grid">
            <div className="col-12 md:col-4">
              <img
                src={`https://corerest.selopian.us${selectedItem.food_photo_url}`}
                alt={selectedItem.name}
                className="w-full border-round"
              />
            </div>
            <div className="col-12 md:col-8">
              <p className="mb-3">{selectedItem.description}</p>

              {selectedItem.contains_size_list.length > 0 && (
                <>
                  <h5 className="font-bold mb-2">Available Sizes</h5>
                  <ul className="mb-3">
                    {selectedItem.contains_size_list.map((size) => (
                      <li key={size.id} className="mb-2">
                        {size.size_name}: {size.price} Tk
                        {size.discount_amount > 0 && (
                          <span className="ml-2 text-green-500">
                            Discount: {size.discount_amount} Tk
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {selectedItem.contains_addon_list.length > 0 && (
                <>
                  <h5 className="font-bold mb-2">Available Add-ons</h5>
                  <ul>
                    {selectedItem.contains_addon_list.map((addon) => (
                      <li key={addon.id}>
                        {addon.add_on.name}: {addon.add_on.price} Tk
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default FoodItems;
