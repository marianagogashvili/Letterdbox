import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({providedIn: 'root'})
export class PeopleService {
	constructor(private http: HttpClient) {}
	getPeople(){
		return this.http.get('http://localhost:8888/getPeople.php');
	}
}