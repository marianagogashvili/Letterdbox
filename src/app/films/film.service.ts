import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class FilmService {

	constructor(private http: HttpClient) {}

	sortBy(param: Params) {
		if (param.year) {
			return this.http.get(
				'http://localhost:8888/sortFilms.php?year=' + param.year
			);
		} else if (param.rating) {
			return this.http.get(
				'http://localhost:8888/sortFilms.php?rating=' + param.year
			);
		} else if (param.popular) {
			return this.http.get(
				'http://localhost:8888/sortFilms.php?popular=' + param.year
			);
		} else if (param.genre) {
			return this.http.get(
				'http://localhost:8888/sortFilms.php?genre=' + param.year
			);
		} else {
			return this.http.get(
				'http://localhost:8888/getFilms.php'
			);
		}
	}

	findFilms(param: Params) {
		return this.http.post(
			'http://localhost:8888/findFilms.php', JSON.stringify(param)
		);
	}
}