<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Film.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

if (Film::updateWatchedFilm($conn, $value['film_id'], $value['user_id'], $value['rating'], $value['date'])) {
	echo(json_encode("watched film updated"));
} else {
	echo(json_encode("watched film did not get updated"));
}
?>