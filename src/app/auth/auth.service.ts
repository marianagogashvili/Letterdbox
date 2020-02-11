import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthService {
	constructor(private http: HttpClient) {}

	signup(post) {
		return this.http.post('http://localhost:8888/createUser.php', JSON.stringify(post));
	}
	login(user) {
		return this.http.post('http://localhost:8888/loginUser.php', JSON.stringify(user));
	}
}