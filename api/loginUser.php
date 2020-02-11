<?php 
require 'User.php';
require 'Database.php';


$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$request = json_decode($json, true);

$email = $request['email'];
$password = $request['password'];

$userByEmail = User::findUserByEmail($conn, $email);
$userByUsername = User::findUserByUsername($conn, $email);

if($userByEmail) {
	if (password_verify($password, $userByEmail['password'])){
		// echo(intval($userByEmail['id'])); 
		echo(json_encode($userByEmail));
		// echo(1);
	} else {
		echo(0);
	}
} else if ($userByUsername) {
	if (password_verify($password, $userByUsername['password'])){
		// echo(intval($userByUsername['id']));
		echo(json_encode($userByUsername));
		// echo(1);
	} else {
		echo(0);
	}
} else {
	echo(3);
}
?>