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
}

?>