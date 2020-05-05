<?php 
header("Access-Control-Allow-Origin: *");

require 'Film.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

if ($value['year'] != null) {
	$films = Film::sortAllByYear($conn, 
								$value['user_id'],
								(intval($value['year'])-10), 
								intval($value['year'])
								);
} else if ($value['rating'] != null) {
	$films = Film::sortAllByRating($conn, intval($value['user_id']), $value['rating']);
}
// error_log(json_encode($films));
echo(json_encode($films));
?>