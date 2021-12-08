<?php

require_once "../Model/usuarioD.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

try{

    $usuarioD = new usuarioD();

    $usuarioD->delete($_POST['id']);

    $valor = json_encode(array("code" => 0, "result" => "Sucesso"));

    echo $valor; 

}catch(Exception $erro){


   $valor = json_encode(array("code" => 0, "result" => "Erro no cadastro: ".$erro));

   echo $valor;
}

?>