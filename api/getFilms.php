<?php 

header("Access-Control-Allow-Origin: *");

require 'Film.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();
$films = Film::findAllWatchedFilms($conn);
// $films = Film::getAll($conn);
echo(json_encode($films));
?>
