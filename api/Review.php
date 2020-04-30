<?php 
header("Access-Control-Allow-Origin: *");

class Review {
	public $id;
	public $user_id;
	public $film_id;
	public $text;
	public $date;

	public static function getReview($conn, $user_id, $film_id) {
		$sql = "SELECT * FROM review WHERE user_id = :user_id AND film_id = :film_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id',$user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id',$film_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return $stmt->fetch();
		}
	}

	public static function getAllReviews($conn, $film_id) {
		$sql = "SELECT review.user_id, review.film_id, review.text, review.date, user.username FROM review INNER JOIN user ON review.user_id = user.id WHERE review.film_id = :film_id ORDER BY date DESC";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':film_id',$film_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return $stmt->fetchAll();
		}
	}

	public static function findReviews($conn, $word) {
		$sql = "SELECT review.*, film.*, watched_films.rating FROM review INNER JOIN film ON film.id = review.film_id INNER JOIN watched_films ON watched_films.film_id = review.film_id AND watched_films.user_id = review.user_id WHERE text LIKE '%" . $word ."%'";
		$stmt = $conn->prepare($sql);
		if($stmt->execute()){
      		return $stmt->fetchAll(PDO::FETCH_ASSOC);
    	}
	}

	public function createReview($conn) {
		$sql = "INSERT INTO review(user_id, film_id, text, date) VALUES(:user_id, :film_id, :description, :dating)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id',$this->user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id',$this->film_id, PDO::PARAM_INT);
		$stmt->bindValue(':description',$this->text, PDO::PARAM_STR);
		$stmt->bindValue(':dating',$this->date, PDO::PARAM_STR);

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

	public static function getUserReviews($conn, $user_id) {
		$sql = "SELECT * FROM review LEFT JOIN film ON review.film_id = film.id LEFT JOIN watched_films ON review.film_id = watched_films.film_id AND watched_films.user_id = review.user_id WhERE review.user_id = :user_id ORDER BY review.date DESC";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return $stmt->fetchAll();
		}
	}

}

?>