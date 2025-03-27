import React, { useEffect, useState } from "react";
import api from "../../api/api";

const PaymentType = (props) => {
  const { setIsOpen, confirm, setIsLoading, isLoading, setError } = props;

  const [exitMode, setExitMode] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    api
      .get("exit_modes")
      .then((res) => {
        console.log(res.data);

        setExitMode(res.data);
        // setIsOpen(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data.message);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-10 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Тўлов тури</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-3xl"
          >
            ✕
          </button>
        </div>
        <ul className="space-y-6 max-h-96 overflow-y-auto">
          {exitMode?.map((item) => (
            <li
              key={item.id}
              onClick={() => confirm(item.id)}
              className="p-6 border rounded-lg shadow-sm bg-gray-50 cursor-pointer 
                       hover:bg-gray-100 hover:text-blue-700 hover:shadow-md 
                       transition duration-200"
            >
              {isLoading ? (
                <div className="w-9 h-9 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
              ) : (
                <>
                  <div className="font-medium text-3xl">{item.name}</div>
                  <div className="text-xl text-gray-500">
                    Тўлов статус: {item.pay_status}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PaymentType;
