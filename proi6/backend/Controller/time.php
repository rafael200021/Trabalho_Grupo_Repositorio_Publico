<?php 

    class Time{
        
        private $id,$nome,$nMembros,$nMaxMembros,$criador;

        function __construct($id,$nome,$nMembros,$nMaxMembros,$criador,$descricao){
            
            $this->id = $id;
            $this->nome = $nome;
            $this->nMembros = $nMembros;
            $this->nMaxMembros = $nMaxMembros;
            $this->criador = $criador;
            $this->descricao = $descricao;

        } 

        function setId($id){

            $this->id = $id;

        }

        function setNome($nome){

            $this->nome = $nome;

        }

        function setDescricao($descricao){

            $this->descricao = $descricao;

        }

        function setNMembros($nMembros){

            $this->nMembros = $nMembros;

        }

        function setNMaxMembros($nMaxMembros){

            $this->nMaxMembros = $nMaxMembros;

        }

        function setCriador($criador){

            $this->criador = $criador;

        }

        function getId(){

            return $this->id;
            
        }

        function getNMembros(){

            return $this->nMembros;

        }

        function getNome(){

            return $this->nome;

        }

        function getNMaxMembros(){

            return $this->nMaxMembros;

        }

        function getCriador(){

            return $this->criador;

        }

        function getDescricao(){

            return $this->descricao;

        }
    }


?>