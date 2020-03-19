<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Activity.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$foundActivity = Activity::findActivity($conn, $value['user_id'], $value['film_id'], $value['film_title'], $value['action'], $value['date']);

if ($foundActivity == false) {
	if(Activity::createActivity($conn, $value['user_id'], $value['film_id'], $value['film_title'], $value['action'], $value['date'])){
		echo(json_encode(true));
	} else {
		echo(json_encode(false));
	}
} else {
	echo(json_encode(false));
}


?>