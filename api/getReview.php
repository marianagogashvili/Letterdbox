<?php 
header("Access-Control-Allow-Origin: *");

require 'Review.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$review = Review::getReview($conn, $value['user_id'], $value['film_id']);
if ($review) {
	echo(json_encode($review));
} else {
	echo(json_encode(null));
}

?>