import React, { useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { printerData } from "../utils/constants";
import axios from "axios";

const HomeRight = ({ renderExit }) => {
  const [payType, setPayType] = useState(null);
  const [exitMode, setExitMode] = useState(null);
  const [onChange, setOnChange] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [network, setNetwork] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(renderExit);
    console.log(renderExit);
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
    api
      .get("exit_modes")
      .then((res) => {
        setExitMode(res.data);
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

  const confirm = (exit_mode_id, check) => {
    setIsLoading(true);
    console.log({
      id: data?.id,
      pay_type_id: exit_mode_id == 2 ? onChange : null,
      exit_mode_id,
    });

    api
      .post(`payment_confirm`, {
        id: data?.id,
        pay_type_id: exit_mode_id == 2 ? onChange : null,
        exit_mode_id,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setError(null);

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
        setError(err.message);
        if (err.code == "ERR_NETWORK") {
          setNetwork("Server bilan aloqa yo'q tarmoqqa ulanishni tekshiring");
        }
      })
      .finally(() => setIsLoading(false));
  };
  const handlePrint = async () => {
    try {
      const sendRequest = async () => {
        return axios.post(import.meta.env.VITE_PRINT_URL, printerData(data), {
          headers: { "Content-Type": "application/json" },
        });
      };

      let response = await sendRequest();

      if (response.status === 404) {
        toast.warning("Printer topilmadi, qayta tekshirilmoqda...");
        response = await sendRequest();

        if (response.status === 404) {
          toast.error("Xatolik: Printer o'chiq yoki aloqa yo'q!");
          return;
        }
      }
      toast.success("Chop etish muvaffaqiyatli amalga oshirildi!");
    } catch (err) {
      switch (err.status) {
        case 401:
          toast.error("Xatolik: Printerning qopqog'i ochiq!");
          break;
        case 402:
          toast.error("Xatolik: Printerning tugmasi bosilib turibdi!");
          break;
        case 403:
          toast.error("Xatolik: Printerda qog'oz tugadi!");
          break;
        case 404:
          toast.warning("Printer topilmadi, qayta tekshirilmoqda...");
          response = await sendRequest();
          if (response.status == 404) {
            toast.error("Xatolik: Printer o'chiq yoki aloqa yo'q!");
          }
          break;
        case 405:
          toast.error("Xatolik: Printerda noma'lum muammo!");
          break;
        case 406:
          toast.error("Xatolik: Printer ma'lumotlarda xatolik bor!");
          break;
        case 407:
          toast.error("Xatolik: Printer JSON format noto'g'ri!");
          break;
        default:
          toast.error(`Printerda xatolik. Status: ${err.status}`);
      }
    }
  };
  function convertMinutesToTimeFormat(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(
      remainingMinutes
    ).padStart(2, "0")}`;
  }
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
          <span className="ml-2 text-blue-500">Юкланмоқда...</span>
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
            <div className="w-full max-w-md transform scale-110">
              <label
                htmlFor="payType"
                className="block mb-2 text-lg font-medium text-gray-700"
              >
                Тўлов турини танланг
              </label>
              <select
                id="payType"
                value={onChange || ""}
                onChange={(e) => setOnChange(e.target.value)}
                className="select select-bordered w-full rounded-lg bg-white border-gray-300 
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent 
               transition duration-200 text-2xl"
              >
                {payType?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => confirm(2, true)}
                className="bg-blue-500 text-white  px-10 py-4 text-3xl rounded-lg cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
                ) : (
                  <>
                    Шлагбаунни очиш <br /> (ческ билан)
                  </>
                )}
              </button>
              <button
                onClick={() => confirm(2, false)}
                className="bg-blue-500 text-white  px-10 py-4 text-3xl rounded-lg cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
                ) : (
                  <>
                    Шлагбаунни очиш <br /> (ческ сиз)
                  </>
                )}
              </button>
              {exitMode.map((item) => (
                <button
                  key={item.id}
                  onClick={() => confirm(item.pay_status, false)}
                  className="bg-blue-500 text-white  px-10 py-4 text-3xl rounded-lg cursor-pointer"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
                  ) : (
                    item?.name
                  )}
                </button>
              ))}

              <button
                onClick={() => setData(null)}
                className="bg-blue-500 text-white  px-10 py-4 text-3xl rounded-lg cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
                ) : (
                  "Орқага қайтиб кетди"
                )}
              </button>
            </div>

            <table className="w-full mt-6 border border-gray-300 rounded-lg text-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border">КИРИШ</th>
                  <th className="p-3 border">ЧИҚИШ</th>
                  <th className="p-3 border">Сумма</th>
                  <th className="p-3 border">Минут</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="p-3 border text-5xl">{data?.enter_date}</td>
                  <td className="p-3 border text-5xl">{data?.exit_date}</td>
                  <td className="p-3 border text-5xl">{data?.summa}</td>
                  <td className="p-3 border text-5xl">
                    {convertMinutesToTimeFormat(data?.minutes)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-around gap-5 items-center p-4 bg-gray-100 rounded-lg shadow-md mt-5">
              <h1 className="text-2x font-semibold text-gray-700">
                Автомобиль рақами
              </h1>
              <h1 className="text-4xl font-bold text-blue-600">
                {data?.plate}
              </h1>
            </div>
          </>
        ) : (
          <>
            <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-400">
                  <th className="border border-gray-300 px-4 py-2">Тўлов</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Давлат рақами
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    {data?.summa == 0
                      ? data?.minutes <= 10
                        ? "BEPUL VAQT"
                        : "XIZMAT AVTO"
                      : data?.summa}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data?.plate}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-around gap-5 items-center p-4 bg-gray-100 rounded-lg shadow-md mt-5">
              <h1 className="text-2x font-semibold text-gray-700">
                Автомобиль рақами
              </h1>
              <h1 className="text-4xl font-bold text-blue-600">
                {data?.plate}
              </h1>
            </div>
          </>
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
      <ToastContainer />
    </div>
  );
};

export default HomeRight;
