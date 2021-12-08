<?php

require_once "time.php";
require_once "../Model/timeD.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

try{

    $arquivo = $_FILES["img"];

    $nomeImagem = $arquivo['name'];

    $erro = $arquivo['error'];

    $caminho = $arquivo['tmp_name'];

    $separarNomes = explode('.',$nomeImagem);
    $tipo = strtolower(end($separarNomes));

    $novoArquivo = uniqid().".".$tipo;
    
    $destino = "C:/Users/Computador/Downloads/Projeto-Criar-Grupos/proi6/frontend/public/Imagens/".$novoArquivo;

    move_uploaded_file($caminho,$destino);

    $time = new Time(0,$_POST['nomeTime'],$_POST['numeroMembros'],$_POST['numeroGrupo'],$_POST['criador'],$_POST['descricao']);

    $timeD = new TimeD();

    $timeD->create($time,$novoArquivo);

    $valor = json_encode(array("code" => 1, "result" => "Sucesso"));

    echo $valor;

}catch(Exception $erro){


   $valor = json_encode(array("code" => 0, "result" => "Erro no cadastro: ".$erro));

   echo $valor;
}

?>