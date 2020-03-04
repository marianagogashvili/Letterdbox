<?php 
header("Access-Control-Allow-Origin: *");

require 'Film.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$film = Film::getFilmById($conn, $value['id']);
if ($film) {
	echo(json_encode($film));
} else {
	echo(json_encode(null));
}

?>