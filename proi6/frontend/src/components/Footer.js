import React from "react";
import Logo from "./img/Logo.png";

export default function Footer() {
  return (
    <div className="flex flex-col w-full text-sm mt-20 justify-center items-center">
      <img className="w-20" src={Logo} alt="Logo" />
      <p>© Copyright 2021. Todos os direitos reservados.</p>
    </div>
  );
}
