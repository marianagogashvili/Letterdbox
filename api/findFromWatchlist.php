<?php 
header("Access-Control-Allow-Origin: *");

require 'User.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$param = file_get_contents('php://input');
$value = json_decode($param, true);
$result = User::findFromWatchlist($conn, $value['user_id'], $value['film_id']);
if ($result) {
	echo(json_encode(true));
} else {
	echo(json_encode(false));
}

?>