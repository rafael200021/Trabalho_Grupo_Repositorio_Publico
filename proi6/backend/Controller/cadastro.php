<?php

require_once "usuario.php";
require_once "../Model/usuarioD.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

try{

    $_POST = json_decode(file_get_contents("php://input"),true);

    
    if(!isset($_POST['nome'])){

        throw new Exception("Valores nulos");

    }

    $usuario = new Usuario(null,$_POST['nome'],$_POST['usuario'],$_POST['senha'],$_POST['email']);
    
    $usuarioD = new UsuarioD();
    
    $usuarioD->create($usuario);

    $valor = json_encode(array("code" => 1, "result" => "Sucesso no cadastro"));

    echo $valor;

}catch(Exception $erro){


   $valor = json_encode(array("code" => 0, "result" => "Erro no cadastro: ".$erro));

   echo $valor;
}

?>