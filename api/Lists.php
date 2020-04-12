<?php 
header("Access-Control-Allow-Origin: *");

class Lists {
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

	public static function addFilmToList($conn, $list_id, $film_id) {
		$sql = "INSERT INTO list_film VALUES(:list_id, :film_id)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id', $film_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return true;
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
		$sql = "SELECT film.*, film_id FROM list_film INNER JOIN film on film.id = list_film.film_id WHERE list_id = :list_id";
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

}

?>