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
	if (password_verify($value['old_password'], $user['password'])) {
		if (User::editUser($conn, $value['username'], $value['email'], $value['password'], $value['id'])) {
			echo(json_encode(true));
		} else {
			echo(json_encode(false));
		}
	} else {
			echo(json_encode("wrong password"));
		}
}else {
			echo(json_encode(false));
		}





?>