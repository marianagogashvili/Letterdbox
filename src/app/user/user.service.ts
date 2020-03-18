import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  	numberOfFilms = new Subject();

	constructor(private http: HttpClient) {}

 	getWatchedFilms(param: Params) {
 		return this.http.post(
 			'http://localhost:8888/getAllFilmsWatchedByUser.php',
 		 	JSON.stringify(param)
 		);
 	}


}