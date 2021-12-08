import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import LoginImg from "../components/img/Login.svg";
import Footer from "../components/Footer.js";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  let pagina = useHistory();

  useEffect(() => {
    
    if(localStorage.getItem('usuario')){

      pagina.push("/gerenciar");

    }    
  }, [])

  const login = () => {
    axios
      .post("http://127.0.0.1/ProjetoGrupos/Controller/login.php", {
        usuario: usuario,
        senha: senha,
      })
      .then(function (response) {
        if (response.data.result === true) {
          localStorage.setItem("usuario",response.data.usuario);
          localStorage.setItem("nome",response.data.nome);
          localStorage.setItem("email",response.data.email);
          localStorage.setItem('id',response.data.id);
          pagina.push("/gerenciar");
        } else {
          throw "Senha ou Usuário incorretos";
        }
      })
      .catch(function (error) {
        NotificationManager.error(error,"Erro!");
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Menu pagina="login" />
      <div className="flex justify-center">
        <div
          style={{ height: "660px" }}
          className="w-full lg:w-1/2 m-5 justify-center items-center flex"
        >
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-col bg-white w-full lg:w-7/12 min-h-1/2 shadow-lg p-20">
              <h1 className="font-bold text-lg text-center">Faça seu login</h1>

              <input
                placeholder="Insira o nome de usuário"
                className="mt-4 border p-2"
                type="text"
                onChange={(e) => {
                  setUsuario(e.target.value);
                }}
                value={usuario}
              />
              <input
                placeholder="Insira sua senha"
                className="mt-4  border p-2"
                type="password"
                onChange={(e) => {
                  setSenha(e.target.value);
                }}
                value={senha}
              />

              <button
                onClick={() => login()}
                className="btn btn-primary btn-md mt-5"
              >
                Fazer Login
              </button>
              <div className="mt-10 text-sm text-center">
                <a
                  className="link link-hover text-blue-600 mr-3 lg:mr-6"
                  src="#"
                >
                  Esqueceu a senha?
                </a>
                <label className="font-bold">|</label>
                <Link to="/registrar">
                  <a className="link link-hover text-blue-600 ml-3 lg:ml-6">
                    Criar uma Conta
                  </a>
                </Link>
              </div>
            </div>
            <div className="mt-4 text-sm  text-center">
              <a className="link link-hover text-blue-600 mr-6" src="#">
                Política de Privacidade
              </a>
              <label className="font-bold">|</label>
              <a className="link link-hover text-blue-600 ml-6">
                Termos de serviço
              </a>
            </div>
          </div>
        </div>
        <div className="w-1/2 hidden lg:flex justify-center items-center">
          <img className="w-8/12" src={LoginImg} alt="Login Imagem" />
        </div>
      </div>
      <NotificationContainer/>
      <Footer />
    </div>
  );
}
