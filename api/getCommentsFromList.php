<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Comment.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
$comments = Comment::getCommentsFromList($conn, $value['list_id']);

if ($comments) {
	echo(json_encode($comments));
} else {
	echo(json_encode(null));
}
?>