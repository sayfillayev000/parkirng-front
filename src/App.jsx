import { createHashRouter, RouterProvider } from "react-router-dom";
import { CashierReport, CashiersCards, Error, Kpp, SearchCar } from "./pages";
import Home from "./pages/Home";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  const createRoutes = (user) => {
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

    const userRoutes = [
      ...(user?.role === "casheir" ? roleBasedRoutes.user : []),
    ];

    return [...commonRoutes, ...userRoutes, { path: "*", element: <Error /> }];
  };

  // if (user === null) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  //     </div>
  //   );
  // }

  const routes = createHashRouter(createRoutes(user));

  return <RouterProvider router={routes} />;
}

export default App;
