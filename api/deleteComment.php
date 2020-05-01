<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Comment.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
 
if (Comment::deleteComment($conn, $value['id'])) {
	echo(json_encode(true));
} else {
	echo(json_encode(false));
}
?>