import React from 'react'
import Busca from "../components/Busca";
import Footer from "../components/Footer";
import Menu from './Menu';
export default function Carregando() {
    return (
        <div>
             <div className="bg-gray-50 min-h-screen">
      <Menu pagina="logado" />
      <div
        className="h-full flex justify-center flex-col items-center"
        style={{ height: "800px" }}
      >
        <Busca />
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-5/6 h-full flex flex-row shadow-2xl justify-center items-center bg-white rounded">
          </div>
        </div>
      </div>
      <Footer />
    </div>
        </div>
    )
}
