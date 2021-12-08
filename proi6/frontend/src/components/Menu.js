import React, { useState, useEffect } from "react";
import Logo from "./img/Logo.png";
import { Link } from "react-router-dom";
import Avatar from "./img/avatar.svg";
import axios from "axios";
export default function Menu(props) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("nome")) {
      const formulario = new FormData();
      formulario.append("id", localStorage.getItem("id"));
      axios
        .post(
          "http://127.0.0.1/ProjetoGrupos/Controller/dadosUsuario.php",
          formulario
        )
        .then((res) => {
          console.log(res);
          setUsuario(res.data.result[0]);
        });
    }
  }, []);

  const desconectar = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("nome");
    localStorage.removeItem("email");
    localStorage.removeItem("id");

    window.location.reload();
  };

  const deletarUsuario = () => {
    const formulario = new FormData();
    formulario.append("id", localStorage.getItem("id"));
    axios
      .post(
        "http://127.0.0.1/ProjetoGrupos/Controller/deletarUsuario.php",
        formulario
      )
      .then((res) => {
        console.log(res);
        localStorage.removeItem("usuario");
        localStorage.removeItem("nome");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        window.location.reload();

      });

  }

  const botoesInicio = () => {
    if (localStorage.getItem("usuario")) {
      return (
        <div>
          <Link to="/gerenciar">
            <button className="btn btn-outline btn-primary font-bold w-40 mr-4 p-2 rounded-md shadow-lg hover:bg-blue-800 lg:block hidden">
              Gerenciar times
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="flex">
          <Link to="/logar">
            <button className="btn btn-outline btn-primary font-bold w-40 mr-4 p-2 rounded-md shadow-lg hover:bg-blue-800 lg:block hidden">
              Entrar
            </button>
          </Link>

          <Link to="/registrar">
            <button className="btn btn-outline btn-primary font-bold w-40 mr-4 p-2 rounded-md shadow-lg hover:bg-blue-800 lg:block hidden">
              Registrar-se
            </button>
          </Link>
        </div>
      );
    }
  };

  const inicio = () => {
    return (
      <ul className="flex flex-row text-white items-center w-full justify-end">
        <li className="text-blue-400 font-bold mr-5 hover:text-blue-500 lg:block hidden">
          <a href="#sobre">Sobre</a>
        </li>

        <li className="text-blue-400 font-bold mr-5 hover:text-blue-500 lg:block hidden">
          <a href="#info">Informação</a>
        </li>
        <li className="text-blue-400 font-bold mr-20 hover:text-blue-500 lg:block hidden">
          <a href="#saiba">Saiba mais</a>
        </li>

        {botoesInicio()}

        <div className="text-black dropdown dropdown-end lg:hidden block">
          <div tabindex="0" className="btn btn-primary ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="white"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box"
          >
            <li>
              <Link to="/logar">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link to="/registrar">
                <a>Registro</a>
              </Link>
            </li>
          </ul>
        </div>
      </ul>
    );
  };

  const login = () => {
    return (
      <ul className="flex flex-row text-white items-center w-full justify-end">
        <Link to="/registrar">
          <button className="btn btn-outline btn-primary font-bold w-40 mr-4 p-2 rounded-md shadow-lg hover:bg-blue-800 lg:block hidden">
            Registrar-se
          </button>
        </Link>

        <div className="text-black dropdown dropdown-end lg:hidden block">
          <div tabindex="0" className="btn btn-primary ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="white"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box"
          >
            <li>
              <Link to="/registrar">
                <a>Registro</a>
              </Link>
            </li>
          </ul>
        </div>
      </ul>
    );
  };

  const registro = () => {
    return (
      <ul className="flex flex-row text-white items-center w-full justify-end">
        <Link to="/logar">
          <button className="btn btn-outline btn-primary font-bold w-40 mr-4 p-2 rounded-md shadow-lg hover:bg-blue-800 lg:block hidden">
            Entrar
          </button>
        </Link>

        <div className="text-black dropdown dropdown-end lg:hidden block">
          <div tabindex="0" className="btn btn-primary ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="white"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box"
          >
            <li>
              <Link to="/logar">
                <a>Login</a>
              </Link>
            </li>
          </ul>
        </div>
      </ul>
    );
  };

  const logado = () => {
    if (usuario != null) {
      return (
        <ul className="flex flex-row text-black items-center w-full justify-end">
          <div class="dropdown dropdown-end ">
            <div tabindex="0">
              <img
                width={"40px"}
                className="mask mask-circle"
                src={
                  usuario.imagem == null
                    ? Avatar
                    : `.././Imagens/${usuario.imagem}`
                }
                alt="avatar"
              />
            </div>
            <ul
              tabindex="0"
              class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40"
            >
              <li>
                <a onClick={() => desconectar()}>Logout</a>
              </li>
              <li>
                <a onClick={() => deletarUsuario()}>Deletar Conta</a>
              </li>
            </ul>
          </div>
        </ul>
      );
    } else {
      return <div>carregando</div>;
    }
  };

  return (
    <div className="w-full bg-white p-3">
      <div className="flex flex-row items-center">
        {props.pagina === "logado" ? (
          <Link to="/gerenciar">
            <button>
              <img className="w-24" src={Logo} alt="logo" />
            </button>
          </Link>
        ) : (
          <Link to="/">
            <button>
              <img className="w-24" src={Logo} alt="logo" />
            </button>
          </Link>
        )}

        {props.pagina === "inicio" || props.pagina === "logado" ? (
          ""
        ) : (
          <Link to="/">
            <a className="link link-hover text-blue-400 font-bold hover:text-blue-500 ml-10 ">
              Home
            </a>
          </Link>
        )}
        {props.pagina === "inicio" ? inicio() : ""}
        {props.pagina === "login" ? login() : ""}
        {props.pagina === "registro" ? registro() : ""}
        {props.pagina === "logado" ? logado() : ""}
      </div>
    </div>
  );
}
