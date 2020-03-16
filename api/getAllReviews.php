<?php 
header("Access-Control-Allow-Origin: *");

require 'Review.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$reviews = Review::getAllReviews($conn, $value['film_id']);
if ($reviews) {
	echo(json_encode($reviews));
} else {
	echo(json_encode(null));
}
?>