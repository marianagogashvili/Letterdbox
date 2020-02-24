<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'User.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

if(User::addFilmToWatched($conn, $value['film_id'], $value['user_id'], $value['rating'], $value['date'])){
	echo(1);
} else {
	echo(0);
}
?>