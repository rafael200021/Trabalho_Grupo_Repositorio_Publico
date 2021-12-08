<?php

require_once "connect.php";

    class GrupoD{

        public function readGrupoTime($id){

            $sql = "SELECT * FROM Grupos WHERE fk_Id_Times = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;


        }

        public function readUsuarioSemGrupo($id){

            $sql = "SELECT * FROM Usuario u,SemGrupo sg WHERE sg.fk_Id_Times = ? AND sg.fk_Id_Usuario = u.id;";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;


        }

        public function readGrupoUsuario($id){

            $sql = "SELECT g.* FROM Grupos g, Grupos_Usuario gu WHERE g.id = gu.fk_Id_Grupos AND gu.fk_Id_Usuario = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;


        }

        public function readGrupo($nome){

            $sql = "SELECT id FROM Grupos WHERE nome = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$nome);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados[0];

        }

        public function readGrupoCompleto($id){
            
            $sql = "SELECT * FROM Grupos WHERE id = ?;  ";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;

        }

        public function delete($id,$idTime){

            $sql = "SELECT * FROM Grupos_Usuario WHERE fk_Id_Grupos = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            foreach($resultados as $resultado){

                $sql = "INSERT INTO SemGrupo (fk_Id_Usuario,fk_Id_Times) VALUES(?,?); ";

                $bd = connect::getConnect()->prepare($sql);
    
                $bd->bindValue(1,$resultado['fk_Id_Usuario']);
    
                $bd->bindValue(2,$idTime);
    
                $bd->execute();

            }

            $sql = "DELETE FROM Grupos WHERE id = ?;";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();
        }

        public function createSemGrupo($id,$time){

            $sql = "INSERT INTO SemGrupo (fk_Id_Usuario,fk_Id_Times) VALUES(?,?); ";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->bindValue(2,$time);

            $bd->execute();

        }

        public function createSolicitarGrupo($idUsuario,$idGrupo){

            $sql = "INSERT INTO AutorizarUsuarioGrupo(fk_Id_Usuario,fk_Id_Grupos) VALUES (?,?)";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$idUsuario);
            $bd->bindValue(2,$idGrupo);

            $bd->execute();

        }

        public function readAutorizarGrupo($id){

            $sql = "SELECT u.* FROM Usuario u, AutorizarUsuarioGrupo au WHERE au.fk_Id_Grupos = ? AND au.fk_Id_Usuario = u.id;";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;

        }

        public function readTodosUsuariosGrupo($id){

            $sql = "SELECT u.* FROM Usuario u,Grupos_Usuario tu WHERE tu.fk_Id_Grupos= ? AND tu.fk_Id_Usuario = u.id;";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;

        }

      public function sairGrupo($id,$time,$grupo){

            $sql = "DELETE FROM Grupos_Usuario WHERE fk_Id_Usuario = ? AND fk_Id_Grupos = ?; ";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->bindValue(2,$grupo);

            $bd->execute();

            $this->createSemGrupo($id,$time);

        }

        public function updateLider($idUsuario, $idGrupo){

            $sql = "UPDATE Grupos SET fk_Id_Usuario = ? WHERE id = ? ";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$idUsuario);

            $bd->bindValue(2,$idGrupo);

            $bd->execute();

        }


        public function readGrupoId($id){

            $sql = "SELECT fk_Id_Usuario AS id_Usuario FROM grupos_usuario gu WHERE gu.fk_Id_Grupos = ?;  ";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;

        }

        public function verificarGrupo($id,$idTime){

            $sql = "SELECT * FROM SemGrupo WHERE fk_Id_Usuario = ? AND fk_Id_Times = ?;";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);
            
            $bd->bindValue(2,$idTime);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            if(isset($resultados[0])){
                return true;
            }
            else{
                return false;
            }

        }

        public function createGrupoUsuario($idUsuario,$idGrupo){

            $sql = "INSERT INTO Grupos_Usuario (fk_Id_Usuario,fk_Id_Grupos) VALUES (?,?)";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$idUsuario);
            $bd->bindValue(2,$idGrupo);

            $bd->execute();

        }
        
        public function deleteSemGrupoUsuario($idUsuario,$idTime){

            $sql = "DELETE FROM SemGrupo Where fk_Id_Usuario = ? AND fk_Id_Times = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$idUsuario);
            $bd->bindValue(2,$idTime);

            $bd->execute();
        }

        
        
        public function create(Grupo $grupo,$imagem,$idTime){

            $sql = "INSERT INTO Grupos (fk_Id_Usuario,fk_Id_Times,nome,data_Criacao,imagem) VALUES (?,?,?,NOW(),?)";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$grupo->getCriador());
            $bd->bindValue(2,$idTime);
            $bd->bindValue(3,$grupo->getNome());
            $bd->bindValue(4,$imagem);

            $bd->execute();

            $resultado = $this->readGrupo($grupo->getNome());

            $this->createGrupoUsuario($grupo->getCriador(),$resultado['id']);

            $this->deleteSemGrupoUsuario($grupo->getCriador(),$idTime);

        }

        public function deleteAutorizar($idUsuario,$idGrupo){

            $sql = "DELETE FROM AutorizarUsuarioGrupo WHERE fk_Id_Usuario = ? AND fk_Id_Grupos = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$idUsuario);

            $bd->bindValue(2,$idGrupo);

            $bd->execute();

        }
        public function createInserirGrupo($idUsuario,$idGrupo,$idTime){

            $this->createGrupoUsuario($idUsuario,$idGrupo);

            $this->deleteSemGrupoUsuario($idUsuario,$idTime);

            $this->deleteAutorizar($idUsuario,$idGrupo);

        }

    }
?>