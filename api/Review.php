<?php 
header("Access-Control-Allow-Origin: *");

class Review {
	public $id;
	public $user_id;
	public $film_id;
	public $text;

	public function createReview($conn) {
		$sql = "INSERT INTO review(user_id, film_id, description) VALUES(:user_id, :film_id, :description)";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(':user_id',$this->user_id, PDO::PARAM_INT);
		$stmt->bindValue(':film_id',$this->film_id, PDO::PARAM_INT);
		$stmt->bindValue(':description',$this->text, PDO::PARAM_STR);
		if ($stmt->execute()) {
			$this->id = $conn->lastInsertId();
          	return true;
		}

	}
}

?>