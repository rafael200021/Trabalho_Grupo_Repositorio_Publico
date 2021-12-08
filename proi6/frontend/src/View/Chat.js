import React, { useState, useEffect } from "react";
export default function Chat({ socket, usuario, sala }) {
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState([]);

  const enviarMensagem = async () => {
    if (mensagem !== "") {
      const dadosMensagem = {
        sala: sala,
        usuario: usuario,
        mensagem: mensagem,
        horario:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("enviar_mensagem", dadosMensagem);
      setChat((mensagens) => [...mensagens, dadosMensagem]);
    }
  };

  useEffect(() => {
    socket.on("mensagens_recebidas", (dados) => {
      setChat((mensagens) => [...mensagens, dados]);
    });
  }, [socket]);

  return (
    <div>
      <div className="w-full p-4 bg-gray-800 text-white font-bold text-lg rounded">
        <p>Chat</p>
      </div>
      <div
        style={{ maxHeight: "550px", height: "550px" }}
        className="overflow-y-scroll p-2"
      >
        {chat.map((mensagem) => {
          return (
            <div
              className="w-full flex"
              id={usuario === mensagem.usuario ? "eu2" : "outro2"}
            >
              <div>
                <div className="flex">
                  <p class="font-bold">{mensagem.usuario}</p>
                  <p class="ml-3 font-light">{mensagem.horario}</p>
                </div>
                <div
                  className="border"
                  id={usuario === mensagem.usuario ? "eu" : "outro"}
                >
                  <p>{mensagem.mensagem}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row w-full">
        <input
          type="text"
          placeholder="Digite a mensagem aqui ..."
          className="w-10/12 lg:w-11/12 outline-none border border-gray-800 p-3"
          value={mensagem}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              enviarMensagem();
              setMensagem("");
            }
          }}
          onChange={(e) => {
            setMensagem(e.target.value);
          }}
        />
        <button
          onClick={() => {
            enviarMensagem();
            setMensagem("");

          }}
          className="p-2 border flex items-center justify-center border-gray-800 w-2/12 lg:w-1/12 bg-gray-800 text-white hover:text-gray-800 hover:bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
