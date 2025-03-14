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
  const showToast = (status) => {
    const messages = {
      200: {
        type: "success",
        message: "Chop etish muvaffaqiyatli amalga oshirildi!",
      },
      401: { type: "error", message: "Xatolik: Printerning qopqog'i ochiq!" },
      402: {
        type: "error",
        message: "Xatolik: Printerning tugmasi bosilib turibdi!",
      },
      403: { type: "error", message: "Xatolik: Printerda qog'oz tugadi!" },
      404: {
        type: "warning",
        message: "Printer topilmadi, qayta tekshirilmoqda...",
      },
      405: { type: "error", message: "Xatolik: Printerda noma'lum muammo!" },
      406: {
        type: "error",
        message: "Xatolik: Printer ma'lumotlarda xatolik bor!",
      },
      407: {
        type: "error",
        message: "Xatolik: Printer JSON format noto'g'ri!",
      },
    };

    const toastConfig = messages[status] || {
      type: "error",
      message: `Printerda xatolik. Status: ${status}`,
    };

    toast[toastConfig.type](toastConfig.message);
  };

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

      let response = await sendRequest();

      if (response.status === 404) {
        showToast(404);
        response = await sendRequest();

        if (response.status === 404) {
          toast.error("Xatolik: Printer o'chiq yoki aloqa yo'q!");
          return;
        }
      }

      // ✅ Statusni bitta funksiya orqali boshqaramiz
      showToast(response.status);
    } catch (err) {
      toast.error(`Chek chop etishda tarmoq yoki server xatosi`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Kassir Hisoboti</h2>
        <Link className="btn btn-primary cursor-pointer" to="/">
          Orqaga
        </Link>
      </div>

      <button
        onClick={ReportPrint}
        className="btn btn-success text-white m-4 cursor-pointer"
      >
        ХИСОБОТНИ ПЕЧАТЬ ҚИЛИШ
      </button>
      <div className="mb-4 p-4 border rounded shadow bg-white">
        <p>
          <strong>Ism:</strong> {data?.name}
        </p>
        <p>
          <strong>Roli:</strong> {data?.role}
        </p>
        <p>
          <strong>Boshlanish sanasi:</strong> {data?.start_date}
        </p>
        <p>
          <strong>Hozirgi sana:</strong> {data?.now_date}
        </p>
        <p>
          <strong>Jami tushum:</strong> {data?.total_sum} so'm
        </p>
      </div>

      {/* Hisobot jadvali */}
      <div className="bg-white shadow-md rounded p-4">
        <h3 className="text-xl font-semibold mb-3">To'lovlar</h3>
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>#</th>
              <th>Miqdor</th>
              <th>To'lov turi</th>
              <th>Sana</th>
            </tr>
          </thead>
          <tbody>
            {data?.payments?.map((payment, index) => (
              <tr key={payment.type}>
                <td>{index + 1}</td>
                <td>{payment?.total} so'm</td>
                <td>{payment?.type}</td>
                <td>{data?.now_date}</td>
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
