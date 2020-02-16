<?php 

header("Access-Control-Allow-Origin: *");

require 'Film.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$word = json_decode($json, true);

error_log($word);

$films = Film::findFilms($conn, $word);
error_log(json_encode($films));

echo(json_encode($films));
?>