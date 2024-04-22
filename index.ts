import express, { Express } from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

const app: Express = express();
const port: number = 3005;

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
  console.log('api-ws-corriendo en el puerto 3005');
});

const io: Server = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["*"] 
  }
});

io.on('connection', socket => {
  socket.on('orden-procesada', orden => {
    console.log('orden procesada y enviada: ', orden);
    io.emit('orden-procesada', orden);
  });

  socket.on("connect_error", (error) => {
    console.error("Error de conexión:", error);
  });

  socket.on("disconnect", (reason) => {
    console.error("Desconectado:", reason);
  });
});