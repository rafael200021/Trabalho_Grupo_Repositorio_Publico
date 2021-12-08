import React from 'react'
import { Link } from "react-router-dom";

export default function Tela4() {
    return (
        <div id="saiba" style={{minHeight:"600px"}} className="bg-white flex flex-col lg:flex-row p-20  items-center ">

            <div className="w-full lg:w-1/2 text-justify">
                <h1 className="font-bold text-2xl">Saiba mais ...</h1>
                <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="w-full mt-20 lg:mt-0 lg:w-1/2 flex justify-center text-white">
            <Link to="/registrar"><button className="btn btn-primary btn-outline font-bold mr-4 p-2 w-40 rounded-md shadow-lg hover:bg-blue-800 text-sm lg:text-md">Registrar-se</button></Link>
            <Link to="/logar"><button className=" btn btn-primary btn-outline font-bold mr-4 p-2 w-40 rounded-md shadow-lg hover:bg-blue-800 text-sm lg:text-md">Entrar</button></Link>


                </div>
        </div>
    )
}
