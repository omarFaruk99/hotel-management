import React, {useEffect, useState} from 'react';
import {getFoodCategories} from "../api/services/foodService";
import {log10} from "chart.js/helpers";


function AddFilterHomePage() {
    const [allCategories, setAllCategories] = useState<any>([]);
    const [displayedFoods, setDisplayedFoods] = useState<any>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);


    // fetch all categories and their foods
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getFoodCategories();
                const categories = response.data.items;
                setAllCategories(categories);

                // Combine all food_list into one array for initial view
                const allFoods = categories.flatMap(category => category.food_list)
                setDisplayedFoods(allFoods)
            } catch (error) {
                console.error("Failed to fetch categories")
            }
        }
        fetchCategories();
    }, []);

    console.log("allCategories============>", allCategories)
    console.log("allFoods=======>", displayedFoods)

    const showAllFoods = () => {
        setSelectedCategoryId(null);
        const allFoods = allCategories.flatMap((cat: any) => cat.food_list);
        setDisplayedFoods(allFoods)
    }

    const handleCategoryClick = (catID) => {
        setSelectedCategoryId(catID)
        const category = allCategories.find(cat => cat.id === catID)
        if (category) {
            setDisplayedFoods(category.food_list)
        }
    }

    return (
        <div>
            <h1>Filter home page</h1>
            {/*buttons*/}
            <div>
                {/*all buttons*/}
                <button onClick={showAllFoods}>All</button>

                {/*    category buttons*/}
                {allCategories.map(cat => (
                    <button key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            style={{
                                fontWeight: selectedCategoryId === cat.id ? "bold" : "normal", marginLeft:"2px"
                            }}>
                        {cat.name}
                    </button>
                ))}

            </div>
            {/*    display foods*/}
            <div style={{marginTop: "20px"}}>
                {
                    displayedFoods.map(food => (
                        <div
                            key={food.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                margin: "10px"

                            }}
                        >
                            <img
                                src={food.food_photo_url}
                                alt={food.name}
                                style={{width: "150px", height: "auto"}}
                            />
                            <p>{food.name}</p>
                            <p>{food.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AddFilterHomePage;