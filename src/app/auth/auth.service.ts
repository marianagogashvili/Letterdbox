import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
	constructor(private http: HttpClient) {}
	user = new BehaviorSubject(null);

	signup(post) {
		return this.http.post('http://localhost:8888/createUser.php', JSON.stringify(post));
	}
	login(user) {
		return this.http.post('http://localhost:8888/loginUser.php', JSON.stringify(user));
	}

	// resolveUser(user) {
	// 	return this.user.next(user);
	// }
}