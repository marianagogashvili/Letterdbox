
<?php 
header("Access-Control-Allow-Origin: *");

require 'People.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

// $json = file_get_contents('php://input');
// $value = json_decode($json, true);

$ar1 = People::getMostPopularUsersByReview($conn);

$array1 = [];
foreach ($ar1 as $ar1Value) {
	$numOfLists = People::getNumOfLists($conn, $ar1Value['id']);
	$numOfWatched = People::getNumOfWatched($conn, $ar1Value['id']);
	$numOfLikes = People::getNumOfLikes($conn, $ar1Value['id']);
	$ar1Value['listCount'] = $numOfLists[0];
	$ar1Value['watchedCount'] = $numOfWatched[0];
	$ar1Value['likeCount'] = $numOfLikes[0];
	array_push($array1, $ar1Value);
}
// error_log(json_encode($array1));

$array2 = [];
$ar2 = People::getMostPopularUsersByLikes($conn);
foreach ($ar2 as $ar2Value) {
	$numOfLists = People::getNumOfLists($conn, $ar2Value['id']);
	$numOfWatched = People::getNumOfWatched($conn, $ar2Value['id']);
	$numOfReviews = People::getNumOfReviews($conn, $ar2Value['id']);
	$ar2Value['listCount'] = $numOfLists[0];
	$ar2Value['watchedCount'] = $numOfWatched[0];
	$ar2Value['reviewCount'] = $numOfReviews[0];
	array_push($array2, $ar2Value);
}
// error_log(json_encode($array2));

$array3 = [];
$ar3 = People::getMostPopularUsersByWatched($conn);
foreach ($ar3 as $ar3Value) {
	$numOfLists = People::getNumOfLists($conn, $ar3Value['id']);
	$numOfLikes = People::getNumOfLikes($conn, $ar3Value['id']);
	$numOfReviews = People::getNumOfReviews($conn, $ar3Value['id']);
	$ar3Value['listCount'] = $numOfLists[0];
	$ar3Value['reviewCount'] = $numOfReviews[0];
	$ar3Value['likeCount'] = $numOfLikes[0];
	array_push($array3, $ar3Value);
}
// error_log(json_encode($array3));
// error_log(json_encode($ar3));
$array4 = [];
$ar4 = People::getMostPopularUsersByList($conn);
foreach ($ar4 as $ar4Value) {
	$numOfLikes = People::getNumOfLikes($conn, $ar4Value['id']);
	$numOfReviews = People::getNumOfReviews($conn, $ar4Value['id']);
	$numOfWatched = People::getNumOfWatched($conn, $ar4Value['id']);
	$ar4Value['reviewCount'] = $numOfReviews[0];
	$ar4Value['likeCount'] = $numOfLikes[0];
    $ar4Value['watchedCount'] = $numOfWatched[0];

	array_push($array4, $ar4Value);
}


foreach ($array1 as $firstKey=>$first) {
	foreach ($array2 as $secondKey=>$second) {
		if ($first['id'] == $second['id']) {
			unset($array2[$secondKey]);
		}
	}
}
$array5 = array_merge($array1, $array2);

foreach ($array3 as $thirdKey=>$third) {
	foreach ($array4 as $fourthKey=>$fourth) {
		if ($third['id'] == $fourth['id']) {
			unset($array4[$fourthKey]);
		}
	}
}

$array6 = array_merge($array3, $array4);

foreach ($array5 as $fifthKey=>$fifth) {
	foreach ($array6 as $sixthKey=>$sixth) {
		if ($fifth['id'] == $sixth['id']) {
			unset($array6[$sixthKey]);
		}
	}
}

$final = array_merge($array6, $array5);
// error_log(json_encode($final));

echo(json_encode($final));

?>