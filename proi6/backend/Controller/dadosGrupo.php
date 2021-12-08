<?php

require_once "../Model/grupoD.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

try{

    $grupoD = new GrupoD();

    $resultados = $grupoD->readGrupoId($_POST['id']);

    $flag = 0;

    $verificar = false;

    foreach($resultados as $resultado){

        if($resultado['id_Usuario'] == $_POST['id_Usuario']){

            $flag = 1;

        }

    }

    if($flag == 1){
        $verificar = true;
    }

    $valor = json_encode(array("code" => 0, "result" => $verificar));

    echo $valor; 

}catch(Exception $erro){


   $valor = json_encode(array("code" => 0, "result" => "Erro no cadastro: ".$erro));

   echo $valor;
}

?>