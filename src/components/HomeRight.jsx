import React, { useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PaymentType } from "./modal";
import { printerData } from "../utils/constants";
import axios from "axios";

const HomeRight = ({ renderExit }) => {
  const [payType, setPayType] = useState(null);
  const [onChange, setOnChange] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [network, setNetwork] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(renderExit);
    console.log(data);
  }, [renderExit]);

  useEffect(() => {
    toast.error(error);
  }, [error]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("pay_types")
      .then((res) => {
        setPayType(res.data);
        setError(null);
      })
      .catch((err) => {
        if (err?.code == "ERR_NETWORK" || err?.message == "Network Error") {
          console.log("aaaaa");
          setNetwork("Server bilan aloqa yo'q tarmoqqa ulanishni tekshiring");
        }
        console.error(err);
        setError(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // To'lovni tasdiqlash
  const paymentConfirm = (key) => {
    switch (key) {
      case "service":
        setIsOpen(true);
        break;
      case "check":
        if (!onChange) {
          setError("To'lov turini tanlang!");
          return;
        }
        confirm(2, true);
        break;
      case "no_check":
        if (!onChange) {
          setError("To'lov turini tanlang!");
          return;
        }
        confirm(2);
        break;
      default:
        setError("Noto'g'ri parametr");
        console.log("Noto'g'ri parametr");
    }
  };

  // To'lovni tasdiqlash funksiyasi
  const confirm = (exit_mode_id, check) => {
    setIsLoading(true);
    api
      .post("payment_confirm", {
        id: data?.id,
        payment_type: onChange,
        exit_mode_id,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setError(null);
        setIsOpen(false);

        if (res.status == 200) {
          console.log(200);

          if (check) {
            console.log("check");

            handlePrint();
          }
          setData(null);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.data.message);
        setIsOpen(false);
        if (err.code == "ERR_NETWORK") {
          setNetwork("Server bilan aloqa yo'q tarmoqqa ulanishni tekshiring");
        }
      })
      .finally(() => setIsLoading(false));
  };
  const handlePrint = () => {
    axios
      .post(import.meta.env.VITE_PRINT_URL, printerData(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  return (
    <div className="w-2/3 bg-white p-4 flex flex-col items-center rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">ЧИҚИШ</h1>

      {/* ✅ Xato xabar */}
      {error && (
        <div
          onClick={() => setError(null)}
          className="text-red-500 bg-red-100 p-2 mt-2 w-full rounded-md border border-red-300 flex items-center justify-between"
        >
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* ✅ Yuklanish jarayoni */}
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <span className="loading loading-spinner loading-lg text-blue-500"></span>
          <span className="ml-2 text-blue-500">Yuklanmoqda...</span>
        </div>
      )}

      {/* ✅ Ma'lumotni ko'rsatish */}
      {data ? (
        data?.summa ? (
          <>
            <h1>
              ВАҚТ: {data?.minutes} минут ТЎЛОВ СУММАСИ:
              {data?.summa} сўм
            </h1>
            <div className="w-full max-w-md">
              <label
                htmlFor="payType"
                className="block mb-2 text-lg font-medium text-gray-700"
              >
                Select Payment Type
              </label>
              <select
                id="payType"
                value={onChange || ""}
                onChange={(e) => setOnChange(e.target.value)}
                className="select select-bordered w-full rounded-lg bg-white border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent 
                           transition duration-200 text-xl"
              >
                <option value="" selected>
                  To'lovsiz
                </option>
                {payType?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => paymentConfirm("check")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
                ) : (
                  "Shlagbaunni ochish (check bilan)"
                )}
              </button>
              <button
                onClick={() => paymentConfirm("no_check")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
                ) : (
                  "Shlagbaunni ochish (check siz)"
                )}
              </button>
              <button
                onClick={() => paymentConfirm("service")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
                ) : (
                  "Xizmatda"
                )}
              </button>
              <button
                onClick={() => {}}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
                ) : (
                  "Orqaga qaytib ketdi"
                )}
              </button>
            </div>

            <table className="w-full mt-6 border border-gray-300 rounded-lg text-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border">КИРИШ</th>
                  <th className="p-3 border">ЧИҚИШ</th>
                  <th className="p-3 border">Summa</th>
                  <th className="p-3 border">Minut</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="p-3 border text-4xl">{data?.enter_date}</td>
                  <td className="p-3 border text-4xl">{data?.exit_date}</td>
                  <td className="p-3 border text-4xl">{data?.summa}</td>
                  <td className="p-3 border text-4xl">{data?.minutes}</td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-400">
                <th className="border border-gray-300 px-4 py-2">Turi</th>
                <th className="border border-gray-300 px-4 py-2">
                  Davlat raqami
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  {data?.type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data?.plate}
                </td>
              </tr>
            </tbody>
          </table>
        )
      ) : (
        <>
          <div className="text-center mt-4 p-4 bg-yellow-100 text-yellow-700 rounded-lg shadow">
            <h2 className="text-xl font-bold">Маълумот йўқ</h2>
            <p className="text-lg">Ҳозирча маълумот келмади</p>
          </div>
          {network && (
            <div className=" flex justify-center pt-5">
              <div className="text-red-500 bg-red-100 p-3 w-2xl text-center rounded-lg mb-4">
                ❌ {network}
              </div>
            </div>
          )}
        </>
      )}

      {isOpen && (
        <PaymentType
          setIsOpen={setIsOpen}
          confirm={confirm}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          setError={setError}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default HomeRight;
