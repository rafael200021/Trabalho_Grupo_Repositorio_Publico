import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Menu from "../components/Menu";
import Busca from "../components/Busca";
import Footer from "../components/Footer";
import axios from "axios";
import Chat from "./Chat";
import Carregando from "../components/Carregando";
import { Link, useHistory, useParams } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const socket = io.connect("http://localhost:4000");

export default function Grupo() {
  const [grupo, setGrupo] = useState(null);
  const [usuario, setUsuario] = useState(localStorage.getItem("nome"));
  const [dados, setDados] = useState(null);
  const { id } = useParams();
  const [sala, setSala] = useState(id);
  let pagina = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("usuario")) {
      pagina.push("/");
    }

    const formulario = new FormData();

    formulario.append("id", id);
    formulario.append("id_Usuario", localStorage.getItem("id"));
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/dadosGrupo.php",
        formulario
      )
      .then((res) => {
        console.log(res.data.result);

        setGrupo(res.data.result);

        entrarSala();
      });

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/chamarDadosGrupo.php",
        formulario
      )
      .then((res) => {
        console.log(res.data.result[0]);

        setDados(res.data.result[0]);

        entrarSala();
      });
  }, []);

  const deletarGrupo = () => {
    const formulario = new FormData();
    formulario.append("id", id);
    formulario.append("id_Time",dados[0].fk_Id_Times)

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/deletarGrupo.php",
        formulario
      )
      .then((res) => {
        console.log(res.data.result);

        pagina.push(`/time/${dados[0].fk_Id_Times}`);
      });
  };

  const sairGrupo = () => {
    if (dados[0].fk_Id_Usuario !== localStorage.getItem("id")) {
      const formulario = new FormData();
      formulario.append("id", localStorage.getItem("id"));
      formulario.append("id_Grupo", id);
      formulario.append("id_Time", dados[0].fk_Id_Times);

      axios
        .post(
          "http://127.0.0.1/ProjetoGrupos/Controller/sairGrupo.php",
          formulario
        )
        .then((res) => {
          console.log(res.data.result);

          pagina.push(`/time/${dados[0].fk_Id_Times}`);
        });
    } else {
           
      NotificationManager.warning('Se quiser sair do grupo sendo administrador passe a liderança para outro membro ou delete o grupo !', 'Aviso!', 3000);

    }
  };

  const entrarSala = () => {
    socket.emit("entrar_sala", sala);
  };

  if (grupo != null && dados != null) {
    if (grupo == true) {
      if (dados[0].fk_Id_Usuario === localStorage.getItem("id")) {
        return (
          <div className="bg-gray-50 min-h-screen">
            <Menu pagina="logado" />
            <div
              className="h-full flex justify-center flex-col items-center"
              style={{ minHeight: "800px" }}
            >
              <div className="m-5 w-full">
                <Busca />
              </div>
              <div className="flex  w-full items-center justify-center">
                <div
                  style={{ minHeight: "700px" }}
                  className="w-5/6 flex flex-col lg:flex-row shadow-2xl bg-white rounded p-10"
                >
                  <div className="flex flex-col lg:flex-row w-full justify-evenly">
                    <div class=" flex flex-row lg:flex-col lg:w-1/6 w-full text-center justify-evenly">
                      <div>
                        <Link to="/time">
                          <button className="text-sm lg:text-lg border  lg:w-48   p-3 bg-blue-600 text-white rounded hover:bg-blue-900">
                            Sair do chat
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            deletarGrupo();
                          }}
                          className="text-sm lg:text-lg border p-3 lg:w-48  bg-blue-600 text-white rounded hover:bg-blue-900"
                        >
                          Deletar Grupo
                        </button>
                      </div>
                      <div>
                        <Link to={`/grupo/${id}/autorizar/${dados[0].fk_Id_Times}`}>
                        <button
                          
                          className="text-sm lg:text-lg border p-3 lg:w-48  bg-blue-600 text-white rounded hover:bg-blue-900"
                        >
                          Autorizar Solicitação
                        </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            sairGrupo();
                          }}
                          className="text-sm lg:text-lg border lg:w-48   p-3 bg-blue-600 text-white rounded hover:bg-blue-900"
                        >
                          Sair do grupo
                        </button>
                      </div>
                      <div>
                        <Link to={`/grupo/${id}/lider`}>
                          <button className="text-sm lg:text-lg border lg:w-48   p-3 bg-blue-600 text-white rounded hover:bg-blue-900">
                            Passar liderança
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="bg-gray-200 mt-5 shadow-lg lg:mt-0 w-full lg:w-4/6">
                      <Chat socket={socket} usuario={usuario} sala={sala} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <NotificationContainer/>
            <Footer />
          </div>
        );
      } else {
        return (
          <div className="bg-gray-50 min-h-screen">
            <Menu pagina="logado" />
            <div
              className="h-full flex justify-center flex-col items-center"
              style={{ minHeight: "800px" }}
            >
              <div className="m-5 w-full">
                <Busca />
              </div>
              <div className="flex  w-full items-center justify-center">
                <div
                  style={{ minHeight: "700px" }}
                  className="w-5/6 flex flex-col lg:flex-row shadow-2xl bg-white rounded p-10"
                >
                  <div className="flex flex-col lg:flex-row w-full justify-evenly">
                    <div class=" flex flex-row lg:flex-col lg:w-1/6 w-full text-center justify-evenly">
                      <div>
                        <Link to="/time">
                          <button className="text-sm lg:text-lg border  lg:w-48   p-3 bg-blue-600 text-white rounded hover:bg-blue-900">
                            Sair do chat
                          </button>
                        </Link>
                      </div>

                      <div>
                        <button
                          onClick={() => {
                            sairGrupo();
                          }}
                          className="text-sm lg:text-lg border lg:w-48   p-3 bg-blue-600 text-white rounded hover:bg-blue-900"
                        >
                          Sair do grupo
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-200 mt-5 shadow-lg lg:mt-0 w-full lg:w-4/6">
                      <Chat socket={socket} usuario={usuario} sala={sala} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        );
      }
    } else {
      return (
        <div className="bg-gray-50 min-h-screen">
          <Menu pagina="logado" />
          <div
            className="h-full flex justify-center flex-col items-center "
            style={{ minHeight: "800px" }}
          >
            <div className="m-5 w-full">
              <Busca />
            </div>
            <div className="flex  w-full items-center justify-center filter blur-lg">
              <div
                style={{ minHeight: "700px" }}
                className="w-5/6 flex flex-col lg:flex-row shadow-2xl bg-white rounded p-10"
              >
                <div className="flex flex-col lg:flex-row w-full justify-evenly">
                  <div class="bg-gray-200 flex flex-row lg:flex-col shadow-lg lg:w-1/6 w-full text-center justify-evenly"></div>
                  <div className="bg-gray-200 mt-5 shadow-lg lg:mt-0 w-full lg:w-4/6">
                    <Chat socket={socket} usuario={usuario} sala={sala} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-2xl font-bold text-center text-red-500">
            Você não faz parte desse grupo !
          </p>

          <Footer />
        </div>
      );
    }
  } else {
    return <Carregando />;
  }
}
