<?php

require_once "connect.php";

    class UsuarioD{

        function create(Usuario $usuario){

            $sql = "INSERT INTO Usuario (usuario,nome,senha,email) VALUES (?,?,?,?)";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$usuario->getUsuario());
            $bd->bindValue(2,$usuario->getNome());
            $bd->bindValue(3,$usuario->getSenha());
            $bd->bindValue(4,$usuario->getEmail());

            $bd->execute();

        }

        function readUsuarioID($id){

            $sql = "SELECT * FROM Usuario WHERE id = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultado = $bd->fetchALL(PDO::FETCH_ASSOC);

        
                return $resultado[0];
      

        }

        public function delete($id){

            $sql = "DELETE FROM Usuario WHERE id = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

        }


        function update(Usuario $usuario,$imagem){

            $sql = "UPDATE Usuario SET nome = ?, usuario = ?, senha = ?, email = ?, imagem = ? WHERE id = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$usuario->getNome());
            $bd->bindValue(2,$usuario->getUsuario());
            $bd->bindValue(3,$usuario->getSenha());
            $bd->bindValue(4,$usuario->getEmail());
            $bd->bindValue(5,$imagem);
            $bd->bindValue(6,$usuario->getId());

            $bd->execute();

        }

        function read(Usuario $usuario){

            $sql = "SELECT id,usuario,senha,nome,email FROM Usuario WHERE usuario = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$usuario->getUsuario());

            $bd->execute();

            $resultado = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultado[0];
            
        }

    }

?>