<?php

require_once "../Model/timeD.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

try{

    $timeD = new TimeD();

    $resultados = $timeD->readTimeBusca($_POST['busca']);

    $valor = json_encode(array("code" => 1,"busca"=> $_POST['busca'], "result" => array($resultados)));

    echo $valor; 

}catch(Exception $erro){


   $valor = json_encode(array("code" => 0, "result" => "Erro no cadastro: ".$erro));

   echo $valor;
}

?>