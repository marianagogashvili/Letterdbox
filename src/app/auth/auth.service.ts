import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthService {
	constructor(private http: HttpClient) {}

	signup(username: string, email: string, password:string ) {
		// let link = 'http://localhost:8888/createUser.php?username=' + username + '?email=' + email + '?=password' + password;
		// console.log(link);
		console.log('huh');
		return this.http.post('http://localhost:8888/createUser.php', {'username': username, 'email': email, 'password':password});
	}
}