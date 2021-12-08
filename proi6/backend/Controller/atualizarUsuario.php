<?php

require_once "usuario.php";
require_once "../Model/usuarioD.php";

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

    $usuario = new Usuario($_POST['id'],$_POST['nome'],$_POST['usuario'],$_POST['senha'],$_POST['email']);
    
    $usuarioD = new UsuarioD();
    
    $usuarioD->update($usuario,$novoArquivo);

    $valor = json_encode(array("code" => 1, "result" => "Sucesso no cadastro","nome"=>$_POST['nome'],"usuario"=>$_POST['usuario']));

    echo $valor;

}catch(Exception $erro){


   $valor = json_encode(array("code" => 0, "result" => "Erro no cadastro: ".$erro));

   echo $valor;
}

?>