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
}

?>