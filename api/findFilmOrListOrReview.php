<?php 

header("Access-Control-Allow-Origin: *");

require 'Film.php';
require 'Lists.php';
require 'Review.php';
require 'User.php';

require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$result;

if ($value['param'] === 'film') {
	$result = Film::findFilms($conn, $value['word']);
} else if ($value['param'] === 'review') {
	$result = Review::findReviews($conn, $value['word']);
} else if ($value['param'] === 'list') {
	$result = [];
	$lists = Lists::findLists($conn, $value['word']);
	foreach ($lists as $list) {
		$films = Lists::getFilmsFromList($conn, $list['id']);
		array_push($result, [$list, $films]);
	}
	
} else if ($value['param'] === 'user') {
	$result = User::findUserByName($conn, $value['word']);
	error_log(json_encode($result));
} 
// error_log(json_encode($films));

echo(json_encode($result));
?>