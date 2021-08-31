import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import io from "socket.io-client";

function App() {
  const [data, setdata] = useState([]);
  const [onOff, setOnOff] = useState(false);
  const socket = useRef(io("ws://localhost:8900"));

  useEffect(() => {
    socket.current.on("devices", (data) => {
      setdata(data);
    });
  }, [socket]);
console.log(data)
  return (
    <div className="App">
      <h1>Realtime USB Device Monitoring</h1>

      {/* <button
        onClick={() => {
          setOnOff(!onOff);
          socket.current.emit("stop", onOff);
        }}
      >
        {onOff ? "Off" : "On"}
      </button> */}

      <div className="container">
        {data.map((usb) => {
          return (
            <div className="card">
              <span>{"Loaction Id: "+usb.locationId}</span>
              <span>{"Vendor Id: "+usb.vendorId}</span>
              <span>{"Product Id: "+usb.productId}</span>
              <span>{"Device Name: "+usb.deviceName}</span>
              <span>{"Manufacturer: "+usb.manufacturer}</span>
              <span>{"Serial Number: "+usb.serialNumber}</span>
              <span>{"Device Address: "+usb.deviceAddress}</span>
            </div>
          );
        })}
      </div>

     
    </div>
  );
}

export default App;
