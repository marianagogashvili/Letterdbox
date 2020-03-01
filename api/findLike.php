<?php 

header("Access-Control-Allow-Origin: *");

require 'Film.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);


if(Film::findLike($conn, $value['film_id'], $value['user_id'])) {
	echo(json_encode(true));
} else {
	echo(json_encode(false));
}
?>