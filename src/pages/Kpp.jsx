import { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Kpp = () => {
  const [kpps, setKpps] = useState([]);
  const [selectedKpp, setSelectedKpp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("kpps") // KPP ro'yxatini olish
      .then((response) => setKpps(response.data))
      .catch((error) => console.error("Error fetching KPPs:", error));
  }, []);

  const confirmSelection = () => {
    if (selectedKpp) {
      localStorage.setItem("selectedKpp", JSON.stringify(selectedKpp)); // LocalStorage-ga saqlash
      navigate("/"); // Dashboard-ga yo'naltirish
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl py-3 text-center">
        TASHKENT CITY PARK KPP TANLASH
      </h1>
      <h2 className="text-2xl font-bold mb-4 text-center">KPP ni tanlang</h2>
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
