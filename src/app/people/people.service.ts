import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PeopleService {
	
	constructor(private http: HttpClient) {}
	
	getPeople(){
		return this.http.get('http://localhost:8888/getPeople.php');
	}

	getFollowed(param: Params) {
		return this.http.post('http://localhost:8888/getFollowed.php', JSON.stringify(param));
	}

	followUnfollow(param:Params) {
		return this.http.post('http://localhost:8888/followUnfollow.php', JSON.stringify(param));
	}
}