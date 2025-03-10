import React from "react";

const HomeRight = ({ renderExit }) => {
  return (
    <div className="w-2/3 bg-white p-4 flex flex-col items-center rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">ЧИҚИШ</h1>
      {renderExit ? (
        renderExit.success ? (
          <>
            <h2 className="text-4xl font-bold mt-2">{renderExit.plate}</h2>
            <h1 className="text-5xl text-gray-600 mt-4">
              {renderExit?.exit_mode}
            </h1>
            <h1 className="text-3xl text-red-700 mt-4">
              {" "}
              {renderExit?.message}
            </h1>
            <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg">
              ШЛАГБАУННИ ОЧИВОРИШ ЧИҚИШГА УЛГУРМАГАН БЎЛСА
            </button>
            <table className="w-full mt-6 border border-gray-300 rounded-lg text-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border">Id</th>
                  <th className="p-3 border">КИРИШ</th>
                  <th className="p-3 border">ЧИҚИШ</th>
                  <th className="p-3 border">Summa</th>
                  <th className="p-3 border">Minut</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="p-3 border text-4xl">{renderExit?.id}</td>
                  <td className="p-3 border text-4xl">
                    {renderExit?.enter_date}
                  </td>
                  <td className="p-3 border text-4xl">
                    {renderExit?.exit_date}
                  </td>
                  <td className="p-3 border text-4xl">{renderExit?.summa}</td>
                  <td className="p-3 border text-4xl">{renderExit?.minutes}</td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-red-400">
                <th className="border border-gray-300 px-4 py-2">Id</th>
                <th className="border border-gray-300 px-4 py-2">Turi</th>
                <th className="border border-gray-300 px-4 py-2">
                  Davlat raqami
                </th>
                <th className="border border-gray-300 px-4 py-2">KPP ID</th>
                <th className="border border-gray-300 px-4 py-2">Kamera IP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  {renderExit?.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {renderExit?.type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {renderExit?.plate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {renderExit?.kpp_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {renderExit?.camera_ip}
                </td>
              </tr>
            </tbody>
          </table>
        )
      ) : (
        <div className="text-center mt-4 p-4 bg-yellow-100 text-yellow-700 rounded-lg shadow">
          <h2 className="text-xl font-bold">Маълумот йўқ</h2>
          <p className="text-lg">Ҳозирча маълумот келмади</p>
        </div>
      )}
    </div>
  );
};

export default HomeRight;
