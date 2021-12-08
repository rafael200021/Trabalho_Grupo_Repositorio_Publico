import React,{useState} from 'react'
import busca from "./img/search.svg";
import cancelar from "./img/cancelar.svg";
import { Link,useHistory} from 'react-router-dom';

export default function Busca() {
    const [buscar,setBusca] = useState("");

    let pagina = useHistory();

    return (
        <div className="flex w-full items-center h-1/6 justify-center flex-row">
        <input
          onChange={(e)=>setBusca(e.target.value)}
          value={buscar}
          type="text"
          placeholder="Pesquise por times"
          className="w-2/6 p-2 border-t border-b border-l border-black outline-none"
        />
      
        <button onClick={()=>{pagina.replace(`/busca/${buscar}`);window.document.location.reload()}} className="border-t border-b p-2 border-black bg-white">
          <img width="24px" src={busca}/>
        </button>
 
        <button onClick={()=>setBusca("")} className="border-t border-b border-r p-2 border-black bg-white">
          <img width="24px" src={cancelar}/>
        </button>
      </div>
    )
}
