import { useState } from "react";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const SearchCar = () => {
  const navigate = useNavigate();
  const [plate, setPlate] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showModal, setShowModal] = useState({ status: false, id: null });

  const handleSearch = () => {
    if (!plate.trim()) {
      setError("Avtomobil raqamini kiriting!");
      setCars([]);
      return;
    }
    setLoading(true);
    setError("");

    api
      .post("search", { plate: plate })
      .then((response) => {
        setCars(response.data);
        setModalOpen(true);
      })
      .catch((e) => {
        setError("Avtomobil topilmadi!");
        setCars([]);
        setModalOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNumberClick = (number) => {
    setPlate((prev) => prev + number);
  };

  const handleDelete = () => {
    setPlate((prev) => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    console.log(showModal.id);
    api
      .post("allow_exit", { id: showModal.id })
      .then((res) => {
        toast.success(res.data.message);
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.data.message);
        console.error(err);
      });
    setShowModal({ status: false, id: null });
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[80%]">
        <div className="p-6">
          <h1 className="text-3xl py-3 text-center">Avtomobilni Qidirish</h1>
          <div className="max-w-lg mx-auto  bg-white p-6 rounded-lg shadow-xl w-3xl">
            <input
              type="text"
              placeholder="Avtomobil raqami (masalan, 636)"
              className="input input-bordered w-full mb-3 text-center text-2xl h-14 rounded-xl"
              value={plate}
              readOnly
            />
            {error && (
              <p className="text-red-500 text-lg mb-3 text-center">{error}</p>
            )}

            {/* Raqamli klaviatura */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⌫"].map((item) => (
                <button
                  key={item}
                  className="btn text-3xl shadow-lg bg-gray-100 hover:bg-gray-300 active:bg-blue-500 active:border-2 active:border-blue-700 transition-all duration-200 rounded-lg p-6 flex justify-center items-center"
                  onClick={() => {
                    if (item === "⌫") {
                      handleDelete();
                    } else if (item === "C") {
                      setPlate("");
                    } else {
                      handleNumberClick(item);
                    }
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="btn btn-primary w-full text-3xl py-4 rounded-xl flex justify-center items-center mt-4"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Qidirilmoqda..." : "Qidirish"}
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[85vw] h-[85vh] relative overflow-auto">
            <button
              className="btn absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Qidiruv natijalari
            </h2>
            {loading ? (
              <p className="text-center text-lg">Yuklanmoqda...</p>
            ) : cars.length > 0 ? (
              <ul className="flex flex-wrap gap-3">
                {cars.map((car) => (
                  <li
                    key={car.plate}
                    onClick={() => setShowModal({ status: true, id: car.id })}
                    className="p-4 border cursor-pointer rounded-md w-full md:w-1/4 lg:w-1/5 bg-gray-100 shadow-md transition duration-200 hover:bg-gray-200 hover:shadow-lg"
                  >
                    <p className="text-2xl">
                      <strong>Raqam:</strong> {car.plate}
                    </p>
                    <p>
                      <strong>Kelgan vaqti:</strong> {car.enter_date}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg text-red-600 font-bold">
                Avtomobil topilmadi!
              </p>
            )}
          </div>
        </div>
      )}
      {showModal.status && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <p className="text-lg font-semibold mb-4">
              АНИҚ ШУМИ? АГАР 15 МИНУТДАН ОШМАГАН БЎЛСА ТИЗИМДАН ЧИҚАРИБ
              ШЛАГБАУННИ ОЧИБ ЮБОРАДИ
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md btn"
              >
                Бекор қилиш
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-md btn"
              >
                Тасдиқлаш
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SearchCar;
