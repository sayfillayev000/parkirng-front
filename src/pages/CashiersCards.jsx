import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import api from "../api/api";
import { useNavigate } from "react-router-dom";

const CashiersCards = () => {
  const [kpp, setKpp] = useState([]);
  const [cashiers, setCashiers] = useState([]);
  const [selectedCashier, setSelectedCashier] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
    <div className="p-16 text-4xl">
      <h1 className="text-4xl py-6 text-center">
        {kpp?.parking?.name} АВТОТУРАРГОҲ ТИЗИМГА КИРИШ
      </h1>
      <h2 className="text-4xl font-bold mb-6 text-center">Kassirni tanlang</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cashiers.map((cashier) => (
          <div
            key={cashier.id}
            className="card w-full shadow-xl bg-blue-400 text-white cursor-pointer p-6 text-center"
            onClick={() => setSelectedCashier(cashier)}
          >
            <div className="card-body">
              <h2 className="card-title text-3xl">{cashier.name}</h2>
              <h2 className="card-title text-3xl">Login: {cashier.login}</h2>
            </div>
          </div>
        ))}
      </div>

      {selectedCashier && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-400 bg-opacity-30">
          <div className="bg-white p-12 rounded-3xl shadow-2xl w-[40rem]">
            <h2 className="text-4xl font-bold mb-6 text-center">
              {selectedCashier.name} - Parolni kiriting
            </h2>
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Parolni kiriting"
                className="input input-bordered w-full text-center text-4xl p-6 pr-16"
                value={password}
                readOnly
              />
              <button
                className="absolute inset-y-0 right-4 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-8 w-8 text-gray-600" />
                ) : (
                  <EyeIcon className="h-8 w-8 text-gray-600" />
                )}
              </button>
            </div>
            {error && <p className="text-red-500 text-2xl mb-6">{error}</p>}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⌫"].map((item) => (
                <button
                  key={item}
                  className="btn text-4xl shadow-lg bg-gray-200 hover:bg-gray-300 active:bg-blue-500 active:border-2 active:border-blue-700 transition-all duration-150 rounded-3xl p-12 flex justify-center items-center"
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
            <div className="flex justify-between space-x-6">
              <button
                className="btn btn-error text-white text-3xl p-8"
                onClick={() => {
                  setSelectedCashier(null);
                  setPassword("");
                  setError("");
                }}
              >
                Orqaga
              </button>
              <button
                className="btn btn-success text-white text-3xl p-8"
                onClick={handleLogin}
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashiersCards;
