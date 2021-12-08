import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import imgTime from "../components/img/imagemTime.svg";
import Busca from "../components/Busca.js";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function Cadastrar(props) {
  let pagina = useHistory();
  const { id } = useParams();

  const [imagem, setImagem] = useState(null);
  const [nMembros, setMembros] = useState(0);
  const [nomeTime, setNomeTime] = useState("");
  const [nGrupo, setGrupos] = useState(0);
  const [desc,setDesc] = useState("");
  const [nomeGrupo, setNomeGrupo] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState(localStorage.getItem("nome"));
  const [user, setUser] = useState(localStorage.getItem("usuario"));
  const [emailUsuario, setEmailUsuario] = useState(
    localStorage.getItem("email")
  );
  const [senhaUsuario, setSenhaUsuario] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("usuario")) {
      pagina.push("/");
    }
  }, []);

  const cadastrarTime = () => {
    
    const formulario = new FormData();
    formulario.append("img", imagem);
    formulario.append("nomeTime", nomeTime);
    formulario.append("numeroMembros", nMembros);
    formulario.append("numeroGrupo", nGrupo);
    formulario.append("descricao",desc);
    formulario.append("criador", localStorage.getItem("id"));

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/cadastrarTime.php",
        formulario
      )
      .then((res) => {
        console.log(res);
      });

      pagina.replace(`/time`);
      window.document.location.reload();
  };

  const editarTime = () => {
    const formulario = new FormData();

    formulario.append("id", id);
    formulario.append("img", imagem);
    formulario.append("nomeTime", nomeTime);
    formulario.append("numeroMembros", nMembros);
    formulario.append("numeroGrupo", nGrupo);
    formulario.append("criador", localStorage.getItem("id"));

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/editarTime.php",
        formulario
      )
      .then((res) => {
        console.log(res);
      });

      pagina.replace(`/time/${id}`);

  };

  const atualizarUsuario = () => {

    const formulario = new FormData();

    formulario.append("img", imagem);
    formulario.append("nome", nomeUsuario);
    formulario.append("usuario", user);
    formulario.append("email", emailUsuario);
    formulario.append("senha", senhaUsuario);
    formulario.append("id", localStorage.getItem("id"));

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/atualizarUsuario.php",
        formulario
      )
      .then((res) => {
        console.log(res);

      });

      pagina.replace("/gerenciar");

  };

  const cadastrarGrupo = () => {
    const formulario = new FormData();

    formulario.append("img", imagem);
    formulario.append("nomeGrupo", nomeGrupo);
    formulario.append("idTime", id);
    formulario.append("criador", localStorage.getItem("id"));

    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/cadastrarGrupo.php",
        formulario
      )
      .then((res) => {
        console.log(res);
      });

      pagina.replace(`/time/${id}`);

  };

  const time = (tipo) => {
    return (
      <div className="w-full lg:w-4/6 flex flex-col justify-center items-center ">
        <div className="mt-2 mb-3 w-3/4 flex flex-col">
          <label className="self-start">Nome do Time</label>
          <input
            type="text"
            value={nomeTime}
            onChange={(e) => {
              setNomeTime(e.target.value);
            }}
            className="input input-bordered mt-2"
          />
        </div>
        <div className="mt-2 mb-3 w-3/4 flex flex-col">
          <label>Descrição</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            className="input input-bordered mt-2 "
          />
        </div>
        <div className="mt-2 mb-3 w-3/4 flex flex-col">
          <label>Número máximo de membros</label>
          <input
            type="number"
            value={nMembros}
            max='50'
            onChange={(e) => {
              setMembros(e.target.value);
            }}
            className="input input-bordered mt-2 "
          />
        </div>
        <div className="mt-2 mb-3 w-3/4 flex flex-col">
          <label>Número de membros por grupo</label>

          <input
            type="number"
            value={nGrupo}
            onChange={(e) => {
              setGrupos(e.target.value);
            }}
            max="50"
            className="input input-bordered mt-2  "
          />
        </div>

        <button
          onClick={() => {
            tipo != "editar" ? cadastrarTime() : editarTime();
          }}
          className="btn btn-primary mt-14 shadow-lg"
        >
          Criar Time
        </button>

      </div>
    );
  };

  const grupo = () => {
    return (
      <div className="w-full lg:w-4/6 flex flex-col justify-center items-center ">
        <div className="mt-2 mb-3 w-3/4 flex flex-col">
          <label className="self-start">Nome do Grupo</label>
          <input
            type="text"
            value={nomeGrupo}
            onChange={(e) => {
              setNomeGrupo(e.target.value);
            }}
            className="input input-bordered mt-2"
          />
        </div>

        <button
          onClick={() => cadastrarGrupo()}
          className="btn btn-primary mt-14 shadow-lg"
        >
          Criar Grupo
        </button>
      </div>
    );
  };

  const usuario = () => {
    return (
      <div className="w-full lg:w-4/6 flex flex-col justify-center items-center ">
        <div className="mt-2 mb-3 w-3/4 flex flex-col">
          <label className="self-start">Nome</label>
          <input
            onChange={(e) => setNomeUsuario(e.target.value)}
            type="text"
            minLength="4"
            value={nomeUsuario}
            className="input input-bordered mt-2"
          />
        </div>
        <div className="mt-2 mb-3 w-3/4 flex flex-col">
          <label>Usuário</label>
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            value={user}
            className="input input-bordered mt-2 "
          />
        </div>
        <div className="mt-2 mb-3 w-3/4 flex flex-col">
          <label>E-mail</label>
          <input
            onChange={(e) => setEmailUsuario(e.target.value)}
            type="text"
            value={emailUsuario}
            className="input input-bordered mt-2  "
          />
        </div>
        <div className="mt-2 mb-3 w-3/4 flex flex-col">
          <label>Senha</label>
          <input
            type="password"
            minLength="6"
            className="input input-bordered mt-2"
            onChange={(e) => setSenhaUsuario(e.target.value)}
            value={senhaUsuario}
          />
        </div>

        <button
          onClick={() => {
            atualizarUsuario();
          }}
          className="btn btn-primary mt-10 shadow-lg"
        >
          Editar Usuário
        </button>
      </div>
    );
  };

  const definirPagina = (pagina) => {
    if (pagina == "grupo") {
      return grupo();
    } else if (pagina == "time") {
      return time(props.tipo);
    } else {
      return usuario();
    }
  };

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
            <div className="w-full lg:w-2/6 p-5 lg:p-0 flex flex-col justify-center items-center ">
              <img width="200px" src={imgTime} alt="imagem do time" />
              <input
                className="mt-14"
                onChange={(e) => {
                  setImagem(e.target.files[0]);
                }}
                type="file"
              />
            </div>
            {definirPagina(props.pagina)}
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
}
