<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'People.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

if ($value['follow'] == true) {
	if (People::follow($conn, $value['me'], $value['person'])) {
		echo(json_encode(true));
	} else {
		echo(json_encode(false));
	}
} else if ($value['follow'] == false) {
	if (People::unfollow($conn, $value['me'], $value['person'])) {
		echo(json_encode(true));
	} else {
		echo(json_encode(false));
	}
}
?>