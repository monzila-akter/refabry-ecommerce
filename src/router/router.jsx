import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import CheckOut from "../pages/CheckOut/CheckOut";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/product/:id",
        element: <Products />
      },
      {
        path: "/checkout",
        element: <CheckOut />
      }
    ]
  }
]);

export default router;