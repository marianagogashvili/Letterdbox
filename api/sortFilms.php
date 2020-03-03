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
}
echo(json_encode($films));
?>