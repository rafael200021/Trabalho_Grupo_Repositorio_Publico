import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Busca from "../components/Busca";
import Footer from "../components/Footer";
import axios from "axios";
import Avatar from "../components/img/avatar.svg";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function Time() {
  const [perfil, setPerfil] = useState(0);
  const [time, setTime] = useState(null);
  const [grupos, setGrupos] = useState(null);
  const [semGrupo, setSemGrupo] = useState(null);
  const [verificaUsuario, setVerificaUsuario] = useState(null);
  const [permissaoGrupo, setPermisaoGrupo] = useState(false);

  let pagina = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("usuario")) {
      pagina.push("/");
    }

    const formulario = new FormData();

    formulario.append("id", id);

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/mostrarTime.php",
        formulario
      )
      .then((res) => {
        console.log(res.data.result[0]);
        setTime(res.data.result[0]);

        if (res.data.result[0].fk_Id_Usuario == localStorage.getItem("id")) {
          setPerfil(1);
        } else {
          setPerfil(2);
        }
      });

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/semGrupo.php",
        formulario
      )
      .then((res) => {
        console.log(res);
        setSemGrupo(res.data.result[0]);
      });

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/chamarGrupos.php",
        formulario
      )
      .then((res) => {
        console.log(res);
        setGrupos(res.data.result[0]);
      });

    const formulario2 = new FormData();

    formulario2.append("id", id);
    formulario2.append("id_Usuario", localStorage.getItem("id"));
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/dadosTime.php",
        formulario2
      )
      .then((res) => {
        console.log(res.data.result);

        setVerificaUsuario(res.data.result);
      });

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/verificaGrupo.php",
        formulario2
      )
      .then((res) => {
        console.log(res);
        setPermisaoGrupo(res.data.result);
      });
  }, []);

  const sairTime = () => {

    const formulario = new FormData();

    formulario.append("id", localStorage.getItem("id"));
    formulario.append("id_Time", id);
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/sairTime.php",
        formulario
      )
      .then((res) => {
        console.log(res);
        pagina.push('/gerenciar');
        window.document.location.reload();
      });

  }

  const solicitar = () => {
    const formulario = new FormData();

    formulario.append("id", localStorage.getItem("id"));
    formulario.append("id_Time", id);
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/solicitarTime.php",
        formulario
      )
      .then((res) => {
        console.log(res.data.result);
        NotificationManager.success("Solicitação realizada !", "Sucesso");
      });
  };

  const solicitarGrupo = (idGrupo) => {
    const formulario = new FormData();

    console.log(idGrupo);

    formulario.append("id", localStorage.getItem("id"));
    formulario.append("id_Grupo", idGrupo);

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/solicitarGrupo.php",
        formulario
      )
      .then((res) => {
        console.log(res);
      });
  };

  const deletarTime = () => {
    const formulario = new FormData();
    formulario.append("id", id);
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/deletarTime.php",
        formulario
      )
      .then((res) => {
        console.log(res.data.result);
      });

    pagina.push("/gerenciar");
  };

  const paginaCarregar = (valor) => {
    if (valor == 1) {
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
                  <div class="bg-gray-200 rounded shadow-lg flex flex-row lg:flex-col lg:w-1/6 w-full text-center justify-evenly items-center p-5">
                    <div>
                      <p>Integrantes Restantes</p>
                    </div>
                    <div className="lg:overflow-y-auto overflow-x-auto lg:max-h-40 flex flex-row lg:flex-col">
                      {semGrupo.map((semGrupo) => {
                        return (
                          <div>
                            <img
                              className="mask mask-circle w-20 lg:mt-5 mt-0"
                              alt="avatar"
                              title={semGrupo.nome}
                              src={
                                semGrupo.imagem == null
                                  ? Avatar
                                  : `.././Imagens/${semGrupo.imagem}`
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div>
                    {permissaoGrupo === true ? (
                        <button onClick={()=>{sairTime()}} className="text-sm  border p-3 bg-blue-600 text-white rounded hover:bg-blue-900">
                          Sair do time
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-200 flex flex-col items-center justify-evenly mt-5 lg:mt-0 w-full lg:w-4/6 rounded shadow-lg">
                    <div className="w-11/12 h-5/6 mt-5 lg:mt-0 bg-white rounded shadow-lg flex justify-center items-center flex-col p-10">
                      <p className="font-bold">Grupos</p>
                      <div className="flex flex-col lg:flex-row mt-5">
                        {grupos.map((grupo) => {
                          return (
                            <Link to={`/grupo/${grupo.id}`}>
                              <div className="flex flex-col lg:mr-4 items-center">
                                <img
                                  className="mask mask-circle w-20 lg:w-40 mt-5 lg:mt-0"
                                  alt="imagemGrupo"
                                  src={`.././Imagens/${grupo.imagem}`}
                                />
                                <p className="font-extralight text-sm text-gray-400">
                                  {grupo.nome}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:justify-evenly w-full mt-5 lg:mt-0 items-center">
                      <div className="w-full lg:w-8/12 flex justify-center">
                        <Link to={`/time/editar/${id}`}>
                          <button className="text-sm border p-3 bg-blue-600 text-white rounded hover:bg-blue-900">
                            Editar Time
                          </button>
                        </Link>
                        <Link to={`/time/${id}/autorizar`}>
                          <button className="text-sm border bg-blue-600 text-white rounded p-3 hover:bg-blue-900">
                            Autorizar Usuários
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            deletarTime();
                          }}
                          className="text-sm border bg-blue-600 text-white rounded p-3 hover:bg-blue-900"
                        >
                          Deletar Time
                        </button>
                        <Link to={`/time/${id}/lider`}>
                          <button className="text-sm border bg-blue-600 text-white rounded p-3 hover:bg-blue-900">
                            Passar Liderança
                          </button>
                        </Link>
                      </div>

                      <div className="flex w-full lg:w-4/12 flex-col items-center text-justify text-sm justify-center">
                        <p>Nº Grupos: {grupos.length}</p>
                        <p>Nº Membros: {time.num_Membros}</p>
                        <p>Nº Máximo de membros: {time.num_Membros_Maximo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else if (valor == 2 && verificaUsuario == true) {
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
                  <div class="bg-gray-200 rounded shadow-lg flex flex-row lg:flex-col lg:w-1/6 w-full text-center justify-evenly items-center p-5">
                    <div>
                      <p>Integrantes Restantes</p>
                    </div>
                    <div className="lg:overflow-y-auto overflow-x-auto lg:max-h-40 flex flex-row lg:flex-col">
                      {semGrupo.map((semGrupo) => {
                        return (
                          <div>
                            <img
                              className="mask mask-circle w-20 lg:mt-5 mt-0"
                              title={semGrupo.nome}
                              src={
                                semGrupo.imagem == null
                                  ? Avatar
                                  : `.././Imagens/${semGrupo.imagem}`
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div>
                    {permissaoGrupo === true ? (
                        <button onClick={()=>{sairTime()}} className="text-sm  border p-3 bg-blue-600 text-white rounded hover:bg-blue-900">
                          Sair do time
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-200 flex flex-col items-center justify-evenly mt-5 lg:mt-0 w-full lg:w-4/6 rounded shadow-lg">
                    <div className="w-11/12 h-5/6 mt-5 lg:mt-0 bg-white rounded shadow-lg flex justify-center items-center flex-col p-10">
                      <p className="font-bold">Grupos</p>
                      <div className="flex flex-col lg:flex-row mt-5">
                        {grupos.map((grupo) => {
                          return (
                            <div>
                              <Link to={`/grupo/${grupo.id}`}>
                                <div className="flex flex-col lg:mr-4 items-center">
                                  <img
                                    className="mask mask-circle w-20 lg:w-40 mt-5 lg:mt-0"
                                    src={`.././Imagens/${grupo.imagem}`}
                                  />
                                  <p className="font-extralight text-sm text-gray-400">
                                    {grupo.nome}
                                  </p>
                                </div>
                              </Link>
                              {semGrupo.map((usuario) => {
                                if (
                                  usuario.fk_Id_Usuario ==
                                  localStorage.getItem("id")
                                ) {
                                  return (
                                    <div className="flex justify-center items-center lg:mr-4 mt-2">
                                      <button
                                        onClick={() => {
                                          solicitarGrupo(grupo.id);
                                        }}
                                        className="text-sm  border p-3 bg-blue-600 text-white rounded hover:bg-blue-900"
                                      >
                                        Solicitar Participação
                                      </button>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex lg:flex-row flex-col justify-evenly w-full mt-5 lg:mt-0 items-center">
                      {grupos.length <
                      Math.floor(
                        parseInt(time.num_Membros) /
                          parseInt(time.num_Membros_Maximo)
                      ) ? (
                        permissaoGrupo === true ? (
                          <Link to={`/grupo/cadastrar/${id}`}>
                            <button className="text-sm  border p-3 bg-blue-600 text-white rounded hover:bg-blue-900">
                              Criar Grupo
                            </button>
                          </Link>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                     
                      <div className="flex flex-col items-center text-justify text-sm justify-center">
                        <p>Nº Grupos: {grupos.length}</p>
                        <p>Nº Membros: {time.num_Membros}</p>
                        <p>Nº Máximo de membros: {time.num_Membros_Maximo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <div className="flex  w-full items-center justify-center ">
              <div
                style={{ minHeight: "700px" }}
                className="w-5/6 justify-center flex flex-col lg:flex-row shadow-2xl bg-white rounded p-10"
              >
                <div className="flex flex-col justify-center border-gray-50  items-center mt-5">
                  <img
                    className="mask mask-circle w-32"
                    src={`.././Imagens/${time.imagem}`}
                    alt="timeImagem"
                  />
                  <h1 className="font-bold text-2xl">Descrição</h1>
                  <div className="border border-gray-300 shadow-lg p-4 mt-4 mb-4">
                    <p style={{ maxWidth: "400px" }}>{time.descricao}</p>
                  </div>
                  <button
                    onClick={() => {
                      solicitar();
                    }}
                    className="border rounded bg-blue-700 p-2 text-white hover:bg-blue-900"
                  >
                    Solicitar Participação
                  </button>
                </div>
              </div>
            </div>
          </div>
          <NotificationContainer />

          <Footer />
        </div>
      );
    }
  };

  if (
    time != null &&
    grupos !== null &&
    semGrupo != null &&
    verificaUsuario != null &&
    permissaoGrupo != null
  ) {
    return <div>{paginaCarregar(perfil)}</div>;
  } else {
    return <div>Carregando</div>;
  }
}
