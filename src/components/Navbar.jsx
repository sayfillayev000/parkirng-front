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
    sessionStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <nav className="navbar bg-base-300 h-[8%]">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          ПОСТ: {kpp?.name}, Оператор: {user?.name}
        </a>
      </div>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }}
        className="p-2 rounded-full transition duration-300 ease-in-out bg-blue-300 mr-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-6 w-6 text-info hover:rotate-180 transition-transform duration-500"
        >
          <path
            fill="#fafafa"
            d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z"
          />
        </svg>
      </a>

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
