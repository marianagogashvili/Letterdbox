<?php 
header("Access-Control-Allow-Origin: *");

require 'User.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$param = file_get_contents('php://input');
$value = json_decode($param, true);

if ($value['add'] == true) {
	if (User::addFilmToWatchlist($conn, $value['user_id'], $value['film_id'])) {
		echo(json_encode("added to watchlist"));
	} else {
		echo(json_encode("didn't add to watchlist"));
	}
} elseif($value['add'] == false) {
	if (User::deleteFilmFromWatchlist($conn, $value['user_id'], $value['film_id'])) {
		echo(json_encode("deleted from watchlist"));
	} else {
		echo(json_encode("didn't delete from watchlist"));
	}
}
?>