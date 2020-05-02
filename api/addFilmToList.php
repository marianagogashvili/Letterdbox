<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Lists.php';
require 'Database.php';


$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$list = Lists::findListById($conn, $value['list_id']);

if ($list['ranked'] == 0) {
	if (Lists::addFilmToList($conn, $value['list_id'], $value['film_id'], null) ){
		echo(json_encode(true));
	} else {
		echo(json_encode(false));
	}
} else if ($list['ranked'] == 1) {
	$rank = Lists::getLastRank($conn, $value['list_id']);
	error_log(json_encode($rank));
	if (Lists::addFilmToList($conn, $value['list_id'], $value['film_id'], ($rank[0]+1))){
		echo(json_encode(true));
	} else {
		echo(json_encode(false));
	}
}


?>