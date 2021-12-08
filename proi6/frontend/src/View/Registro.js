import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import RegistroImg from "../components/img/Registro.svg";
import Footer from "../components/Footer.js";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function Registro() {
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [email, setEmail] = useState("");
  let pagina = useHistory();

  useEffect(() => {
    
    if(localStorage.getItem('usuario')){

      pagina.push("/gerenciar");

    }    
  }, [])

  const cadastrar = () => {
    if (senha === senha2 && usuario.length >= 4 && senha.length >= 6) {
      axios
        .post("http://127.0.0.1/ProjetoGrupos/Controller/cadastro.php", {
          nome: nome,
          usuario: usuario,
          senha: senha,
          email: email,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);

        });

        pagina.push("/logar");
      } else {
        NotificationManager.error("Possuí algum erro no seu cadastro!","Erro");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Menu pagina="registro" />
      <div className="flex justify-center">
        <div
          style={{ height: "660px" }}
          className="w-full m-5 lg:w-1/2  justify-center items-center flex"
        >
          <div className="flex flex-col bg-white w-full lg:w-7/12 min-h-1/2 shadow-lg p-20">
            <h1 className="font-bold text-lg text-center">Crie sua conta</h1>

            <input
              placeholder="Insira o nome de usuário"
              className="mt-4 border p-2"
              type="text"
              minLength="4"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              placeholder="Insira o e-mail"
              className="mt-4 border p-2"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Insira o seu nome"
              className="mt-4 border p-2"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              placeholder="Insira sua senha"
              className="mt-4  border p-2"
              minLength="6"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <input
              placeholder="Confirme sua senha"
              className="mt-4  border p-2"
              minLength="6"
              type="password"
              value={senha2}
              onChange={(e) => setSenha2(e.target.value)}
            />
            <p className="mt-5 font-extralight text-sm text-justify">
              Ao se cadastrar, você confirma que leu e aceitou nossos{" "}
              <a className="link link-hover text-blue-600">Termos de serviço</a>{" "}
              e nossa{" "}
              <a className="link link-hover text-blue-600">
                Política de privacidade
              </a>
            </p>

            <button
              onClick={() => cadastrar()}
              className="btn btn-primary btn-md mt-5"
            >
              Continuar
            </button>
            <div className="mt-10 text-center">
              <Link to="/logar">
                <a
                  className="link text-sm link-hover text-blue-600 mr-6"
                  src="#"
                >
                  Já possui uma conta? Entre
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/2 hidden lg:flex justify-center items-center">
          <img className="w-8/12" src={RegistroImg} alt="Login Imagem" />
        </div>
      </div>
      <NotificationContainer/>
      <Footer />
    </div>
  );
}
