<?php

require_once "../Model/grupoD.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

try{

    $grupoD = new GrupoD();

    $grupoD->sairGrupo($_POST['id'],$_POST['id_Time'],$_POST['id_Grupo']);

    $valor = json_encode(array("code" => 0, "result" => "sucesso"));

    echo $valor; 

}catch(Exception $erro){


   $valor = json_encode(array("code" => 0, "result" => "Erro no cadastro: ".$erro));

   echo $valor;
}

?>