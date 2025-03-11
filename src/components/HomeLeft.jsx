import React, { useEffect, useState } from "react";
import api from "../api/api";

const HomeLeft = ({ renderEnter }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const kpp = JSON.parse(localStorage.getItem("selectedKpp"));
    if (!kpp) return;

    api
      .get(`get_latest_device_logs?limit=10&kpp_id=${kpp.id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [renderEnter]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-1/3 bg-gray-100 p-4 flex flex-col items-center text-center rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">КИРИШ</h1>
      <button
        onClick={handlePrint}
        className="btn btn-primary text-white px-6 py-3 mt-4 rounded-lg w-full"
      >
        КИРИШ БИЛЕТИНИ ПЕЧАТЬ КИЛИШ
      </button>
      <button
        onClick={handlePrint}
        className="btn btn-secondary text-white px-6 py-3 mt-2 rounded-lg w-full"
      >
        ХИЗМАТ УЧУН
      </button>
      {/* {JSON.stringify(renderEnter)} */}
      {renderEnter && (
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Turi</th>
              <th className="border border-gray-300 px-4 py-2">
                Davlat raqami
              </th>
              <th className="border border-gray-300 px-4 py-2">Xabar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                {renderEnter?.type}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {renderEnter?.plate}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {renderEnter?.message}
              </td>
            </tr>
          </tbody>
          {/* <img
            src={`http://localhost:8000/storage/${renderEnter.file}car.jpg`}
            className="w-8 h-8"
            alt={renderEnter.file}
          /> */}
        </table>
      )}
      <div className="overflow-x-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Oxiri kirgan Avtomabillar</h2>
        <table className="table w-full border-collapse border border-gray-300">
          <tbody>
            {data?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-2xl text-center">
                  {item.plate} <br />
                  {item.event_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeLeft;
