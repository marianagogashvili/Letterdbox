<?php 

class Comment {
	public $id;
	public $user_id; 
	public $list_id;
	public $description;
	public $date;

	public function addCommentToList($conn) {
		$sql = "INSERT INTO comment(user_id, list_id, description, date) VALUES( :user_id, :list_id, :description, :dating)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id', $this->user_id, PDO::PARAM_INT);
		$stmt->bindValue(':list_id', $this->list_id, PDO::PARAM_INT);
		$stmt->bindValue(':description', $this->description, PDO::PARAM_STR);
		$stmt->bindValue(':dating', $this->date, PDO::PARAM_STR);
		if ($stmt->execute()) {
			$this->id = $conn->lastInsertId();
          	return true;
		}
	}

	public static function getCommentsFromList($conn, $list_id) {
		$sql = "SELECT comment.*, user.username FROM comment INNER JOIN user ON comment.user_id = user.id WHERE list_id = :list_id ORDER BY date DESC";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':list_id', $list_id, PDO::PARAM_INT);
		if ($stmt->execute()) {
          	return $stmt->fetchAll();
		}
	}
}

?>