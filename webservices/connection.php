<?php

class connection{

  private $con;

  /*function __construct(){
      $this->connectDb();
  }*/

  public function connectDb()
  {
    try {

      $this->con = new PDO('mysql:host=localhost;dbname=app_myAnime', 'user_app', 'gtSFw233cx$dFd.');
      
      /*$var = $this->con->prepare("SELECT * FROM users where id= :id");
      $var->bindValue(":id", "1");
      $var->execute();
      var_dump($var->fetch());die;*/
      return $this->con;
    } catch (\PDOException $e) {
      echo $e;
    }
  }

  public function closeConnectDb()
  {
    $this->con = null;
  }
}
