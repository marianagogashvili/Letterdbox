
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

if (Lists::updateList($conn, $value['id'], $value['title'], $value['description'], $value['ranked'], $value['public'])) {
	// echo(json_encode("list updated"));
	echo(true);
} else {
	// echo(json_encode("list was not updated"));
	echo(false);
}

if (isset($value['add'])) {
	foreach ($value['add'] as $filmToAdd ) {
		// error_log($filmToAdd);
		if (Lists::addFilmToList($conn, $value['id'], $filmToAdd['id'], $filmToAdd['rank'])) {
			// echo(json_encode("added films from list"));
			echo(true);
		}
	}
} 
if (isset($value['remove'])) {
	foreach ($value['remove'] as $filmToRemove ) {
		// error_log($filmToRemove);
		if (Lists::deleteFilmFromList($conn, $value['id'], $filmToRemove)) {
			// echo(json_encode("removed films from list"));
			echo(true);
		}
	}
}

if (isset($value['update'])) {
	foreach ($value['update'] as $filmToUpdate ) {
		// error_log($filmToRemove);
		if (Lists::updateFilmFromList($conn, $value['id'], $filmToUpdate['id'], $filmToUpdate['rank'])) {
			// echo(json_encode("removed films from list"));
			echo(true);
		}
	}
}

?>