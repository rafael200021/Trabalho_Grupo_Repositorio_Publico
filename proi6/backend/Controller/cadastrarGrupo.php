<?php

require_once "grupo.php";
require_once "../Model/grupoD.php";

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

    $grupo = new Grupo(0,$_POST['nomeGrupo'],$_POST['criador']);

    $grupoD = new GrupoD();

    $grupoD->create($grupo,$novoArquivo,$_POST['idTime']);

    $valor = json_encode(array("code" => 1, "result" => "Sucesso"));

    echo $valor;

}catch(Exception $erro){


   $valor = json_encode(array("code" => 0, "result" => "Erro no cadastro: ".$erro));

   echo $valor;
}

?>