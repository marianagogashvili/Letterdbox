<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Review.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
// updateReview($conn, $film_id, $user_id, $text)
// error_log("??");
if (Review::updateReview($conn, $value['film_id'], $value['user_id'], $value['text'])){
	echo(json_encode("review updated"));
} else {
	echo(json_encode("review was not updated"));
}

?>