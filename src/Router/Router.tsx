import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFound from "../NotFound/NotFound";
import FoodCategories from "../Pages/FoodCategories";
import FoodItems from "../Pages/FoodItems";
import Orders from "../Pages/Orders";
import AddFilterHomePage from "../Pages/AddFilterHomePage";

export const router: any = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <FoodCategories />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },{
        path: "/homeFilter",
        element: <AddFilterHomePage/>,
      },
      {
        path: "/food-categories/:categoryId",
        element: <FoodItems></FoodItems>,
      },
    ],
  },
]);
