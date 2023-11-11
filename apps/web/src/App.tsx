import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Products } from "./app/product";
import { Cart } from "./app/cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
