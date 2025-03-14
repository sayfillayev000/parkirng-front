import { createHashRouter, RouterProvider } from "react-router-dom";
import { CashierReport, CashiersCards, Error, Kpp, SearchCar } from "./pages";
import Home from "./pages/Home";
import { useEffect, useState, useMemo } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      sessionStorage.removeItem("user");
    }
  }, []);

  const commonRoutes = useMemo(
    () => [
      { path: "/", element: <Home />, errorElement: <Error /> },
      {
        path: "/cashiers",
        element: <CashiersCards />,
        errorElement: <Error />,
      },
      { path: "/kpp", element: <Kpp />, errorElement: <Error /> },
    ],
    []
  );

  const userRoutes = useMemo(
    () =>
      user?.role === "cashier"
        ? [
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
          ]
        : [],
    [user]
  );

  // 🔥 Faqat user ma'lumotlari yuklangandan keyin marshrut yaratish
  const routes = useMemo(
    () => createHashRouter([...commonRoutes, ...userRoutes]),
    [user, commonRoutes, userRoutes]
  );

  // 🔄 User ma'lumotlari yuklanmaguncha yuklanish belgisi ko‘rsatish
  if (user === null)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return <RouterProvider router={routes} />;
};

export default App;
