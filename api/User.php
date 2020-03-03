<?php 
header("Access-Control-Allow-Origin: *");

class User {
	public $id;
	public $username;
	public $email;
	public $password;

	public function createUser($conn) {
		$sql = "INSERT INTO user(username, email, password) VALUES(:username, :email, :password)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(":username", $this->username, PDO::PARAM_STR);
		$stmt->bindValue(":email", $this->email, PDO::PARAM_STR);
		$stmt->bindValue(":password", password_hash($this->password, PASSWORD_BCRYPT), PDO::PARAM_STR);
		if($stmt->execute()){
          $this->id = $conn->lastInsertId();
          return true;
        }
	}

	public static function findUserByEmail($conn, $email) {
		$sql = "SELECT * FROM user WHERE email = :email";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(":email", $email, PDO::PARAM_STR);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}
	}
	public static function findUserByUsername($conn, $username) {
		$sql = "SELECT * FROM user WHERE username = :username";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(":username", $username, PDO::PARAM_STR);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}
	}

	public static function addFilmToWatched($conn, $film_id, $user_id, $rating, $date) {
		$sql = "INSERT INTO watched_films VALUES(:film_id, :user_id, :rating, :dateWatched)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		$stmt->bindValue(':rating', $rating, PDO::PARAM_INT);
		$stmt->bindValue(':dateWatched', $date, PDO::PARAM_STR);
	    if ($stmt->execute()) {
	    	return true;
	    }
	}

	public static function addFilmToLiked($conn, $film_id, $user_id) {
		$sql = "INSERT INTO liked_films VALUES(:film_id, :user_id)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
	    	return true;
	    }
	} 

	public static function deleteFilmFromLiked($conn, $film_id, $user_id) {
		$sql = "DELETE FROM liked_films WHERE film_id = :film_id AND user_id = :user_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
	    	return true;
	    }
	}

		public static function getAllFilmsWatchedByUser($conn, $user_id) {
		$sql = "SELECT * FROM film LEFT JOIN watched_films ON film.id=watched_films.film_id WHERE watched_films.user_id = :user_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetchAll();
		}
	}

	
}

?>