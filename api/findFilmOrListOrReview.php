<?php 

header("Access-Control-Allow-Origin: *");

require 'Film.php';
require 'Lists.php';
require 'Review.php';

require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$result;
error_log($value);
error_log($value['word']);
if ($value['param'] === 'film') {
	$result = Film::findFilms($conn, $value['word']);
} else if ($value['param'] === 'review') {
	$result = Review::findReviews($conn, $value['word']);
} else if ($value['param'] === 'list') {
	$result = Lists::findLists($conn, $value['word']);
}
// error_log(json_encode($films));

echo(json_encode($result));
?>