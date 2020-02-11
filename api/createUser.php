<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'User.php';
require 'Database.php';


$db = new Database();
$conn = $db->getDB();

$user = new User();
// var_dump($_POST['username']);
// var_dump($_POST['email']);
// var_dump($_POST['password']);

$json = file_get_contents('php://input');
$request = json_decode($json, true);

// $email = $request->email;
// error_log($request);
$user->username = $request['username'];
$user->email = $request['email'];
$user->password = $request['password'];
if($user->createUser($conn)) {
	echo(true);
} else {
	echo(false);
}


?>