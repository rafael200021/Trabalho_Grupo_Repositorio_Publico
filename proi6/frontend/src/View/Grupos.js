import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Busca from "../components/Busca";
import Footer from "../components/Footer";
import Perfil from "../components/Perfil";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Grupos() {
  const [grupos, setGrupos] = useState();

  let pagina = useHistory();

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
  }, []);
  if (grupos != null) {
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
          <div className="flex h-full w-full items-center justify-center">
            <div style={{minHeight:"700px"}} className="w-5/6 flex flex-col lg:flex-row shadow-2xl bg-white rounded p-10">
              <Perfil />
              <div className=" w-full flex flex-col justify-center items-center ">
                <div className="w-full lg:mt-0 mt-5  lg:w-5/6 h-5/6 border bg-gray-200 rounded p-20 shadow-2xl flex flex-col">
                  <div className="font-bold text-lg">

                    <p>Grupos que faz parte</p>

                  </div>
                  <div className="flex flex-col lg:flex-row mt-10">
                  {grupos.map((grupo) => {
                    return (
                      <div className="flex flex-col lg:mr-4 justify-center items-center">
                        <Link to={`grupo/${grupo.id}`}>
                          <img
                            className="mask mask-circle w-40 mb-3"
                            src={`.././Imagens/${grupo.imagem}`}
                          />
                        </Link>
                        {grupo.nome}
                      </div>
                    );
                  })}
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
    return <div>Carregando ...</div>;
  }
}
