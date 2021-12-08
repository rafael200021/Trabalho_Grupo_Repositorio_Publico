<?php

require_once "../Model/timeD.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

try{

    $timeD = new TimeD();

    $timeD->deleteAutorizar($_POST['id_Usuario'],$_POST['id_Time']);

    $valor = json_encode(array("code" => 0, "result" => "Sucesso"));

    echo $valor; 

}catch(Exception $erro){


   $valor = json_encode(array("code" => 0, "result" => "Erro no cadastro: ".$erro));

   echo $valor;
}

?>