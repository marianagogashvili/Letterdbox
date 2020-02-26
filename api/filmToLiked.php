<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
require 'User.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
error_log($value['user_id']);
// $conn, $film_id, $user_id
// deleteFilmFromLiked
if ($value['add'] == true) {
	if (User::addFilmToLiked($conn, $value['film_id'], $value['user_id'])) {
		echo(json_encode("added like"));
	} else {
		echo(json_encode("did not add like"));
	}
} else if ($value['add'] == false) {
	if (User::deleteFilmFromLiked($conn, $value['film_id'], $value['user_id'])) {
		echo(json_encode("deleted like"));
	} else {
		echo(json_encode("did not delete like"));
	}
}

?>