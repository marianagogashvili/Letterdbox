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

	public function editUser($conn, $username, $email, $password, $id) {
		$sql = "UPDATE user SET username = :username, email = :email, password = :password WHERE id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(":username", $username, PDO::PARAM_STR);
		$stmt->bindValue(":email", $email, PDO::PARAM_STR);
		$stmt->bindValue(":password", password_hash($password, PASSWORD_BCRYPT), PDO::PARAM_STR);
		$stmt->bindValue(":id", $id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return true;
		}
	}

	public static function findUserById($conn, $id) {
		$sql = "SELECT * FROM user WHERE id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(":id", $id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}
	}

	public static function findUserByName($conn, $name) {
		$sql = "SELECT * FROM user WHERE username LIKE '%" . $name ."%'";
		$stmt = $conn->prepare($sql);
		// $stmt->bindValue(":name", $name, PDO::PARAM_STR);
		if ($stmt->execute()) {
			return $stmt->fetchAll();
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

	public static function addFilmToWatchlist($conn, $user_id, $film_id) {
		$sql = "INSERT INTO watchlist VALUES(:film_id, :user_id)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return true;
		}
	}

	public static function deleteFilmFromWatchlist($conn, $user_id, $film_id) {
		$sql = "DELETE FROM watchlist WHERE user_id = :user_id AND film_id = :film_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		return $stmt->execute();
	}

	public static function findFromWatchlist($conn, $user_id, $film_id) {
		$sql = "SELECT * FROM watchlist WHERE user_id = :user_id AND film_id = :film_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}
	}

	public static function getWatchlist($conn, $user_id) {
		$sql = "SELECT watched_films.*, film.*  FROM watchlist LEFT JOIN watched_films ON watchlist.film_id = watched_films.film_id AND watchlist.user_id = watched_films.user_id LEFT JOIN film ON watchlist.film_id = film.id WHERE watchlist.user_id = :user_id ORDER BY film.id DESC";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetchAll();
		}
	}

	public static function getUserLikes($conn, $user_id) {
		$sql = "SELECT watched_films.*, film.* FROM liked_films LEFT JOIN watched_films ON liked_films.film_id = watched_films.film_id AND liked_films.user_id = watched_films.user_id LEFT JOIN film ON liked_films.film_id = film.id WHERE liked_films.user_id = :user_id ORDER BY film.id DESC";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetchAll();
		}
	}

}

?>