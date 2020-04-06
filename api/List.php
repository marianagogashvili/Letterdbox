<?php 

class List {
	public $user_id;
	public $title;
	public $ranked;
	public $public;

	public static function createList($conn) {
		$sql = "INSERT INTO list(user_id, title, ranked, public) VALUES(:user_id, :title, :ranked, :public)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $this->user_id, PDO::PARAM_INT);
		$stmt->bindValue(':title', $this->title, PDO::PARAM_STR);
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

}

?>