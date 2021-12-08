const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Usuario Conectado: ${socket.id}`);
  socket.on("entrar_sala", (dados) => {
    socket.join(dados);
    console.log(`Usuário com o ID: ${socket.id} entrou na sala: ${dados}`);
  });
  socket.on("enviar_mensagem", (dados) => {
      console.log(dados);
    socket.to(dados.sala).emit("mensagens_recebidas", dados);
  });
  socket.on("disconnect", () => {
    console.log("Usuário Desconectou", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Escutando na porta 4000");
});
