<?php

require_once "usuario.php";
require_once "../Model/usuarioD.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

$_POST = json_decode(file_get_contents("php://input"),true);

try{

    $usuario = new Usuario(null,null,$_POST['usuario'],null,null);

    $usuarioD = new UsuarioD();

    $resultado = $usuarioD->read($usuario);

    $verificado = false;

    if(isset($resultado)){

        if($_POST['usuario'] == $resultado['usuario']){

            if(password_verify($_POST['senha'],$resultado['senha'])){

                $verificado = true;

            }else{

                throw new Exception($verificado);

            }
        }else{

            throw new Exception($verificado);

        }

    }else{

        throw new Exception($verificado);

    }

    $valor = json_encode(array("code" => 1, "result" => $verificado,"usuario"=>$resultado['usuario'],"nome"=>$resultado['nome'],"email"=>$resultado['email'],"id"=>$resultado['id']));
    echo $valor;

}catch(Exception $erro){

    $valor = json_encode(array("code" => 0, "result" => $erro));
    echo $valor;

}
?>