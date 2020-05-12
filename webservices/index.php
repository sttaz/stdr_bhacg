<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methoso: *');
include('connection.php');
date_default_timezone_set( 'America/Bogota');
ini_set('display_errors', 1);
error_log(print_r($_POST, true));
if( isset($_POST["post_data"]) ){
  $data = $_POST["post_data"];
  caseParams($data);
}else{
  printData(["exito" => false, 'error'=> 'Ups!, tenemos problemas con la peticion']);
}
/**
* Valida el caso de la peticion
* de esta manera ingresa los valores donde pertenece...
*/
function caseParams($params){
  $data = $params;
  switch ($data['execute']) {
    case 'proccess_new':
      insert($data);
      break;

    case 'proccess_edit':
      //insert($data)
      break;

    case 'proccess_delete':
      //insert($data)
      break;

    default:
      printData(["exito" => false, 'error'=> 'Ups!, tenemos problemas con el caso solicitado']);
      break;
  }
}

/**
* Inserta datos en la base de datos
*/
function insert($input)
{
  try {
    $user = $input;
    $connection = new connection();
    $con = $connection->connectDb();

    $statament = $con->prepare("INSERT INTO users(name, password, created_at, updated_at) VALUES(:nombre, :password, :created_at, :updated_at)");
    //$con->execute([':nombre' => 'sebastian', ':password'=> '234']);
    //$con->bindValue(':nombre', 'sebastian');
    $statament->bindValue(':nombre', $user["name"]);
    $statament->bindValue(':password', $user["password"]);
    $statament->bindValue(':created_at', date('Y-m-d H:i:s'));
    $statament->bindValue(':updated_at', date('Y-m-d H:i:s'));

    if(!$statament->execute()){
      $reponse = ['exito' =>  false, 'code_id' => '', 'error' => $statament->errorInfo()];
    }else{
      $reponse = ['exito' =>  true, 'code_id' => $con->lastInsertId()];
    }

    $connection->closeConnectDb();

    printData($reponse);
  } catch (\Exception $e) {
    echo $e;
  }
}

function printData($data){
  //echo "dd"; die();
  header('Content-Type: application/json');
  echo json_encode($data);die;
}
