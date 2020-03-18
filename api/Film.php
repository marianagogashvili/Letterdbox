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

	public static function sortAllByYear($conn, $user_id, $year1, $year2) {
		// $sql = "SELECT * FROM film LEFT JOIN watched_films ON film.id=watched_films.film_id AND watched_films.user_id = :user_id AND year BETWEEN :year1 AND :year2";
		$sql = "SELECT * FROM film LEFT JOIN watched_films ON film.id=watched_films.film_id AND watched_films.user_id = :user_id WHERE year BETWEEN :year1 AND :year2";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		$stmt->bindValue(':year1', $year1, PDO::PARAM_INT);
		$stmt->bindValue(':year2', $year2, PDO::PARAM_INT);
		if($stmt->execute()){
      		return $stmt->fetchAll(PDO::FETCH_ASSOC);
    	}
	}
	public static function findFilms($conn, $word) {
		$sql = "SELECT * FROM film WHERE title LIKE '%" . $word ."%'";
		$stmt = $conn->prepare($sql);
		if($stmt->execute()){
      		return $stmt->fetchAll(PDO::FETCH_ASSOC);
    	}
	}

	public static function findFilm($conn, $param, $film_id, $user_id) {
		$sql = "SELECT * FROM " . $param . " WHERE film_id = :film_id AND user_id = :user_id";
		$stmt = $conn->prepare($sql);

		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}
	}

	public static function deleteFromWatched($conn, $film_id, $user_id) {
		$sql = "DELETE FROM watched_films WHERE film_id = :film_id AND user_id = :user_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return true;
		}
	}

	public static function updateWatchedFilm($conn, $film_id, $user_id, $rating, $date) {
		$sql = "UPDATE watched_films SET rating = :rating, `date` = :datum WHERE user_id = :user_id AND film_id = :film_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':rating', $rating, PDO::PARAM_INT);
		$stmt->bindValue(':datum', $date, PDO::PARAM_STR);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return true;
		}
	}

	public static function findAllWatchedFilms($conn, $user_id) {
		$sql = "SELECT * FROM film LEFT JOIN watched_films ON film.id=watched_films.film_id AND watched_films.user_id = :user_id ORDER BY film.id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetchAll();
		}
	}

	public static function findLike($conn, $film_id, $user_id) {
		$sql = "SELECT * FROM liked_films WHERE film_id = :film_id AND user_id = :user_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}
	}

	public static function getFilmById($conn, $id) {
		$sql = "SELECT * FROM film WHERE id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':id', $id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}
	}

	public static function getFilmRating($conn, $film_id) {
		$sql = "SELECT rating FROM watched_films WHERE film_id = :film_id AND rating IS NOT NULL AND rating != 0";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetchAll();
		}
	}


}
?>