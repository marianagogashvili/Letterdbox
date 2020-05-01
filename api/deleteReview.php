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
 
if (Review::deleteReview($conn, $value['film_id'], $value['user_id'])) {
	echo(json_encode(true));
} else {
	echo(json_encode(false));
}



?>