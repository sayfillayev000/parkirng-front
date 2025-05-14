import React, { useEffect } from "react";
import onScan from "onscan.js";

function BarcodeScanner({ setIsOpenQr, confirm }) {
  useEffect(() => {
    onScan.attachTo(document, {
      suffixKeyCodes: [13],
      onScan: (code) => {
        setIsOpenQr(false);
        confirm(null, false, code);
      },
    });

    return () => {
      onScan.detachFrom(document);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex flex-col items-center justify-center p-6">
      <div className="relative p-8 bg-white border border-gray-300 rounded-2xl shadow-lg max-w-xl w-full text-center">
        <button
          className="absolute top-4 right-4 text-3xl cursor-pointer text-gray-500 hover:text-black font-bold"
          onClick={() => setIsOpenQr(false)}
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-2xl font-bold mb-4 text-black">📦 QR Коде</h3>
        <p className="text-lg text-gray-700">
          Илтимос QR кодни сканер қилинг...
        </p>
        <progress className="progress progress-primary w-full mt-6 h-4" />
      </div>
    </div>
  );
}
export default BarcodeScanner;
