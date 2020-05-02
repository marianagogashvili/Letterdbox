
<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Lists.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
// film_id, user_id
$lists = Lists::getLists($conn, $value['user_id']);
$finalResult = [];
foreach ($lists as $list ) {
	$films = Lists::getFilmsFromList($conn, intval($list['id']));
	$addedToList = false;
	foreach ($films as $film) {
		// error_log(intval($film['id']) == intval($value['film_id']));
		// error_log($value['film_id']);

		if ($film['id'] == $value['film_id']) {
			$addedToList = true;
		} 
	} 
	// $list['added'] = $addedToList;

	array_push($finalResult, [intval($list['id']), $list['title'], $addedToList]);
}
echo(json_encode($finalResult));
// error_log(json_encode($finalResult));
?>