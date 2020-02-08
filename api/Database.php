<?php 
header("Access-Control-Allow-Origin: *");

class Database {
	function getDB() {
		$db_user = 'letterdbox_www';
		$db_name = 'letterdbox';
		$db_host = 'localhost';
		$db_pass = 'UvrUAMxmSvYDsfTS';

		$dsn = 'mysql:host=' . $db_host . ';dbname=' . $db_name . ';charset=utf8';

		try {
			$db = new PDO($dsn, $db_user, $db_pass);
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	      return $db;
	  	} catch (PDOException $e) {
		  echo $e->getMessage();
	      exit;
		}
	}
}

?>