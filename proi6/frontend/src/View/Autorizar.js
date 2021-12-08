import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Busca from "../components/Busca";
import Footer from "../components/Footer";
import Avatar from "../components/img/avatar.svg";

import axios from "axios";
import Carregando from "../components/Carregando";
import { useHistory, useParams } from "react-router-dom";

export default function Autorizar(props) {
  let pagina = useHistory();
  const [usuarios, setUsuarios] = useState(null);

  const { id, idTime } = useParams();

  const autorizarUsuarioTime = (idUsuario) => {
    const formulario = new FormData();

    formulario.append("id_Usuario", idUsuario);
    formulario.append("id_Time", id);
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/autorizarUsuarioTime.php",
        formulario
      )
      .then((res) => {
        console.log(res);
        const formulario2 = new FormData();
        formulario2.append("id", id);
        axios
          .post(
            "http://127.0.0.1/ProjetoGrupos/Controller/chamarAutorizarTime.php",
            formulario2
          )
          .then((res) => {
            console.log(res.data.result[0]);
            setUsuarios(res.data.result[0]);
          });
      });
  };

  const rejeitarUsuarioTime = (idUsuario) => {
    const formulario = new FormData();

    formulario.append("id_Usuario", idUsuario);
    formulario.append("id_Time", id);
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/rejeitarUsuarioTime.php",
        formulario
      )
      .then((res) => {
        console.log(res);
        const formulario2 = new FormData();
        formulario2.append("id", id);
        axios
          .post(
            "http://127.0.0.1/ProjetoGrupos/Controller/chamarAutorizarTime.php",
            formulario2
          )
          .then((res) => {
            console.log(res.data.result[0]);
            setUsuarios(res.data.result[0]);
          });
      });
  };

  const rejeitarUsuarioGrupo = (idUsuario) => {
    const formulario = new FormData();

    formulario.append("id_Usuario", idUsuario);
    formulario.append("id_Grupo", id);
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/rejeitarUsuarioGrupo.php",
        formulario
      )
      .then((res) => {
        const formulario2 = new FormData();

        formulario2.append("id", id);
        axios
          .post(
            "http://127.0.0.1/ProjetoGrupos/Controller/chamarAutorizarGrupo.php",
            formulario2
          )
          .then((res) => {
            console.log(res.data.result[0]);
            setUsuarios(res.data.result[0]);
          });
      });
  };

  const autorizarUsuarioGrupo = (idUsuario) => {
    const formulario = new FormData();

    formulario.append("id_Usuario", idUsuario);
    formulario.append("id_Grupo", id);
    formulario.append("id_Time",idTime);
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/autorizarUsuarioGrupo.php",
        formulario
      )
      .then((res) => {
        const formulario2 = new FormData();

        formulario2.append("id", id);
        axios
          .post(
            "http://127.0.0.1/ProjetoGrupos/Controller/chamarAutorizarGrupo.php",
            formulario2
          )
          .then((res) => {
            console.log(res.data.result[0]);
            setUsuarios(res.data.result[0]);
          });
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("usuario")) {
      pagina.push("/");
    }
    if (props.pagina == "time") {
      const formulario = new FormData();

      formulario.append("id", id);
      axios
        .post(
          "http://127.0.0.1/ProjetoGrupos/Controller/chamarAutorizarTime.php",
          formulario
        )
        .then((res) => {
          console.log(res.data.result[0]);
          setUsuarios(res.data.result[0]);
        });
    }
    if (props.pagina == "grupo") {
      const formulario = new FormData();

      formulario.append("id", id);
      axios
        .post(
          "http://127.0.0.1/ProjetoGrupos/Controller/chamarAutorizarGrupo.php",
          formulario
        )
        .then((res) => {
          console.log(res.data.result[0]);
          setUsuarios(res.data.result[0]);
        });
    }
  }, []);

  if (usuarios != null) {
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
              className="w-5/6 flex flex-col justify-center items-center shadow-2xl bg-white rounded p-10"
            >
              <div className="w-8/12 bg-gray-900 p-5 text-white text-center font-bold text-lg rounded-t-box">
                <p>Autorizar Usuários</p>
              </div>
              <div
                style={{ maxHeight: "500px", height: "500px" }}
                className="border overflow-y-scroll p-10 rounded-b-box  w-8/12 shadow-2xl"
              >
                {usuarios.map((usuario) => {
                  return (
                    <div className="w-full mt-5 border flex flex-col lg:flex-row p-10 justify-evenly items-center rounded-lg border-gray-200">
                      <div className="w-full lg:w-4/12">
                        <img
                          width="100px"
                          className="mask mask-circle"
                          src={
                            usuario.imagem == null
                              ? Avatar
                              : `../../.././Imagens/${usuario.imagem}`
                          }
                          alt="avatar"
                        />
                      </div>
                      <div className="w-full lg:w-4/12 flex flex-col justify-center items-center text-sm lg:text-lg">
                        <p className="mt-5">Nome: {usuario.nome}</p>
                        <p className="mt-5">Usuário: {usuario.usuario}</p>
                      </div>
                      <div className="w-full mt-2 lg:mt-0 lg:w-4/12 flex flex-col lg:flex-row justify-center items-center">
                        <button
                          onClick={() => {
                            props.pagina == "time"
                              ? autorizarUsuarioTime(usuario.id)
                              : autorizarUsuarioGrupo(usuario.id);
                          }}
                          className="bg-green-400 lg:mr-1 w-20 text-white p-2 rounded-lg font-bold hover:bg-green-600"
                        >
                          Aceitar
                        </button>
                        <button
                          onClick={() => {
                            props.pagina == "time"
                              ? rejeitarUsuarioTime(usuario.id)
                              : rejeitarUsuarioGrupo(usuario.id);
                          }}
                          className="bg-red-400 mt-1 lg:mt-0 lg:ml-1 w-20 text-white p-2 rounded-lg font-bold hover:bg-red-600"
                        >
                          Rejeitar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <Carregando />;
  }
}
