
<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'Lists.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
// updateList($conn, $id, $title, $description, $ranked, $public) 

if (Lists::updateList($conn, $value['id'], $value['title'], $value['description'], $value['ranked'], $value['public'])){
	echo(json_encode("list updated"));
	if ($value['films'] === null) {

	} else {
		
	}
} else {
	echo(json_encode("list was not updated"));
}

?>