<?php 
header("Access-Control-Allow-Origin: *");

class Review {
	public $id;
	public $user_id;
	public $film_id;
	public $text;

	public function createReview($conn) {
		$sql = "INSERT INTO review(user_id, film_id, text) VALUES(:user_id, :film_id, :description)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id',$this->user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id',$this->film_id, PDO::PARAM_INT);
		$stmt->bindValue(':description',$this->text, PDO::PARAM_STR);
		if ($stmt->execute()) {
			$this->id = $conn->lastInsertId();
          	return true;
		}

	}

	public static function updateReview($conn, $film_id, $user_id, $text) {
		$sql = "UPDATE review SET text = :description WHERE user_id = :user_id AND film_id = :film_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		$stmt->bindValue(':description', $text, PDO::PARAM_STR);
		if ($stmt->execute()) {
          	return true;
		}
	}

	public static function deleteReview($conn, $film_id, $user_id) {
		$sql = "DELETE FROM review WHERE user_id = :user_id AND film_id = :film_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return true;
		}
	}

}

?>