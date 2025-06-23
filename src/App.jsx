import { createHashRouter, RouterProvider } from "react-router-dom";
import { CashierReport, CashiersCards, Error, Kpp, SearchCar } from "./pages";
import Home from "./pages/Home";
import useWebSocket from "./hooks/useWebSocket";

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

const App = () => {
  useWebSocket();
  return <RouterProvider router={router} />;
};

export default App;
