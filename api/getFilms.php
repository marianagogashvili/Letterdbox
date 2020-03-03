<?php 

header("Access-Control-Allow-Origin: *");

require 'Film.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$films = Film::findAllWatchedFilms($conn, $value['user_id']);
// $films = Film::getAll($conn);

echo(json_encode($films));
?>
