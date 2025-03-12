import { createHashRouter, RouterProvider } from "react-router-dom";
import { CashierReport, CashiersCards, Error, Kpp, SearchCar } from "./pages";
import Home from "./pages/Home";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const createRoutes = (token) => {
    const commonRoutes = [
      {
        path: "/cashiers",
        element: <CashiersCards />,
      },
      {
        path: "/kpp",
        element: <Kpp />,
      },
      { path: "/", element: <Home /> },
    ];

    const roleBasedRoutes = {
      user: [
        {
          path: "/search_car",
          element: <SearchCar />,
        },
        {
          path: "/cashier_report",
          element: <CashierReport />,
        },
      ],
    };

    const userRoutes = [...(token == null ? [] : roleBasedRoutes.user)];

    return [...commonRoutes, ...userRoutes];
  };
  // { path: "*", element: <Error /> }
  const routes = createHashRouter(createRoutes(token));

  return <RouterProvider router={routes} />;
}

export default App;
