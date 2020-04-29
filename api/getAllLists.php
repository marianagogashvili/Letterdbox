<?php 
header("Access-Control-Allow-Origin: *");

require 'Lists.php';
require 'Comment.php';

require 'Database.php';

$db = new Database();
$conn = $db->getDB();

$json = file_get_contents('php://input');
$value = json_decode($json, true);

$lists = Lists::getAllLists($conn);
$result = [];
if($lists) {
	// echo(json_encode(value));
	foreach ($lists as $list) {
		$films = Lists::getFilmsFromList($conn, $list['id']);
		$numOfFilm = 0;
		foreach ($films as $f) {
			$numOfFilm = $numOfFilm + 1;
		}

		$numOfComment = 0;
		$comments = Comment::getCommentsFromList($conn, $list['id']);
		foreach ($comments as $c) {
			$numOfComment = $numOfComment + 1;
		}

		$numOfLike = Lists::findNumberOfLikes($conn, $list['id']);
		if ($films) {
			array_push($result, [$list, $films, $numOfFilm, $numOfComment, $numOfLike[0]]);
		}
	}
	echo(json_encode($result));
} else {
	echo(json_encode(null));
}

?>