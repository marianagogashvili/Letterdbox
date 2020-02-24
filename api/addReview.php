<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'User.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
// Review::createReview($conn)
$review = new Review();
$review->user_id = $value['user_id'];
$review->film_id = $value['film_id'];
$review->description = $value['review'];
error_log($review);
if($review->createReview($conn)){
	echo(1);
} else {
	echo(0);
}
?>