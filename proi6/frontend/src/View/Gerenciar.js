import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Busca from "../components/Busca";
import Footer from "../components/Footer";
import Perfil from "../components/Perfil";
import Time from "../components/img/time.jpg";
import Grupo from "../components/img/grupo.jpg";
import axios from "axios";
import Carregando from "../components/Carregando";
import TimeImg from "../components/img/time.jpg";
import { Link, useHistory } from "react-router-dom";

export default function Gerenciar() {
  let pagina = useHistory();
  const [grupos, setGrupos] = useState(null);
  const [times, setTimes] = useState(null);
  const [todos,setTodos] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("usuario")) {
      pagina.push("/");
    }
    const formulario = new FormData();

    formulario.append("id", localStorage.getItem("id"));
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/chamarGrupoUsuario.php",
        formulario
      )
      .then((res) => {
        console.log(res.data.result[0]);
        setGrupos(res.data.result[0]);
      });

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/chamarTimes.php",
        formulario
      )
      .then((res) => {
        console.log(res.data.result[0]);
        setTimes(res.data.result[0]);
      });

      axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/chamarTodosTimes.php",
      )
      .then((res) => {
        console.log(res.data.result[0]);
        setTodos(res.data.result[0]);
      });
  }, []);

  if (grupos != null && times != null && todos != null) {
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
            <div style={{minHeight:"700px"}} className="w-5/6 flex flex-col lg:flex-row shadow-2xl bg-white rounded p-10">
              <Perfil />
              <div className=" w-full flex flex-col justify-center items-center ">
                <div className="w-full lg:mt-0 mt-5 justify-evenly lg:w-5/6 h-5/6 border bg-gray-200 rounded p-20 shadow-2xl flex flex-col lg:flex-row">
                  <div className="flex w-full lg:w-3/6">
                    <div className="flex flex-col justify-center items-center text-lg">
                      <Link to="/grupo">
                        <img
                          className="mask mask-circle w-full lg:w-full"
                          src={Grupo}
                          alt="Grupo"
                        />
                      </Link>
                      <p className="font-bold mt-2 mb-2">{grupos.length}</p>
                      <p>Grupos</p>
                    </div>
                    <div className="flex flex-col justify-center items-center text-lg">
                      <Link to="/time">
                        <img
                          className="mask mask-circle w-full lg:w-full"
                          src={Time}
                          alt="Grupo"
                        />
                      </Link>
                      <p className="font-bold mt-2 mb-2">{times.length}</p>
                      <p>Times</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/6 mt-5 lg:mt-0 flex flex-col text-lg text-center items-center">
                    <p>Times públicos recomendados</p>

                    <div className="lg:overflow-y-auto overflow-x-auto lg:max-h-64 flex flex-row lg:flex-col">
                      {todos.map((times) => {
                        return (
                          <div>
                            <Link to={`/time/${times.id}`}>
                            <img
                              className="mask mask-circle w-20 lg:mt-5 mt-0"
                              title={times.nome}
                              src={
                                times.imagem == null
                                  ? TimeImg
                                  : `.././Imagens/${times.imagem}`
                              }
                            />
                            </Link>
                          </div>
                        );
                      })}
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
    return <Carregando />;
  }
}
