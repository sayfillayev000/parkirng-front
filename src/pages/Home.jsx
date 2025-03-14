import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeLeft, HomeRight, Navbar } from "../components";
const env = import.meta.env;

const WEBSOCKET_URL = `${env.VITE_WEBSOCKET_SCHEME}://${env.VITE_WEBSOCKET_HOST}:${env.VITE_WEBSOCKET_PORT}`;

const Home = () => {
  const navigate = useNavigate();
  const [kpps, setKpps] = useState(null);
  const [socketData, setSocketData] = useState(null);
  const [renderEnter, setRenderEnter] = useState(null);
  const [renderExit, setRenderExit] = useState(null);

  useEffect(() => {
    const storedKpp = JSON.parse(localStorage.getItem("selectedKpp"));
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!storedKpp) {
      navigate("/kpp");
    } else if (!user) {
      navigate("/cashiers");
    }
  }, []);

  useEffect(() => {
    if (socketData?.kpp_id === kpps?.id) {
      if (socketData?.type === "enter") {
        setRenderEnter(socketData);
      } else if (socketData?.type === "exit") {
        setRenderExit(socketData);
      }
    }
  }, [socketData]);

  useEffect(() => {
    if (!kpps) return;

    const connectWebSocket = () => {
      const websocket = new WebSocket(WEBSOCKET_URL);

      websocket.onopen = () => console.log("✅ WebSocket ulanib bo'ldi");

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data?.kpp_id == kpps?.id) {
          setSocketData(data);
        }
      };

      websocket.onerror = (error) =>
        console.error("❌ WebSocket xatosi:", error);

      websocket.onclose = () => {
        // console.log("🔄 WebSocket yopildi. 5 soniyadan keyin qayta ulanadi...");
        setTimeout(() => {
          connectWebSocket();
        }, 5000);
      };

      return websocket;
    };

    const wsInstance = connectWebSocket();
    return () => wsInstance.close();
  }, [kpps]);

  return (
    <>
      <Navbar />
      <div className="flex h-[91.6%] w-full">
        <HomeLeft renderEnter={renderEnter} />
        <HomeRight renderExit={renderExit} />
      </div>
    </>
  );
};

export default Home;
