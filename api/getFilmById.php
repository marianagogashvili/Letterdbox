<?php 
header("Access-Control-Allow-Origin: *");

require 'Film.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$film = Film::getFilmById($conn, $value['id']);
$obj = ['id'=>$film['id'], 'title'=> $film['title'], 'year'=> $film['year'], 'description'=> $film['description'], 'photo'=> $film['photo']];
if ($film) {
	echo(json_encode($obj));
} else {
	echo(json_encode(null));
}

?>