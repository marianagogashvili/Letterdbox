<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'User.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$following = User::getFollowing($conn, $value['user_id']);
$followers = User::getFollowers($conn, $value['user_id']);
echo(json_encode([$following, $followers]));
?>