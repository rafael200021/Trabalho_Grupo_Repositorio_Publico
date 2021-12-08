import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import Avatar from "./img/avatar.svg";
import axios from 'axios';

export default function Perfil() {

  const [usuario,setUsuario] = useState(null);

  useEffect(() => {
    
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
  }, [])

  if(usuario!=null){
    return (
        <div className="sm:w-full lg:w-2/6 flex flex-col justify-center items-center">
              <img width="200px" className="mask mask-circle" src={usuario.imagem == null?Avatar:`.././Imagens/${usuario.imagem}`} alt="avatar" />
              <div className="border p-2 mt-4 w-3/4 bg-gray-50 mb-4">
                <p>Nome: {usuario.nome}</p>
              </div>
              <div className="border p-2 mt-4 w-3/4 bg-gray-50 mb-4">
                <p>Usuário: {usuario.usuario}</p>
              </div>
              <div className="border p-2 mt-4 w-3/4 bg-gray-50 mb-4">
                <p>E-mail: {usuario.email}</p>
              </div>
              <Link to="usuario/editar">
              <button className="btn mt-4 btn-primary shadow-lg">Editar Perfil</button>
              </Link>
            </div>
    );}else{
      return <div>Carregando</div>
    }
}
