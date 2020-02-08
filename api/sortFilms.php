<?php 
header("Access-Control-Allow-Origin: *");

require 'Film.php';
require 'Database.php';

$db = new Database();
$conn = $db->getDB();

if (isset($_GET['year'])) {
	$films = Film::sortAllByYear($conn, 
								(intval($_GET['year'])-10), 
								intval($_GET['year'])
								);
}
echo(json_encode($films));
?>