<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Review.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
 
$reviews = Review::getUserReviews($conn, $value['user_id']);
if ($reviews) {
	echo(json_encode($reviews));
} else {
	echo(json_encode(null));
}
?>