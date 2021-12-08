<?php

require_once "connect.php";

    class TimeD{

        public function readTime($nome){

            $sql = "SELECT id FROM Times WHERE nome = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$nome);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados[0];

        }

        public function readTodosUsuariosTime($id){

            $sql = "SELECT u.* FROM Usuario u,Times_Usuario tu WHERE tu.fk_Id_Times= ? AND tu.fk_Id_Usuario = u.id;";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;

        }

        public function createTimeUsuario($idUsuario,$idTime){

            $sql = "INSERT INTO Times_Usuario (fk_Id_Usuario,fk_Id_Times) VALUES (?,?)";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$idUsuario);
            $bd->bindValue(2,$idTime);

            $bd->execute();

        }

        public function createSolicitarTime($idUsuario,$idTime){

            $sql = "INSERT INTO AutorizarUsuarioTime (fk_Id_Usuario,fk_Id_Times) VALUES (?,?)";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$idUsuario);
            $bd->bindValue(2,$idTime);

            $bd->execute();

        }

        public function delete($id){

            $sql = "DELETE FROM Times WHERE id = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

        }

        public function update(Time $time, $imagem){

            $sql = "UPDATE Times SET fk_Id_Usuario = ?, num_Membros = ?, num_Membros_Maximo = ?, nome = ?, imagem = ? WHERE id = ? ";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$time->getCriador());
            $bd->bindValue(2,$time->getNMembros());
            $bd->bindValue(3,$time->getNMaxMembros());
            $bd->bindValue(4,$time->getNome());
            $bd->bindValue(5,$imagem);
            $bd->bindValue(6,$time->getId());

            $bd->execute();

        }



        public function updateLider($idUsuario, $idTime){

            $sql = "UPDATE Times SET fk_Id_Usuario = ? WHERE id = ? ";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$idUsuario);

            $bd->bindValue(2,$idTime);

            $bd->execute();

        }

        public function readAutorizarTime($id){

            $sql = "SELECT u.* FROM Usuario u, AutorizarUsuarioTime au WHERE au.fk_Id_Times = ? AND au.fk_Id_Usuario = u.id;";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;

        }
        
        public function readTimeUsuario($id){

            $sql = "SELECT t.nome,t.id,t.imagem FROM Times t,Times_Usuario tu WHERE tu.fk_Id_Usuario = ? AND tu.fk_Id_Times = t.id;";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;

        }

        public function readTimeBusca($busca){

            $buscar = "%".$busca."%";

            $sql = "SELECT * FROM Times WHERE nome LIKE ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$buscar);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;
        }

        public function readTimesUsuarios($id){

            $sql = "SELECT fk_Id_Usuario AS id_Usuario FROM Times_Usuario tu WHERE tu.fk_Id_Times = ?;  ";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;

        }

        public function readTimeID($id){

            $sql = "SELECT t.* FROM Times t WHERE t.id = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);
            
            return $resultados[0];

        }
        
        public function create(Time $time,$imagem){

            $sql = "INSERT INTO Times (fk_Id_Usuario,num_Membros,num_Membros_Maximo,nome,data_Criacao,imagem,descricao) VALUES (?,?,?,?,NOW(),?,?)";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$time->getCriador());
            $bd->bindValue(2,$time->getNMembros());
            $bd->bindValue(3,$time->getNMaxMembros());
            $bd->bindValue(4,$time->getNome());
            $bd->bindValue(5,$imagem);
            $bd->bindValue(6,$time->getDescricao());

            $bd->execute();

            $resultado = $this->readTime($time->getNome());

            $this->createTimeUsuario($time->getCriador(),$resultado['id']);

        }

        public function createSemGrupo($idUsuario,$idTime){

            $sql = "INSERT INTO SemGrupo (fk_Id_Usuario,fk_Id_Times) VALUES (?,?)";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$idUsuario);
            $bd->bindValue(2,$idTime);

            $bd->execute();

        }

        public function deleteAutorizar($idUsuario,$idTime){

            $sql = "DELETE FROM AutorizarUsuarioTime WHERE fk_Id_Usuario = ? AND fk_Id_Times = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$idUsuario);
            $bd->bindValue(2,$idTime);

            $bd->execute();

        }

        public function read(){

            $sql = "SELECT * FROM Times;";

            $bd = connect::getConnect()->prepare($sql);

            $bd->execute();

            $resultados = $bd->fetchALL(PDO::FETCH_ASSOC);

            return $resultados;

            
        }

        public function deleteSemGrupoUsuario($idUsuario,$idTime){

            $sql = "DELETE FROM SemGrupo Where fk_Id_Usuario = ? AND fk_Id_Times = ?";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$idUsuario);
            $bd->bindValue(2,$idTime);

            $bd->execute();
        }

        public function sairTime($id,$time){

            $sql = "DELETE FROM Times_Usuario WHERE fk_Id_Usuario = ? AND fk_Id_Times = ?; ";

            $bd = connect::getConnect()->prepare($sql);

            $bd->bindValue(1,$id);

            $bd->bindValue(2,$time);

            $bd->execute();

            $this->deleteSemGrupoUsuario($id,$time);



        }
        public function createInserirTime($idUsuario,$idTime){

            $this->createTimeUsuario($idUsuario,$idTime);

            $this->createSemGrupo($idUsuario,$idTime);

            $this->deleteAutorizar($idUsuario,$idTime);

        }

    }
?>