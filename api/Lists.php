<?php 
header("Access-Control-Allow-Origin: *");

class Lists {
	public $id;
	public $user_id;
	public $title;
	public $description;
	public $ranked;
	public $public;

	public function createList($conn) {
		$sql = "INSERT INTO list(user_id, title, description, ranked, public) VALUES(:user_id, :title, :description, :ranked, :public)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $this->user_id, PDO::PARAM_INT);
		$stmt->bindValue(':title', $this->title, PDO::PARAM_STR);
		$stmt->bindValue(':description', $this->description, PDO::PARAM_STR);
		$stmt->bindValue(':ranked', $this->ranked, PDO::PARAM_BOOL);
		$stmt->bindValue(':public', $this->public, PDO::PARAM_BOOL);
		if ($stmt->execute()) {
			$this->id = $conn->lastInsertId();
          	return true;
		}
	}

	public static function addFilmToList($conn, $list_id, $film_id, $rank) {
		$sql = "INSERT INTO list_film VALUES(:list_id, :film_id, :rank)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		$stmt->bindValue(':rank', $rank, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return true;
		}
	}

	public static function findLists($conn, $word) {
		$sql = "SELECT * FROM list WHERE title LIKE '%" . $word ."%'";
		$stmt = $conn->prepare($sql);
		if($stmt->execute()){
      		return $stmt->fetchAll(PDO::FETCH_ASSOC);
    	}
	}

	public static function findList($conn, $title, $user_id) {
		$sql = "SELECT * FROM list WHERE title = :title AND user_id = :user_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':title', $title, PDO::PARAM_STR);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return $stmt->fetchAll();
		}
	}

	public static function getLists($conn, $user_id) {
		$sql = "SELECT * FROM list WHERE user_id = :user_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return $stmt->fetchAll();
		}
	}

	public static function getFilmsFromList($conn, $list_id) {
		$sql = "SELECT film.*, film_id, list_film.rank FROM list_film INNER JOIN film on film.id = list_film.film_id WHERE list_id = :list_id ORDER BY rank ASC";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return $stmt->fetchAll();
		}
	}

	public static function findListById($conn, $id) {
		$sql = "SELECT * FROM list WHERE id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':id', $id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return $stmt->fetch();
		}
	}

	public static function updateList($conn, $id, $title, $description, $ranked, $public) {
		$sql = "UPDATE list SET title = :title, description = :description, ranked = :ranked, public = :public WHERE id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':id', $id, PDO::PARAM_INT);
		$stmt->bindValue(':title', $title, PDO::PARAM_STR);
		$stmt->bindValue(':description', $description, PDO::PARAM_STR);
		$stmt->bindValue(':ranked', $ranked, PDO::PARAM_BOOL);
		$stmt->bindValue(':public', $public, PDO::PARAM_BOOL);
		if ($stmt->execute()) {
          	return true;
		}
	}

	public static function updateFilmFromList($conn, $list_id, $film_id, $rank) {
		$sql = "UPDATE list_film SET rank = :rank WHERE film_id = :film_id AND list_id = :list_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		$stmt->bindValue(':rank', $rank, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return true;
		}
	}

	public static function deleteFilmFromList($conn, $id, $film) {
		$sql = "DELETE FROM list_film WHERE list_id = :id AND film_id = :film_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':id', $id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return true;
		}
	}


	public static function likeList($conn, $list_id, $user_id) {
		$sql = "INSERT INTO like_list VALUES(:list_id, :user_id)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return true;
		}
	}

	public static function unlikeList($conn, $list_id, $user_id) {
		$sql = "DELETE FROM like_list WHERE list_id = :list_id AND user_id =:user_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return true;
		}
	}

	public static function findLike($conn, $list_id, $user_id) {
		$sql = "SELECT * FROM like_list WHERE list_id = :list_id AND user_id = :user_id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);
		$stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return $stmt->fetch();
		}
	}

	public static function findNumberOfLikes($conn, $list_id) {
		$sql = "SELECT COUNT(*) FROM like_list WHERE list_id = :list_id ";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);

		if ($stmt->execute()) {
          	return $stmt->fetch();
		}
	}

	public static function getAllLists($conn) {
		$sql = "SELECT list.*, user.username FROM list INNER JOIN user ON user.id = list.user_id WHERE public = 1";
		$stmt = $conn->prepare($sql);
		if ($stmt->execute()) {
          	return $stmt->fetchAll();
		}
	}

	
}

?>