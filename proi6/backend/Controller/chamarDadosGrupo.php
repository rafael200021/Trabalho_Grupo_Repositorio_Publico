<?php

require_once "../Model/grupoD.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

try{

    $grupoD = new GrupoD();

    $resultados = $grupoD->readGrupoCompleto($_POST['id']);

    $valor = json_encode(array("code" => 0, "result" => array($resultados)));

    echo $valor; 

}catch(Exception $erro){


   $valor = json_encode(array("code" => 0, "result" => "Erro no cadastro: ".$erro));

   echo $valor;
}

?>