<?php
require_once('connection.php');
$json = json_decode(file_get_contents('php://input'));
$func = $json->func;

if ($func == 'addMessage') {
    addMessage($json);
}
else getMessages($json);

function getMessages($json){
    $mess = $json->messageId;
    $con = Connection::get_instance();
    $sql = "select * from messages where id > ?";
    $query = $con->prepare($sql);
    $query->bindValue(1, $mess, PDO::PARAM_INT);
    $query->execute();
    $array = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($array);
}


function addMessage($json){
    $mess = $json->mess;
    $name = $json->name;
    $con = Connection::get_instance();
    $sql = "insert into messages (name, text) values (?, ?)";
    $query = $con->prepare($sql);
    $query->bindValue(1, $name, PDO::PARAM_STR);
    $query->bindValue(2, $mess, PDO::PARAM_STR);
    $query->execute();
    echo json_encode('1');
}





