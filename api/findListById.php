<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Lists.php';
require 'Database.php';


$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$list = Lists::findListById($conn, $value['id']);
$films = Lists::getFilmsFromList($conn, $value['id']);
$result = [$list, $films];
if ($list) {
	if ($films) {
		echo(json_encode($result));
	}
} else {
	echo(json_encode(false));
}
?>