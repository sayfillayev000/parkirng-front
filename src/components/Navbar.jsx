import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [kpp, setKpp] = useState(
    JSON.parse(localStorage.getItem("selectedKpp"))
  );

  useEffect(() => {
    console.log(user);

    if (!user) {
      navigate("/cashiers");
    }
  }, [user, navigate]);
  const logout = () => {
    localStorage.removeItem("selectedKpp");
    sessionStorage.removeItem("user");
  };
  return (
    <nav className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          ПОСТ: {kpp?.name}, Оператор: {user?.name}
        </a>
      </div>
      <div className="flex gap-4">
        <NavLink to="/" className="btn btn-success text-white">
          Bosh sahifa
        </NavLink>
        <NavLink to="/search_car" className="btn btn-info text-white">
          Raqam bo'yicha qidirish
        </NavLink>
        <NavLink
          to="/cashier_report"
          className="btn btn-active btn-neutral text-white"
        >
          Hisobotim
        </NavLink>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
