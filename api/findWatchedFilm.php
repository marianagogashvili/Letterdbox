<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Film.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$film = Film::findFilm($conn, 'watched_films', $value['film_id'], $value['user_id']);
// error_log(json_encode($film));
if ($film) {
	$like = Film::findFilm($conn, 'liked_films', $value['film_id'], $value['user_id']);
	$review = Film::findFilm($conn, 'review', $value['film_id'], $value['user_id']);

	$result = array('film'=>$film, 'like'=>$like, 'review'=>$review);
	// error_log(json_encode($result));
	echo(json_encode($result));
} else {
	echo(json_encode(null));
}

?>