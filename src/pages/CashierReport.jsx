import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

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
  const ReportPrint = () => {
    window.print();
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
              <tr key={payment.id}>
                <td>{index + 1}</td>
                <td>{payment.total} so'm</td>
                <td>{payment.type}</td>
                <td>{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashierReport;
