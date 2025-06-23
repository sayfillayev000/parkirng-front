import { useEffect, useContext, useRef } from "react";
import { WebsocketContext } from "../context/WebsocketContext";

const env = import.meta.env;
const WEBSOCKET_URL = `${env.VITE_WEBSOCKET_SCHEME}://${env.VITE_WEBSOCKET_HOST}:${env.VITE_WEBSOCKET_PORT}`;

const useWebSocket = () => {
  const { dispatch } = useContext(WebsocketContext);
  const socketRef = useRef(null); // reconnect uchun socket saqlab turamiz

  useEffect(() => {
    const kpp = JSON.parse(localStorage.getItem("selectedKpp"));
    if (!kpp) return;

    const connect = () => {
      socketRef.current = new WebSocket(WEBSOCKET_URL);

      socketRef.current.onopen = () => {
        console.log("✅ WebSocket ulanib bo‘ldi");
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data?.kpp_id === kpp?.id) {
          dispatch({
            type: data?.type === "enter" ? "renderEnter" : "renderExit",
            payload: data,
          });
        }
      };

      socketRef.current.onerror = (e) => {
        console.error("❌ WebSocket xatosi:", e);
      };

      socketRef.current.onclose = () => {
        console.warn("🔄 WebSocket yopildi. 5s dan so‘ng qayta ulanadi...");
        setTimeout(() => connect(), 5000); // ✅ hook emas, connect funksiyasi chaqirilmoqda
      };
    };

    connect();

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, [dispatch]);
};

export default useWebSocket;
