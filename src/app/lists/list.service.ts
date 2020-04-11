import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ListService {
	constructor(private http: HttpClient) {}

	createList(param: Params){
		return this.http.post('http://localhost:8888/createList.php', JSON.stringify(param));
	}
}