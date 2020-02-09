<?php 
header("Access-Control-Allow-Origin: *");

require 'User.php';
require 'Database.php';


$db = new Database();
$conn = $db->getDB();

$user = new User();
// var_dump($_POST['username']);
// var_dump($_POST['email']);
// var_dump($_POST['password']);

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
// $email = $request->email;
error_log($request);
$user->username = $request['username'];
$user->email = $request['email'];
$user->password = $request['password'];
if($user->createUser($conn)) {
	error_log(true);
} else {
	error_log(false);
}

// if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])) {
// 	$user->username = $_POST['username'];
// 	$user->email = $_POST['email'];
// 	$user->password = $_POST['password'];
// 	if($user->createUser($conn)) {
// 		echo(true);
// 	} else {
// 		echo(false);
// 	}
// } else {
// 	echo(false);
// }
?>