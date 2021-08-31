var usbDetect = require("usb-detection");

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

usbDetect.startMonitoring();

io.on("connection", (socket) => {
  usbDetect
    .find()
    .then(function (devices) {
      io.emit("devices", devices);
    })
    .catch(function (err) {
      console.log(err);
    });
});

// const sendData = (devices) => {
//   io.on("connection", (socket) => {
//     socket.on("stop", (s) => {
//       if (s) {
//         io.emit("devices", devices);
//       } else {
//         usbDetect.stopMonitoring();
//       }
//     });
//   });
// };

// io.on("connection",(socket)=>{

//     io.emit("welcome","it is working bitch") ;
//     socket.on('stop',(i)=>{
//         console.log(i)
//     })
// })
