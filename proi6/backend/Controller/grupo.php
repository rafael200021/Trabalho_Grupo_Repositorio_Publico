<?php 

    class Grupo{
        
        private $id,$nome,$nMembros,$nMaxMembros,$criador;

        function __construct($id,$nome,$criador){
            
            $this->id = $id;
            $this->nome = $nome;
            $this->criador = $criador;

        } 

        function setId($id){

            $this->id = $id;

        }

        function setNome($nome){

            $this->nome = $nome;

        }

        function setCriador($criador){

            $this->criador = $criador;

        }

        function getId(){

            return $this->id;
            
        }

        function getNome(){

            return $this->nome;

        }

        function getCriador(){

            return $this->criador;

        }

    }


?>