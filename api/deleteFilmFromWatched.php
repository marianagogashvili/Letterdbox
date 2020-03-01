<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Film.php';
require 'Review.php';

require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
 
if (Film::deleteFromWatched($conn, $value['film_id'], $value['user_id'])) {
	Review::deleteReview($conn, $value['film_id'], $value['user_id']);
	echo(json_encode("film deleted from watched"));
} else {
	echo(json_encode("film was not deleted from watched"));
}
?>