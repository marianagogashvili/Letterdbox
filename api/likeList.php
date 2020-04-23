<?php 
header("Access-Control-Allow-Origin: *");

require 'Lists.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$foundList = Lists::findLike($conn, $value['list_id'], $value['user_id']);

if ($value['like'] === false) {
	if(Lists::unlikeList($conn, $value['list_id'], $value['user_id'])) {
			echo(true);
		} else {
			echo(false);
		}
} else if($value['like'] === true) {
	if ($foundList) {
	
	} else {
		if(Lists::likeList($conn, $value['list_id'], $value['user_id'])) {
			echo(true);
		} else {
			echo(false);
		}
	}
}

?>