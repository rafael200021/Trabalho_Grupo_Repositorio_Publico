<?php

class Connect{

    public static $startConnect;

    public static function getConnect(){

        if(!isset(self::$startConnect)):

           self::$startConnect = new PDO("mysql:host=localhost:3306;dbname=Projeto_Grupos;charset=utf8","root","123456");

        endif;

        return self::$startConnect;

    }


}