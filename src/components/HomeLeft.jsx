import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { WebsocketContext } from "../context/WebsocketContext";

const HomeLeft = () => {
  const { state, dispatch } = useContext(WebsocketContext);
  const renderEnter = state.renderEnter;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [network, setNetwork] = useState(null);
  const [kpp_id, setKppId] = useState(
    JSON.parse(localStorage.getItem("selectedKpp"))?.id
  );
  useEffect(() => {
    api
      .get(`get_latest_device_logs?limit=10&kpp_id=${kpp_id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);
  const openBarier = () => {
    api
      .post(`open_barier/${renderEnter?.device_log_id}`)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setError(null);
        if (res.status == 200) {
          dispatch({
            type: "renderEnter",
            payload: null,
          });
          api
            .get(`get_latest_device_logs?limit=10&kpp_id=${kpp_id}`)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
        }
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
  };
  return (
    <div className="w-1/3 bg-gray-100 p-4 flex flex-col items-center text-center rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">КИРИШ</h1>

      {network && (
        <div className=" flex justify-center pt-5">
          <div className="text-red-500 bg-red-100 p-3 w-2xl text-center rounded-lg mb-4">
            ❌ {network}
          </div>
        </div>
      )}

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

      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <span className="loading loading-spinner loading-lg text-blue-500"></span>
          <span className="ml-2 text-blue-500">Юкланмоқда...</span>
        </div>
      )}
      {renderEnter && (
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                Davlat raqami
              </th>
              <th className="border border-gray-300 px-4 py-2">Xabar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                {renderEnter?.plate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={openBarier}
                  className="bg-blue-500 text-white  px-10 py-4 text-3xl rounded-lg cursor-pointer"
                >
                  КИРИТИШ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <div className="overflow-x-auto mt-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Охири кирган Автомабиллар</h2>
        <table className="table w-full border-collapse border border-gray-300">
          <tbody>
            {data?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-2xl text-center">
                  {item.plate} <br />
                  {item.enter_date}
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
