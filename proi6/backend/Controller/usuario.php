<?php 

    class Usuario{
        
        private $id,$nome,$usuario,$senha,$email;

        function __construct($id,$nome,$usuario,$senha,$email){
            
            $this->id = $id;
            $this->nome = $nome;
            $this->usuario = $usuario;
            $this->senha = password_hash($senha,PASSWORD_DEFAULT);
            $this->email = $email;

        } 

        function setId($id){

            $this->id = $id;

        }

        function setNome($nome){

            $this->nome = $nome;

        }

        function setUsuario($usuario){

            $this->usuario = $usuario;

        }

        function setSenha($senha){

            $this->senha = password_hash($senha,PASSWORD_DEFAULT);

        }

        function setEmail($email){

            $this->email = $email;

        }

        function getId(){

            return $this->id;
            
        }

        function getUsuario(){

            return $this->usuario;

        }

        function getNome(){

            return $this->nome;

        }

        function getEmail(){

            return $this->email;

        }

        function getSenha(){

            return $this->senha;

        }
    }


?>