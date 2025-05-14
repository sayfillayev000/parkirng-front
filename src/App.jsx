import { createHashRouter, RouterProvider } from "react-router-dom";
import { CashierReport, CashiersCards, Error, Kpp, SearchCar } from "./pages";
import Home from "./pages/Home";

const router = createHashRouter([
  { path: "/", element: <Home />, errorElement: <Error /> },
  {
    path: "/cashiers",
    element: <CashiersCards />,
    errorElement: <Error />,
  },
  { path: "/kpp", element: <Kpp />, errorElement: <Error /> },
  {
    path: "/search_car",
    element: <SearchCar />,
    errorElement: <Error />,
  },
  {
    path: "/cashier_report",
    element: <CashierReport />,
    errorElement: <Error />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
