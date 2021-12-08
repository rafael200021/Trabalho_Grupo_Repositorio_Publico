import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Busca from "../components/Busca";
import Footer from "../components/Footer";
import Perfil from "../components/Perfil";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

export default function Buscar() {
  let pagina = useHistory();

  const [timeBusca, setTimeBusca] = useState(null);


  const {query} = useParams();

  useEffect(() => {
    if (!localStorage.getItem("usuario")) {
      pagina.push("/");
    }

    const formulario = new FormData();

    formulario.append("busca", query);

    axios
      .post("http://127.0.0.1/ProjetoGrupos/Controller/busca.php", formulario)
      .then((res) => {
        console.log(res.data.result[0]);
        setTimeBusca(res.data.result[0]);
      });
  }, []);
  if (timeBusca != null) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Menu pagina="logado" />
        <div
          className="h-full flex mt-10 flex-col items-center"
          style={{ minHeight: "800px" }}
        >
          <Busca />
          <div className="flex flex-col h-full w-full p-20">
            <h1 className="text-4xl font-bold">Resultado da busca: </h1>

            {timeBusca.map((time) => {
              return (
                <div className="mt-10 border w-full p-20">
                  <h1 className="text-2xl font-bold">Time {time.nome} </h1>
                  <p className="mt-4 font-light">
                    {time.descricao}
                  </p>
                  <button
                    onClick={() => {
                      pagina.push(`/time/${time.id}`);
                    }}
                    className="btn btn-primary mt-5"
                  >
                    Verificar
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <div>Carregando</div>;
  }
}
