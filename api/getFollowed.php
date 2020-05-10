<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'People.php';
require 'Database.php';


$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$result = People::getFollowedPeople($conn, $value['me'], $value['person']);
if ($result != null) {
	echo(json_encode(true));
} else {
	echo(json_encode(false));
}
?>