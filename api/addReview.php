<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Review.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
// error_log($value);

// Review::createReview($conn)
$review = new Review();
$review->user_id = $value['user_id'];
// error_log($value['user_id']);
$review->film_id = $value['film_id'];
// error_log($value['film_id']);

$review->text = $value['text'];
$review->date = $value['date'];
// error_log($review);
if($review->createReview($conn)){
	echo(json_encode("added review to film"));
} else {
	echo(json_encode("did not add review to film"));
}
?>