<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");

require 'User.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$input = file_get_contents('php://input');
$value = json_decode($input, true);

$films = User::getAllFilmsWatchedByUser($conn, $value['user_id']);
echo(json_encode($films));
?>