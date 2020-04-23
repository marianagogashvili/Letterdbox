<?php 
header("Access-Control-Allow-Origin: *");

require 'Lists.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$foundList = Lists::findLike($conn, $value['list_id'], $value['user_id']);
$number = Lists::findNumberOfLikes($conn, $value['list_id']);
echo(json_encode([$foundList, $number]));
?>