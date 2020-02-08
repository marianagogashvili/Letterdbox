<?php 
header("Access-Control-Allow-Origin: *");

class Film {
	public $id;
	public $title;
	public $year;
	public $description;

	public static function getAll($conn) {
		$sql = "SELECT * FROM film";
		$stmt = $conn->query($sql);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public static function sortAllByYear($conn, $year1, $year2) {
		$sql = "SELECT * FROM film WHERE year BETWEEN :year1 AND :year2";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':year1', $year1, PDO::PARAM_INT);
		$stmt->bindValue(':year2', $year2, PDO::PARAM_INT);
		if($stmt->execute()){
      		return $stmt->fetchAll(PDO::FETCH_ASSOC);
    	}
	}

}
?>