<?php 
header("Access-Control-Allow-Origin: *");

require 'Film.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$rs = Film::getFilmRating($conn, $value['film_id']);
$r = 0;

foreach ($rs as $rating) {
	$r = $r+$rating[0];
}
$r = round(($r/(count($rs))),1);
echo(json_encode($r));

?>