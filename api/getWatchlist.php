<?php 
header("Access-Control-Allow-Origin: *");

require 'User.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$watchlist =User::getWatchlist($conn, $value['user_id']);
if ($watchlist) {
	echo(json_encode($watchlist));
} else {
	echo(json_encode(null));
}
?>