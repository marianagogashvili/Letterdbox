<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Comment.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
$comment = new Comment();
$comment->user_id = $value['user_id'];
$comment->list_id = $value['list_id'];
$comment->description = $value['description'];
$comment->date = $value['date'];

if ($comment->addCommentToList($conn)) {
	echo(json_encode(true));
} else {
	echo(json_encode(false));
}
?>