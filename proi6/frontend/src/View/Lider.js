import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Busca from "../components/Busca";
import Footer from "../components/Footer";
import Avatar from "../components/img/avatar.svg";

import axios from "axios";
import Carregando from "../components/Carregando";
import { useHistory, useParams } from "react-router-dom";

export default function Lider(props) {
  let pagina = useHistory();
  const [usuarios, setUsuarios] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("usuario")) {
      pagina.push("/");
    }
    if (props.pagina == "time") {
      const formulario = new FormData();

      formulario.append("id", id);
      axios
        .post(
          "http://127.0.0.1/ProjetoGrupos/Controller/chamarUsuariosTime.php",
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
          "http://127.0.0.1/ProjetoGrupos/Controller/chamarUsuariosGrupo.php",
          formulario
        )
        .then((res) => {
          console.log(res.data.result[0]);
          setUsuarios(res.data.result[0]);
        });
    }
  }, []);

  const passarLiderTime = (idUsuario) => {
    const formulario = new FormData();

    formulario.append("id_Time", id);
    formulario.append("id_Usuario", idUsuario);
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/passarLiderTime.php",
        formulario
      )
      .then((res) => {
        console.log(res.data.result[0]);
      });

    pagina.replace(`/time/${id}`);
    window.document.location.reload();
  };

  const passarLiderGrupo = (idUsuario) => {
    const formulario = new FormData();

    formulario.append("id_Grupo", id);
    formulario.append("id_Usuario", idUsuario);
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/passarLiderGrupo.php",
        formulario
      )
      .then((res) => {
        console.log(res.data.result[0]);
      });

    pagina.replace(`/grupo/${id}`);
    window.document.location.reload();
  };

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
                <p>Passar Liderança</p>
              </div>
              <div
                style={{ maxHeight: "500px", height: "500px" }}
                className="border overflow-y-scroll p-10 rounded-b-box  w-8/12 shadow-2xl"
              >
                {usuarios.map((usuario) => {
                  if (usuario.id != localStorage.getItem("id")) {
                    return (
                      <div className="w-full mt-5 border flex flex-col lg:flex-row p-10 justify-evenly items-center rounded-lg border-gray-200">
                        <div className="w-full lg:w-4/12">
                          <img
                            width="100px"
                            className="mask mask-circle"
                            src={
                              usuario.imagem == null
                                ? Avatar
                                : `../.././Imagens/${usuario.imagem}`
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
                                ? passarLiderTime(usuario.id)
                                : passarLiderGrupo(usuario.id);
                            }}
                            className="bg-green-400 lg:mr-1 w-20 text-white p-2 rounded-lg font-bold hover:bg-green-600"
                          >
                            Passar Líder
                          </button>
                        </div>
                      </div>
                    );
                  }
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
