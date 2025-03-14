import { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Kpp = () => {
  const [kpps, setKpps] = useState([]);
  const [selectedKpp, setSelectedKpp] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [kpp, setKpp] = useState(
    JSON.parse(localStorage.getItem("selectedKpp"))
  );

  useEffect(() => {
    if (kpp) {
      navigate("/");
    }
  }, [kpp]);

  useEffect(() => {
    api
      .get("kpps") // KPP ro'yxatini olish
      .then((response) => setKpps(response.data))
      .catch((error) => {
        console.error("Error fetching KPPs:", error);
        if (error?.code == "ERR_NETWORK" || error?.message == "Network Error") {
          setError("Server bilan aloqa yo'q tarmoqqa ulanishni tekshiring");
        }
      });
  }, []);

  const confirmSelection = () => {
    if (selectedKpp) {
      localStorage.setItem("selectedKpp", JSON.stringify(selectedKpp)); // LocalStorage-ga saqlash
      navigate("/"); // Dashboard-ga yo'naltirish
    }
  };

  return (
    <div className="p-6">
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
      <h1 className="text-2xl py-3 text-center">
        TASHKENT CITY PARK KPP TANLASH
      </h1>

      <h2 className="text-2xl font-bold mb-4 text-center">KPP ni tanlang</h2>
      {error && (
        <div className=" flex justify-center">
          <div className="text-red-500 bg-red-100 p-3 w-4xl text-center rounded-lg mb-4">
            ❌ {error}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpps.map((kpp) => (
          <div
            key={kpp.id}
            className="card w-full shadow-xl bg-green-400 text-white cursor-pointer"
            onClick={() => setSelectedKpp(kpp)} // Modal ochish
          >
            <div className="card-body">
              <h2 className="card-title">Name: {kpp.name}</h2>
              <h2 className="card-title">Manzil: {kpp.location}</h2>
            </div>
          </div>
        ))}
      </div>

      {selectedKpp && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-900 bg-opacity-10">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Tasdiqlash</h2>
            <p className="mb-4">
              Haqiqatdan ham <strong>{selectedKpp.name}</strong> ni
              tanladingizmi?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="btn btn-error  text-white"
                onClick={() => setSelectedKpp(null)} // Modalni yopish
              >
                Bekor qilish
              </button>
              <button
                className="btn btn-success  text-white"
                onClick={confirmSelection}
              >
                Ha, tanlayman
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kpp;
