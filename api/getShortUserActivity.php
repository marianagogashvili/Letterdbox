<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Activity.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$activity = Activity::getShortUserActivity($conn, $value['user_id']);
if ($activity) {
	echo(json_encode($activity));
} else {
	echo(json_encode(null));
}
?>