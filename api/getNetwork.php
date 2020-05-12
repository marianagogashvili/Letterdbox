<?php 
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, GET");
require 'People.php';
require 'User.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);
// getFollowing, getFollower
$follower = User::getFollowers($conn, $value['user_id']);
$following = User::getFollowing($conn, $value['user_id']);
$finalFollower = [];
$finalFollowing = [];

foreach ($follower as $f) {
	$numOfLists = People::getNumOfLists($conn, $f['follower']);
	$numOfWatched = People::getNumOfWatched($conn, $f['follower']);
	$numOfLikes = People::getNumOfLikes($conn, $f['follower']);
	$f['listCount'] = $numOfLikes[0];
	$f['watchedCount'] = $numOfWatched[0];
	$f['likeCount'] = $numOfLists[0];
	array_push($finalFollower, $f);
}
foreach ($following as $f) {
	$numOfLists = People::getNumOfLists($conn, $f['following']);
	$numOfWatched = People::getNumOfWatched($conn, $f['following']);
	$numOfLikes = People::getNumOfLikes($conn, $f['following']);
	$f['listCount'] = $numOfLikes[0];
	$f['watchedCount'] = $numOfWatched[0];
	$f['likeCount'] = $numOfLists[0];
	array_push($finalFollowing, $f);
}
echo(json_encode([$finalFollower, $finalFollowing]));

?>