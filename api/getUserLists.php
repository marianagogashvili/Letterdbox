<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Lists.php';
require 'Database.php';


$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$lists = Lists::getLists($conn, $value['user_id']);
$result = [];
if($lists) {
	// echo(json_encode(value));
	foreach ($lists as $list) {
		$films = Lists::getFilmsFromList($conn, $list['id']);
		if ($films) {
			array_push($result, [$list, $films]);
		}
	}
	echo(json_encode($result));
}

?>