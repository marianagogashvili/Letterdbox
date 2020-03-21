<?php 

class Activity {
	public static function createActivity($conn, $user_id, $film_id, $film_title, $action, $date) {
		$sql = "INSERT INTO activity VALUES(:user_id, :film_id, :film_title, :action, :dating)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_title', $film_title, PDO::PARAM_STR);
		$stmt->bindValue(':action', $action, PDO::PARAM_STR);
		$stmt->bindValue(':dating', $date, PDO::PARAM_STR);
		if ($stmt->execute()) {
			return true;
		}
	}

	public static function findActivity($conn, $user_id, $film_id, $film_title, $action, $date) {
		$sql = "SELECT * FROM activity WHERE user_id = :user_id AND film_id = :film_id AND film_title = :film_title AND action = :action AND date = :dating";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_title', $film_title, PDO::PARAM_STR);
		$stmt->bindValue(':action', $action, PDO::PARAM_STR);
		$stmt->bindValue(':dating', $date, PDO::PARAM_STR);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}
	}

	public static function getUserActivity($conn, $user_id) {
		$sql = "SELECT * FROM activity WHERE user_id = :user_id ORDER BY date DESC";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetchAll();
		}
	}
}

?>