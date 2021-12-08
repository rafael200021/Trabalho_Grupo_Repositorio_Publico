import React from "react";
import Menu from "../components/Menu";
import Tela1 from "../components/Inicio/Tela1.js";
import Tela2 from "../components/Inicio/Tela2.js";
import Tela3 from "../components/Inicio/Tela3.js";
import Tela4 from "../components/Inicio/Tela4.js";
import Tela5 from "../components/Inicio/Tela5.js";

export default function Inicio() {
  return (
    <div className="h-screen border">
      <Menu pagina="inicio" />
      <Tela1 />
      <Tela2 />
      <Tela3 />
      <Tela4 />
      <Tela5 />
    </div>
  );
}
