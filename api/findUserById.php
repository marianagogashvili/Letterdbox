<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'User.php';
require 'Database.php';


$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$user = User::findUserById($conn, $value['id']);

if ($user) {
	echo(json_encode($user));
} else {
	echo(json_encode(null));
}
?>