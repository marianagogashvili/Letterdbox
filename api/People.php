<?php 

class People {

	public static function getMostPopularUsersByReview($conn) {
		$sql = "SELECT user.*, COUNT(review.id) AS reviewCount FROM user INNER JOIN review ON review.user_id = user.id GROUP BY user.id ORDER BY reviewCount DESC";
		$stmt = $conn->prepare($sql);
		if ($stmt->execute()) {
			return $stmt->fetchAll();
		}
	}

	public static function getMostPopularUsersByLikes($conn) {
		$sql = "SELECT user.*, COUNT(like_list.user_id) as likeCount FROM user INNER JOIN like_list ON like_list.user_id = user.id GROUP BY user.id ORDER BY likeCount DESC";
		$stmt = $conn->prepare($sql);
		if ($stmt->execute()) {
			return $stmt->fetchAll();
		}
	}

	public static function getMostPopularUsersByWatched($conn) {
		$sql = "SELECT user.*, COUNT(watched_films.user_id) as watchedCount FROM user INNER JOIN watched_films ON watched_films.user_id = user.id GROUP BY user.id ORDER BY watchedCount DESC";
		$stmt = $conn->prepare($sql);
		if ($stmt->execute()) {
			return $stmt->fetchAll();
		}
	}

	public static function getMostPopularUsersByList($conn) {
		$sql = "SELECT user.*, COUNT(list.user_id) as listCount FROM user INNER JOIN list ON list.user_id = user.id GROUP BY user.id ORDER BY listCount DESC";
		$stmt = $conn->prepare($sql);
		if ($stmt->execute()) {
			return $stmt->fetchAll();
		}
	}

	public static function getNumOfLists($conn, $id) {
		$sql = "SELECT  COUNT(list.id) FROM user INNER JOIN list ON list.user_id = user.id WHERE user.id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(":id", $id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}

	}

	public static function getNumOfReviews($conn, $id) {
		$sql = "SELECT COUNT(review.user_id) FROM user INNER JOIN review ON review.user_id = user.id WHERE user.id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(":id", $id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}
	}

	public static function getNumOfWatched($conn, $id) {
		$sql = "SELECT COUNT(watched_films.user_id) FROM user INNER JOIN watched_films ON watched_films.user_id = user.id WHERE user.id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(":id", $id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}

	}

	public static function getNumOfLikes($conn, $id) {
		$sql = "SELECT  COUNT(liked_films.user_id) FROM user INNER JOIN liked_films ON liked_films.user_id = user.id WHERE user.id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(":id", $id, PDO::PARAM_INT);
		if ($stmt->execute()) {
			return $stmt->fetch();
		}

	}


}

?>