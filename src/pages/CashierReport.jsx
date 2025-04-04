import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { printCashierData } from "../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const CashierReport = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      api
        .get("cashier/reports")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    } else {
      navigate("/cashiers");
    }
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const ReportPrint = async () => {
    try {
      const sendRequest = async () => {
        return axios.post(
          import.meta.env.VITE_PRINT_URL,
          printCashierData(data),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      };
      sendRequest();
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold mb-4">Кассир Ҳисоботи</h2>
        <Link className="btn btn-primary cursor-pointer text-lg" to="/">
          Орқага
        </Link>
      </div>

      <button
        onClick={ReportPrint}
        className="btn btn-success text-white m-4 cursor-pointer text-lg"
      >
        ХИСОБОТНИ ПЕЧАТЬ ҚИЛИШ
      </button>

      <div className="mb-4 p-4 border rounded shadow bg-white">
        <p className="text-4xl">
          <strong>Исм:</strong> {data?.name}
        </p>
        <p className="text-4xl">
          <strong>Лавозими:</strong> {data?.role == "cashier" && "Kassir"}
        </p>
        <p className="text-4xl">
          <strong>Бошланиш санаси:</strong> {data?.start_date}
        </p>
        <p className="text-4xl">
          <strong>Ҳозирги сана:</strong> {data?.now_date}
        </p>
        <p className="text-4xl">
          <strong>Жами тушум:</strong> {data?.total_sum} so'm
        </p>
      </div>

      <div className="bg-white shadow-md rounded p-4">
        <h3 className="text-2xl font-semibold mb-3">To'lovlar</h3>
        <table className="table w-full border text-lg">
          <thead>
            <tr className="bg-gray-200">
              <th>#</th>
              <th>Миқдор</th>
              <th>Тўлов тури</th>
              <th>Сана</th>
            </tr>
          </thead>
          <tbody>
            {data?.payments?.map((payment, index) => (
              <tr key={payment.type}>
                <td className="text-5xl">{index + 1}</td>
                <td className="text-5xl">{payment?.total} сўм</td>
                <td className="text-5xl">{payment?.type}</td>
                <td className="text-5xl">{data?.now_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CashierReport;
