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
        setExitMode(res.data);
        setIsOpen(true);
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
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Payment Types</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <ul className="space-y-3 max-h-60 overflow-y-auto">
          {exitMode?.map((item) => (
            <li
              key={item.id}
              onClick={() => confirm(item.id)}
              className="p-3 border rounded-lg shadow-sm bg-gray-50 cursor-pointer 
                       hover:bg-gray-100 hover:text-blue-700 hover:shadow-md 
                       transition duration-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
              ) : (
                <>
                  <div className="font-medium text-lg">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    Pay Status: {item.pay_status}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentType;
