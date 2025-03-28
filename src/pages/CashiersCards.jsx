import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import api from "../api/api";
import { useNavigate } from "react-router-dom";

const CashiersCards = () => {
  const [cashiers, setCashiers] = useState([]);
  const [selectedCashier, setSelectedCashier] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const navigate = useNavigate();
  const [kpp, setKpp] = useState(
    JSON.parse(localStorage.getItem("selectedKpp"))
  );

  useEffect(() => {
    if (!kpp) {
      navigate("/kpp");
    } else if (user) {
      navigate("/");
    }
  }, [user, kpp]);
  useEffect(() => {
    api
      .get("cashiers")
      .then((response) => setCashiers(response.data))
      .catch((error) => console.error("Error fetching cashiers:", error));
    setKpp(JSON.parse(localStorage.getItem("selectedKpp")) || {});
  }, []);

  const handleLogin = () => {
    if (!selectedCashier) {
      setError("Iltimos, kassirni tanlang!");
      return;
    }
    if (!password) {
      setError("Parolni kiriting!");
      return;
    }
    api
      .post("login", { id: selectedCashier.id, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        api
          .get("user")
          .then((response) => {
            sessionStorage.setItem("user", JSON.stringify(response.data));
            navigate("/");
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          setError(`Parol noto'g'ri! ${error.response.data.message}`);
        } else {
          setError("Serverda xatolik yuz berdi!");
        }
      });
  };

  const handleNumberClick = (num) => {
    setPassword(password + num);
  };

  const handleDelete = () => {
    if (password.length > 0) {
      setPassword(password.slice(0, -1));
    }
  };

  return (
    <div className="p-12 text-3xl">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }}
        className="p-2 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out bg-blue-300 mr-5 absolute left-8 top-8"
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
      <h1 className="text-3xl py-4 text-center">{kpp?.parking?.name}</h1>
      <h2 className="text-3xl font-bold mb-4 text-center">Кассирни танланг</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cashiers.map((cashier) => (
          <div
            key={cashier.id}
            className="card w-full shadow-lg bg-blue-400 text-white cursor-pointer p-4 text-center"
            onClick={() => setSelectedCashier(cashier)}
          >
            <div className="card-body">
              <h2 className="card-title text-2xl">
                Кассир исми: {cashier.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {selectedCashier && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-400 bg-opacity-30">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-[34rem]">
            <h2 className="text-3xl font-bold mb-4 text-center">
              {selectedCashier.name} - Паролни киритинг
            </h2>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Parolni kiriting"
                className="input input-bordered w-full text-center text-3xl p-4 pr-12"
                value={password}
                readOnly
              />
              <button
                className="absolute inset-y-0 right-4 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6 text-gray-600" />
                ) : (
                  <EyeIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
            {error && <p className="text-red-500 text-xl mb-4">{error}</p>}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⌫"].map((item) => (
                <button
                  key={item}
                  className="btn text-3xl shadow-md bg-gray-200 hover:bg-gray-300 active:bg-blue-500 active:border-2 active:border-blue-700 transition-all duration-150 rounded-2xl p-8 flex justify-center items-center"
                  onClick={() => {
                    if (item === "⌫") {
                      handleDelete();
                    } else if (item === "C") {
                      setPassword("");
                    } else {
                      item !== "" && handleNumberClick(item);
                    }
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between space-x-4">
              <button
                className="btn btn-error text-white text-2xl p-6"
                onClick={() => {
                  setSelectedCashier(null);
                  setPassword("");
                  setError("");
                }}
              >
                Орқага
              </button>
              <button
                className="btn btn-success text-white text-2xl p-6"
                onClick={handleLogin}
              >
                Тасдиқлаш
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashiersCards;
