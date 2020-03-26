<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'User.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
 
$liked = User::getUserLikes($conn, $value['user_id']);
if ($liked) {
	echo(json_encode($liked));
} else {
	echo(json_encode(null));
}
?>