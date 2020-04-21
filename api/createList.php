<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Lists.php';
require 'Database.php';


$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$list = new Lists();
$list->title = $value['name'];
$list->description = $value['desc'];
$list->public = $value['public'];
$list->ranked = $value['ranked'];
$list->user_id = $value['user_id'];


// error_log($json);
$alreadyExists = Lists::findList($conn, $value['name'], intval($value['user_id']));
// error_log(json_encode($alreadyExists) == []);
if ($alreadyExists == null) {
	if ($alreadyExists == false) {
		if ($list->createList($conn)) {
			foreach ($value['films'] as $film) {
				if(Lists::addFilmToList($conn, $list->id,  $film['id'], $film['rank'])) {

				}
			}
			echo(json_encode($list->id));
		}
	}
} else  {
	echo(json_encode(false));
}


?>