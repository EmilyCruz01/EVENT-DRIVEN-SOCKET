"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3005;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const server = app.listen(port, () => {
    console.log('api-ws-corriendo en el puerto 3005');
});
const io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: ["http://54.237.83.120", "http://34.199.77.210:80"] // Aquí debes agregar la URL de origen de tu aplicación cliente
    }
});
io.on('connection', socket => {
    socket.on('payment', pago => {
        console.log('payment success and sended to client: ', pago);
        io.emit('payment-processed', pago);
    });
    socket.on("connect_error", (error) => {
        console.error("Error de conexión:", error);
    });
    socket.on("disconnect", (reason) => {
        console.error("Desconectado:", reason);
    });
});
